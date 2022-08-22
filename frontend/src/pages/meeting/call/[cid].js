import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MeetingPreview from "../../../components/MeetingPreview";

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
      {inCall ? (
        "MEETing STARTED"
      ) : (
        <MeetingPreview
          ready={ready}
          tracks={tracks}
          token={token}
          setStartCall={setInCall}
        />
      )}
    </div>
  );
};

export default Meeting;
