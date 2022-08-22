import { useState, useEffect } from "react";
import { AgoraVideoPlayer } from "agora-rtc-react";
import AgoraRTC from "agora-rtc-sdk-ng";

const MeetingPreview = ({ ready, tracks, token, setStartCall }) => {
  const [audioDevices, setAudioDevices] = useState([]);
  const [videoDevices, setVideoDevices] = useState([]);
  const [trackState, setTrackState] = useState({ audio: true, video: true });

  useEffect(() => {
    AgoraRTC.getDevices().then((devices) => {
      const audioDevices = devices.filter(
        (device) => device.kind === "audioinput"
      );
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );
      setAudioDevices(audioDevices);
      setVideoDevices(videoDevices);
    });
  }, []);

  const mute = (type) => async () => {
    if (type === "audio") await tracks[0].setEnabled(!trackState[type]);
    if (type === "video") await tracks[1].setEnabled(!trackState[type]);
    setTrackState({
      ...trackState,
      [type]: !trackState[type],
    });
  };

  const handleDeviceChange = (type) => async (e) => {
    const deviceId = e.target.value;
    if (type === "audio") await tracks[0].setDevice(deviceId);
    if (type === "video") await tracks[1].setDevice(deviceId);
  };

  return (
    <div>
      <h1>Preview Call</h1>
      <div className="video_container">
        <h2>Video Feed Here</h2>
        {ready && tracks && (
          <AgoraVideoPlayer videoTrack={tracks[1]} className="video" />
        )}
      </div>
      {ready && tracks && (
        <div className="video_controls">
          <button onClick={mute("video")}>
            {trackState.video ? "Mute" : "Un-Mute"} Video
          </button>
          <button onClick={mute("audio")}>
            {trackState.audio ? "Mute" : "Un-Mute"} Audio
          </button>
        </div>
      )}
      <div className="device_selector">
        {audioDevices ? (
          <div className="audio_devices">
            <h3>Audio Devices</h3>
            <select
              className="devices_list"
              onChange={handleDeviceChange("audio")}
            >
              {audioDevices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <h3>No Audio Device Found</h3>
        )}
        {videoDevices ? (
          <div className="video_devices">
            <h3>Video Devices</h3>
            <select
              className="devices_list"
              onChange={handleDeviceChange("video")}
            >
              {videoDevices.map((device) => (
                <option key={device.deviceId} value={device.deviceId}>
                  {device.label}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <h3>No Video Device Found</h3>
        )}
      </div>
      <br />
      <div>
        <button onClick={() => setStartCall(true)} disabled={!ready || !token}>
          Join Call
        </button>
      </div>
    </div>
  );
};

export default MeetingPreview;
