import { useEffect } from "react";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

import { getUpcomingEvents } from "../../helper";
import UserCalendar from "../UserCalendar";
import styles from "./index.module.css";
import EventDialog from "../EventDialog";

const MeetingSection = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

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
  }, [isOpen]);

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
      <button
        className={styles.floating_button}
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaPlus />
      </button>
      <div>
        <EventDialog isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </div>
  );
};

export default MeetingSection;
