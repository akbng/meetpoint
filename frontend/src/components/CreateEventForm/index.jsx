import { useState, useEffect } from "react";
import { FaSave, FaTimes } from "react-icons/fa";
import Select from "react-select";
import { format } from "date-fns";

import { createEvent, getAllUsers } from "../../helper";
import { isAuthenticated } from "../../utils";
import styles from "./index.module.css";

const CreateEventForm = ({ closeDialog, event }) => {
  const [value, setValue] = useState({
    name: event?.name || "",
    description: event?.description || "",
    date: format(event?.date || new Date(), "yyyy-MM-dd"),
    time: event?.time || "",
    color: event?.color || "blue",
    attendees: event?.attendees || [],
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const handleChange = (name) => (e) =>
    setValue({ ...value, [name]: e.target.value });

  const changeColor = (col) => () => setValue({ ...value, color: col });

  const handleParticipants = (options) =>
    setValue({
      ...value,
      attendees: options.map((op) => ({ user: op.value })),
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!value.name || !value.date || !value.time)
      return setError("Please Fill-In the required fields");

    setLoading(true);

    try {
      const response = await createEvent({
        ...value,
        date: new Date(`${value.date} ${value.time}`),
      });
      if (response.error) {
        setError(response.reason);
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
      setError(response.reason);
      closeDialog();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      const { sub } = isAuthenticated();
      try {
        const result = await getAllUsers();
        if (result.error) return setError(result.reason);
        setUsers(
          result.data
            .map((user) => ({
              value: user._id,
              label: `${user.name.first} ${user.name.last}`,
            }))
            .filter((options) => options.value !== sub)
        );
      } catch (err) {
        console.log(err);
      }
    };

    init();
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.dialog_title}>Create Event</h1>
      <main className={styles.dialog_body}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.error}>{error ? error : ""}</div>
          <div className={styles.input_group}>
            <label htmlFor="eventName">Name*: </label>
            <input
              type="text"
              id="eventName"
              value={value.name}
              onChange={handleChange("name")}
            />
          </div>
          <div className={styles.input_group}>
            <label htmlFor="eventDescription">Description: </label>
            <input
              type="text"
              id="eventDescription"
              value={value.description}
              onChange={handleChange("description")}
            />
          </div>
          <div className={styles.input_group}>
            <label htmlFor="eventDate">Date*: </label>
            <input
              type="date"
              id="eventDate"
              value={value.date}
              onChange={handleChange("date")}
            />
          </div>
          <div className={styles.input_group}>
            <label htmlFor="eventTime">Time*: </label>
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
          <div className={styles.input_group}>
            <label htmlFor="eventParticipants">Participants: </label>
            <Select
              id="eventParticipants"
              options={users}
              isMulti
              onChange={handleParticipants}
            />
          </div>
          <div>
            <button className={styles.button} type="submit">
              Save <FaSave />
            </button>
            <button className={styles.button} onClick={closeDialog}>
              Cancel <FaTimes />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CreateEventForm;
