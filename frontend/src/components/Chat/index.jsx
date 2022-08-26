import { useState, useEffect } from "react";
import { MdSend } from "react-icons/md";

import styles from "./index.module.css";

const Chat = () => {
  return (
    <div className={styles.container}>
      <form className={styles.message_box} onSubmit={(e) => e.preventDefault()}>
        <input type="text" className={styles.message_input} />
        <button type="submit" className={styles.send_button}>
          <MdSend />
        </button>
      </form>
    </div>
  );
};

export default Chat;
