import AgoraRTC from "agora-rtc-sdk-ng";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { appId, useClient, useScreenClient } from "../../config";
import VideoCallControls from "../VideoCallControls";
import Videos from "../Videos";

const screenUid = Math.floor(Math.random() * 100000);

const VideoCall = ({ ready, tracks, token, setInCall }) => {
  const { cid: channelName } = useParams();
  const [users, setUsers] = useState([]);
  const [startCall, setStartCall] = useState(false);
  const [shareScreen, setShareScreen] = useState(false);
  const [screenTracks, setScreenTracks] = useState(null);
  const screenClient = useScreenClient();
  const client = useClient();

  useEffect(() => {
    let init = async (channelName) => {
      client.on("user-published", async (user, mediaType) => {
        if (user.uid === screenUid) return;

        await client.subscribe(user, mediaType);
        console.log("subscribe success");
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [...prevUsers, user];
          });
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user, type) => {
        console.log("unpublished", user, type);
        if (type === "audio") {
          user.audioTrack?.stop();
        }
        if (type === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        console.log("leaving", user);
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      const uid = await client.join(appId, channelName, token, null);
      console.log("My user id: ", uid);
      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStartCall(true);
    };

    if (ready && tracks) {
      console.log("init ready");
      init(channelName);
    }
  }, [client, tracks, ready]);

  useEffect(() => {
    const init = async () => {
      try {
        const tracks = await AgoraRTC.createScreenVideoTrack(
          {
            encoderConfig: "720p_3",
            optimizationMode: "detail",
          },
          "auto"
        );

        if (Array.isArray(tracks))
          tracks[0].once("track-ended", handleShareScreenClose);
        else tracks.once("track-ended", handleShareScreenClose);
        await screenClient.join(appId, channelName, token, screenUid);
        await screenClient.publish(tracks);
        setScreenTracks(tracks);
      } catch (err) {
        setShareScreen(false);
      }
    };

    if (shareScreen && !screenTracks) init();
    else handleShareScreenClose();
  }, [shareScreen]);

  const handleShareScreenClose = async () => {
    await screenClient.leave();
    screenClient.removeAllListeners();
    if (Array.isArray(screenTracks)) {
      screenTracks.forEach((track) => track.close());
    } else screenTracks?.close();
    setShareScreen(false);
    setScreenTracks(null);
  };

  return (
    <div id="videos">
      {ready && tracks && (
        <VideoCallControls
          setInCall={setInCall}
          setShareScreen={setShareScreen}
          setStartCall={setStartCall}
          shareScreen={shareScreen}
          tracks={tracks}
        />
      )}
      {startCall && tracks && (
        <Videos users={users} tracks={tracks} screenTracks={screenTracks} />
      )}
    </div>
  );
};

export default VideoCall;
