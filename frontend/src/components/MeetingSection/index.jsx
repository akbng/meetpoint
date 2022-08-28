import { useEffect } from "react";
import { useState } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";

import { getAllEvents, removeEvent } from "../../helper";
import UserCalendar from "../UserCalendar";
import styles from "./index.module.css";
import EventDialog from "../EventDialog";

const MeetingSection = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [eventId, setEventId] = useState("");

  const deleteEvent = (eventId) => async () => {
    try {
      await removeEvent(eventId);
      setAllEvents((pEvents) =>
        pEvents.filter((pEvent) => pEvent._id !== eventId)
      );
    } catch (err) {
      console.log(err.reason || err.message);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const result = await getAllEvents();
        if (result.error) console.log(result.reason);
        else setAllEvents(result.data);
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
        <div className={styles.events}>
          {allEvents.map((event) => (
            <div key={event._id} className={styles.event}>
              <div
                className={styles.event_name}
                onClick={() => {
                  setIsOpen(true);
                  setEventId(event._id);
                }}
              >
                {event.name}
              </div>
              <button
                className={styles.event_remove}
                onClick={deleteEvent(event._id)}
              >
                <FaTrashAlt />
              </button>
            </div>
          ))}
        </div>
      </div>
      <UserCalendar events={allEvents} className={styles.calendar} />
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
