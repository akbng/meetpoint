import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import styles from "./index.module.css";

const Notes = () => {
  const [activeTab, setActiveTab] = useState("private");

  const changeTab = (tab) => () => setActiveTab(tab);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div
          className={`${styles.tab} ${
            activeTab === "private" && styles.tab_selected
          }`}
          onClick={changeTab("private")}
        >
          Private Notes
        </div>
        <div
          className={`${styles.tab} ${
            activeTab !== "private" && styles.tab_selected
          }`}
          onClick={changeTab("shared")}
        >
          Shared Notes
        </div>
      </header>
      {activeTab === "private" ? (
        <div className={styles.notes}>
          {new Array(10).fill(" ").map((_, i) => (
            <div key={i} className={styles.note}>
              <h1>Title Lorem ipsum dolor sit amet consectetur.</h1>
              <h3>Sub Title</h3>
              <p>
                Paragraph Lorem ipsum dolor sit amet consectetur adipisicing
                elit. Laudantium vero pariatur deleniti dolor voluptate omnis.
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Eveniet, illum nobis amet voluptates aut adipisci quidem
                architecto doloremque reprehenderit minima quisquam, rem
                reiciendis similique sed ea voluptatem totam minus? Cumque.
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className={`${styles.notes} ${styles.notes_empty}`}>
          No Notes Shared To You
        </div>
      )}
      <div className={styles.icon}>
        <FaPlusCircle />
      </div>
    </div>
  );
};

export default Notes;
