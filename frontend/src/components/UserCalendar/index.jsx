import { isSameDay } from "date-fns/esm";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import styles from "./index.module.css";

const UserCalendar = ({ className, events, setEvent, setIsOpen }) => {
  const [value, setValue] = useState(new Date());

  const onChange = (date) => {
    setValue(date);
    const event = events.find((event) => isSameDay(date, new Date(event.date)));
    if (event) {
      setEvent(event);
      setIsOpen(true);
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === "month") {
      const els = [];
      events.forEach(
        (event) => isSameDay(date, new Date(event.date)) && els.push(event.name)
      );
      if (els.length > 0)
        return (
          <div>
            {els.map((el, i) => (
              <p key={i}>{el}</p>
            ))}
          </div>
        );
    }
    return null;
  };

  const tileClass = ({ date, view }) => {
    if (view === "month") {
      let tempClass = styles.tile;
      for (let event of events) {
        if (isSameDay(date, new Date(event.date)))
          return tempClass + " " + styles[event.color];
      }
      return tempClass;
    }
  };

  return (
    <div className={className}>
      <Calendar
        className={styles.calendar}
        onChange={onChange}
        value={value}
        calendarType="US"
        tileContent={tileContent}
        tileClassName={tileClass}
      />
    </div>
  );
};
export default UserCalendar;
