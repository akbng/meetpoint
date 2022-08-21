const crypto = require("crypto");
const { RtcTokenBuilder, RtcRole } = require("./RtcTokenBuilder");
const { RtmTokenBuilder, RtmRole } = require("./RtmTokenBuilder");

const randUint32 = () => crypto.randomBytes(4).readUInt32LE(0, true);

const appID = process.env.APP_ID;
const appCertificate = process.env.APP_CERTIFICATE;

const generateRtcToken = (Channel, Uid) =>
  new Promise((resolve, reject) => {
    if (!Channel) reject(Error("Channel Name is required"));

    const channelName = Channel;
    const uid = Uid || randUint32();
    const role = RtcRole.PUBLISHER;

    const expirationTimeInSeconds = 3600; // 1 hour

    const currentTimestamp = Math.floor(Date.now() / 1000);

    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    const token = RtcTokenBuilder.buildTokenWithUserAccount(
      appID,
      appCertificate,
      channelName,
      uid.toString(),
      role,
      privilegeExpiredTs
    );
    if (token)
      resolve({ uid, token, expiry: new Date(privilegeExpiredTs * 1000) });
  });

const generateRtmToken = (Uid) =>
  new Promise((resolve, _) => {
    const uid = Uid || randUint32();

    const expirationTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);

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
