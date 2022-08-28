import { format } from "date-fns";
import { MdOutlineDateRange } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { createAvatar } from "@dicebear/avatars";
import * as style from "@dicebear/avatars-bottts-sprites";
import Svg from "react-inlinesvg";

import styles from "./index.module.css";

const ViewEvent = ({ closeDialog, event }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.dialog_title}>View Event</h1>
      <main className={styles.dialog_body}>
        <h3 className={`${styles.name} ${styles[event?.color]}`}>
          {event?.name}
        </h3>
        <p className={styles.description}>{event?.description}</p>
        <p className={styles.date}>
          <MdOutlineDateRange />
          {event?.date && format(new Date(event?.date), "dd-MM-yyyy")} at{" "}
          {event?.time}
        </p>

        {event?.attendees.length > 0 ? (
          <div className={styles.users}>
            <h3>
              <FaUsers /> Participants
            </h3>
            {event?.attendees.map(({ user, status }) => {
              const name = user.name.first + " " + user.name.last || "";
              return (
                <div key={user._id} className={styles.user}>
                  <Svg
                    src={createAvatar(style, {
                      seed: name.trim(),
                      dataUri: true,
                    })}
                    alt="avatar"
                  />
                  {user.name.first} {user.name.last} ({status})
                </div>
              );
            })}
          </div>
        ) : null}
      </main>
    </div>
  );
};

export default ViewEvent;
