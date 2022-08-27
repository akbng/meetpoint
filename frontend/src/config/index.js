import {
  createClient,
  createMicrophoneAndCameraTracks,
  createScreenVideoTrack,
} from "agora-rtc-react";

const clientConfig = {
  mode: "rtc",
  codec: "vp8",
};

const screenTrackConfig = {
  encoderConfig: "720p_3",
  optimizationMode: "detail",
};

export const appId = process.env.REACT_APP_AGORA_APP_ID;
export const appCertificate = process.env.REACT_APP_AGORA_APP_CERTIFICATE;

export const useClient = createClient(clientConfig);
export const useScreenClient = createClient(clientConfig);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const useScreenTracks = createScreenVideoTrack(
  screenTrackConfig,
  "auto"
);

export const rtmLogin = async ({
  client,
  channel,
  uid,
  token,
  setAllUsers,
}) => {
  await client.login({ uid, token }).then(async () => {
    console.log("Login Successful");
    await channel.join();
    const members = await channel.getMembers();
    setAllUsers([...members.filter((memberId) => memberId !== uid)]);
  });
};
