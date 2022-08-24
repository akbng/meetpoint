import { AgoraVideoPlayer } from "agora-rtc-react";

const Videos = ({ users, tracks, screenTracks }) => {
  return (
    <div>
      <div id="videos">
        <AgoraVideoPlayer className="vid" videoTrack={tracks[1]} />

        {screenTracks ? (
          Array.isArray(screenTracks) ? (
            <AgoraVideoPlayer className="vid" videoTrack={screenTracks[0]} />
          ) : (
            <AgoraVideoPlayer className="vid" videoTrack={screenTracks} />
          )
        ) : (
          ""
        )}
        {users.length > 0 &&
          users.map((user) => {
            if (user.videoTrack)
              return (
                <AgoraVideoPlayer
                  className="vid"
                  videoTrack={user.videoTrack}
                  key={user.uid}
                />
              );
            else return <div>{user.uid} Disabled Video</div>;
          })}
      </div>
    </div>
  );
};

export default Videos;
