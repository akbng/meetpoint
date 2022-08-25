import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import styles from "./me.module.css";
import MeetingSection from "../../components/MeetingSection";
import { logout } from "../../utils";
import { FaSignOutAlt } from "react-icons/fa";

const Dashboard = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <h2>Dashboard</h2>
        <div className="">Links</div>
        <div className={styles.instant_action}>
          {/* Logout button is temporary */}
          <button
            className={styles.button}
            onClick={async () => {
              await logout();
              navigate("/auth/user");
            }}
          >
            Logout <FaSignOutAlt />
          </button>
          <Link
            to="/meeting/join/call"
            className={`${styles.button} ${styles.border_button}`}
          >
            Join Existing Call
          </Link>
          <Link to={`/meeting/call/${uuidv4()}`} className={styles.button}>
            Start Instant Call
          </Link>
        </div>
      </aside>
      <main className={styles.main_section}>
        <MeetingSection />
      </main>
    </div>
  );
};

export default Dashboard;
