import { useEffect } from "react";
import { useState } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";

import { getAllEvents, removeEvent } from "../../helper";
import UserCalendar from "../UserCalendar";
import styles from "./index.module.css";
import EventDialog from "../EventDialog";
import { compareAsc } from "date-fns";
import ViewEvent from "../ViewEvent";
import CreateEventForm from "../CreateEventForm";

const MeetingSection = () => {
  const [allEvents, setAllEvents] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [event, setEvent] = useState(null);
  const [createEvent, setCreateEvent] = useState(false);

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

  const closeDialog = () => {
    setIsOpen(false);
    setEvent(null);
    setCreateEvent(false);
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
          {allEvents
            .sort((a, b) => compareAsc(new Date(a.date), new Date(b.date)))
            .map((event) => (
              <div key={event._id} className={styles.event}>
                <div
                  className={styles.event_name}
                  onClick={() => {
                    setIsOpen(true);
                    setEvent(event);
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
        onClick={() => {
          setIsOpen(true);
          setCreateEvent(true);
        }}
      >
        <FaPlus />
      </button>
      <div>
        {isOpen && (
          <EventDialog isOpen={isOpen} closeDialog={closeDialog}>
            <ViewEvent event={event} closeDialog={closeDialog} />
          </EventDialog>
        )}
        {isOpen && createEvent && (
          <EventDialog isOpen={isOpen} closeDialog={closeDialog}>
            <CreateEventForm event={event} closeDialog={closeDialog} />
          </EventDialog>
        )}
      </div>
    </div>
  );
};

export default MeetingSection;
