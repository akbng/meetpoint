import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import styles from "./index.module.css";

const UserCalendar = ({ className }) => {
  const [value, onChange] = useState(new Date());

  return (
    <div className={className}>
      <Calendar
        className={styles.calendar}
        onChange={onChange}
        value={value}
        calendarType="US"
        tileContent={({ activeStartDate, date, view }) => {
          return view === "month" && date.getDay() === 0 ? (
            <p>It's Sunday!</p>
          ) : null;
        }}
      />
    </div>
  );
};
export default UserCalendar;
