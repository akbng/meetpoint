import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import MeetingPreview from "../../../components/MeetingPreview";
import VideoCall from "../../../components/VideoCall";
import { useMicrophoneAndCameraTracks } from "../../../config";
import { getRtcToken } from "../../../helper";

const Meeting = () => {
  const { cid: channel } = useParams();
  const { ready, tracks } = useMicrophoneAndCameraTracks();

  const [token, setToken] = useState(null);
  const [inCall, setInCall] = useState(false);

  useEffect(() => {
    getRtcToken({ channelName: channel }).then((res) =>
      setToken(res.data.token)
    );
  }, []);

  return (
    <div className="container">
      <div className="App">
        {inCall ? (
          <VideoCall
            ready={ready}
            setInCall={setInCall}
            token={token}
            tracks={tracks}
          />
        ) : (
          <MeetingPreview
            ready={ready}
            tracks={tracks}
            token={token}
            setStartCall={setInCall}
          />
        )}
      </div>
    </div>
  );
};

export default Meeting;
