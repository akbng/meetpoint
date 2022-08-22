import { useState } from "react";
import {
  BsFillMicFill,
  BsFillMicMuteFill,
  BsFillCameraVideoFill,
  BsFillCameraVideoOffFill,
} from "react-icons/bs";
import { MdCallEnd, MdScreenShare, MdStopScreenShare } from "react-icons/md";

import { useClient } from "../../config";

const VideoCallControls = ({
  tracks,
  setStartCall,
  shareScreen,
  setShareScreen,
  setInCall,
}) => {
  const client = useClient();
  const [trackState, setTrackState] = useState({
    video: tracks[1]?.enabled,
    audio: tracks[0]?.enabled,
  });

  const mute = (type) => async () => {
    if (type === "audio") await tracks[0].setEnabled(!trackState[type]);
    if (type === "video") await tracks[1].setEnabled(!trackState[type]);
    setTrackState({
      ...trackState,
      [type]: !trackState[type],
    });
  };

  const leaveChannel = async () => {
    await client.leave();
    client.removeAllListeners();
    tracks[0].close();
    tracks[1].close();
    setStartCall(false);
    setInCall(false);
  };

  const toggleScreenShare = () => setShareScreen(!shareScreen);

  return (
    <div className="controls">
      <button className={trackState.audio ? "on" : ""} onClick={mute("audio")}>
        {trackState.audio ? <BsFillMicFill /> : <BsFillMicMuteFill />}
      </button>
      <button className={trackState.video ? "on" : ""} onClick={mute("video")}>
        {trackState.video ? (
          <BsFillCameraVideoFill />
        ) : (
          <BsFillCameraVideoOffFill />
        )}
      </button>

      <button onClick={toggleScreenShare}>
        {shareScreen ? <MdStopScreenShare /> : <MdScreenShare />}
      </button>

      <button onClick={() => leaveChannel()}>
        <MdCallEnd />
      </button>
    </div>
  );
};

export default VideoCallControls;
