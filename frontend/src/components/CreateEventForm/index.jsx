import { useState } from "react";
import { FaSave, FaTimes } from "react-icons/fa";
import { createEvent } from "../../helper";

import styles from "./index.module.css";

const CreateEventForm = ({ setIsOpen }) => {
  const [value, setValue] = useState({
    name: "",
    description: "",
    date: "",
    time: "",
    color: "blue",
    attendees: [],
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (name) => (e) =>
    setValue({ ...value, [name]: e.target.value });

  const changeColor = (col) => () => setValue({ ...value, color: col });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value.name || !value.description || !value.date || !value.time)
      return setError("Please Fill-In the required fields");

    setLoading(true);

    try {
      const reason = createEvent(value);
      if (reason.error) {
        setError(reason.reason);
        return;
      }

      setValue({
        name: "",
        description: "",
        date: "",
        time: "",
        color: "blue",
        attendees: [],
      });
    } catch (err) {
      console.error(err);
      setError(err.reason);
    } finally {
      setLoading(false);
      setIsOpen(false);
    }
  };

  return (
    <div>
      <h1 className={styles.dialog_title}>Open in EDIT mode</h1>
      <main className={styles.dialog_body}>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="eventName">Name: </label>
            <input
              type="text"
              id="eventName"
              value={value.name}
              onChange={handleChange("name")}
            />
          </div>
          <div>
            <label htmlFor="eventDescription">Description: </label>
            <input
              type="text"
              id="eventDescription"
              value={value.description}
              onChange={handleChange("description")}
            />
          </div>
          <div>
            <label htmlFor="eventDate">Date: </label>
            <input
              type="date"
              id="eventDate"
              value={value.date}
              onChange={handleChange("date")}
            />
          </div>
          <div>
            <label htmlFor="eventTime">Time: </label>
            <input
              type="time"
              id="eventTime"
              value={value.time}
              onChange={handleChange("time")}
            />
          </div>
          <div className={styles["selected_" + value.color]}>
            {["blue", "green", "yellow", "orange", "red", "pink", "purple"].map(
              (col, i) => (
                <div
                  className={`${styles.color_swatch} ${styles[col]}`}
                  key={i}
                  onClick={changeColor(col)}
                ></div>
              )
            )}
          </div>
          <div>
            <label htmlFor="eventParticipants">Participants: </label>
          </div>
          <div>
            <button onClick={() => setIsOpen(false)}>
              Cancel <FaTimes />
            </button>
            <button type="submit">
              Save <FaSave />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateEventForm;
