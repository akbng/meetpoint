import { useEffect } from "react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

import { getUpcomingEvents } from "../../helper";
import UserCalendar from "../UserCalendar";
import styles from "./index.module.css";

const MeetingSection = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    const init = async () => {
      try {
        const result = await getUpcomingEvents();
        if (result.error) console.error(result.reason);
        else setUpcomingEvents(result.data);
      } catch (err) {
        console.log(err);
      }
    };
    init();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.upcoming_meeting}>
        <h3>Upcoming Events</h3>
        <div>
          {upcomingEvents.map((event) => (
            <p key={event._id}>{event.name}</p>
          ))}
        </div>
      </div>
      <UserCalendar className={styles.calendar} />
      <button className={styles.floating_button}>
        <FaPlus />
      </button>
    </div>
  );
};

export default MeetingSection;
