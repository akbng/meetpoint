import { useState, useEffect } from "react";
import { format } from "date-fns";

import styles from "./index.module.css";
import { getEventById } from "../../helper";

const ViewEvent = ({ closeDialog, event }) => {
  return (
    <div>
      <h1 className={styles.dialog_title}>View Event</h1>
      <main className={styles.dialog_body}>
        <h3>{event?.name}</h3>
        <p>{event?.description}</p>
        <p> {event?.date && format(new Date(event?.date), "dd-MM-yyyy")}</p>
        <p>{event?.time}</p>
        <div className={`${styles.color_swatch} ${styles[event?.color]}`}></div>
        <div>
          {event?.attendees.map(({ user }) => (
            <div key={user._id}>
              {user.name.first} {user.name.last}
            </div>
          ))}
        </div>
        <div>
          <button onClick={closeDialog}>Ok</button>
          <button>EDIT</button>
        </div>
      </main>
    </div>
  );
};

export default ViewEvent;
