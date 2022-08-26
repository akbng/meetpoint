import { AgoraVideoPlayer } from "agora-rtc-react";

import styles from "./index.module.css";

const Videos = ({ users, tracks, screenTracks }) => {
  return (
    <div className={styles.videos}>
      <AgoraVideoPlayer className={styles.video} videoTrack={tracks[1]} />

      {screenTracks ? (
        Array.isArray(screenTracks) ? (
          <AgoraVideoPlayer
            className={styles.video}
            videoTrack={screenTracks[0]}
          />
        ) : (
          <AgoraVideoPlayer
            className={styles.video}
            videoTrack={screenTracks}
          />
        )
      ) : (
        ""
      )}
      {users.length > 0 &&
        users.map((user) => {
          if (user.videoTrack)
            return (
              <AgoraVideoPlayer
                className={styles.video}
                videoTrack={user.videoTrack}
                key={user.uid}
              />
            );
        })}
    </div>
  );
};

export default Videos;
