import { useState } from "react";
import { useNavigate } from "react-router-dom";

import styles from "./call.module.css";

const JoinCall = () => {
  const navigate = useNavigate();
  const [channelName, setChannelName] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!channelName) return;
    navigate(`/meeting/call/${channelName}`);
  };

  return (
    <div className={styles.container}>
      <form className={styles.form_container} onSubmit={onSubmit}>
        <input
          type="text"
          id="channelName"
          className={styles.input}
          placeholder="Enter Meeting ID: e2a5ae81-ac19-4cad-933a-87b81ca5aa7f"
          autoComplete="off"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
        />
        <button type="submit" className={styles.button}>
          Join Call
        </button>
      </form>
    </div>
  );
};

export default JoinCall;
