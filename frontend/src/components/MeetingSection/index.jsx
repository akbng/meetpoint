import { useEffect } from "react";
import { useState } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";

import { getUpcomingEvents, removeEvent } from "../../helper";
import UserCalendar from "../UserCalendar";
import styles from "./index.module.css";
import EventDialog from "../EventDialog";

const MeetingSection = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [eventId, setEventId] = useState("");

  const deleteEvent = (eventId) => async () => {
    try {
      await removeEvent(eventId);
      setUpcomingEvents((pEvents) =>
        pEvents.filter((pEvent) => pEvent._id !== eventId)
      );
    } catch (err) {
      console.log(err.reason || err.message);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const result = await getUpcomingEvents();
        if (result.error) console.log(result.reason);
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
            <div key={event._id}>
              <span
                onClick={() => {
                  setIsOpen(true);
                  setEventId(event._id);
                }}
              >
                {event.name}
              </span>
              <button onClick={deleteEvent(event._id)}>
                <FaTrashAlt />
              </button>
            </div>
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
        <EventDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          eventId={eventId}
          setEventId={setEventId}
        />
      </div>
    </div>
  );
};

export default MeetingSection;
