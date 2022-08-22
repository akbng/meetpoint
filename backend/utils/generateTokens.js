const { RtcTokenBuilder, RtcRole } = require("./RtcTokenBuilder");
const { RtmTokenBuilder, RtmRole } = require("./RtmTokenBuilder");

const appID = process.env.APP_ID;
const appCertificate = process.env.APP_CERTIFICATE;

const generateRtcToken = (Channel, Uid) =>
  new Promise((resolve, reject) => {
    if (!Channel) reject(Error("Channel Name is required"));

    const channelName = Channel;
    const uid = Uid || 0;
    const role = RtcRole.PUBLISHER;

    const expirationTimeInSeconds = 3600; // 1 hour

    const currentTimestamp = Math.floor(Date.now() / 1000);

    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    const token = RtcTokenBuilder.buildTokenWithUserAccount(
      appID,
      appCertificate,
      channelName,
      uid,
      role,
      privilegeExpiredTs
    );
    if (token)
      resolve({ uid, token, expiry: new Date(privilegeExpiredTs * 1000) });
  });

const generateRtmToken = (Uid) =>
  new Promise((resolve, _) => {
    if (!Uid) reject(Error("User ID is required"));

    const expirationTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const uid = Uid;

    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    const token = RtmTokenBuilder.buildToken(
      appID,
      appCertificate,
      uid.toString(),
      RtmRole.Rtm_User,
      privilegeExpiredTs
    );
    if (token)
      resolve({ uid, token, expiry: new Date(privilegeExpiredTs * 1000) });
  });

module.exports = { generateRtcToken, generateRtmToken };
