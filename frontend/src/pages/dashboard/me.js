import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Svg from "react-inlinesvg";
import { FaRegMoneyBillAlt, FaSignOutAlt } from "react-icons/fa";
import {
  MdEventNote,
  MdNotes,
  MdOutlineAccountCircle,
  MdOutlineAnalytics,
  MdPlayCircleOutline,
} from "react-icons/md";

import styles from "./me.module.css";
import MeetingSection from "../../components/MeetingSection";
import { logout } from "../../utils";
import Logo from "../../Logo.svg";
import Notes from "../../components/Notes";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("events");

  const changeTab = (tab) => () => setActiveTab(tab);

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <Link to="/" className={styles.logo}>
          <Svg src={Logo} />
        </Link>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${
              activeTab == "events" && styles.active_tab
            }`}
            onClick={changeTab("events")}
          >
            <MdEventNote />
            <span>Events</span>
          </button>
          <button
            className={`${styles.tab} ${
              activeTab == "notes" && styles.active_tab
            }`}
            onClick={changeTab("notes")}
          >
            <MdNotes />
            <span>Notes</span>
          </button>
          <button
            className={`${styles.tab} ${
              activeTab == "reports" && styles.active_tab
            }`}
            onClick={changeTab("reports")}
          >
            <MdOutlineAnalytics />
            <span>Analytics</span>
          </button>
          <button
            className={`${styles.tab} ${
              activeTab == "recordings" && styles.active_tab
            }`}
            onClick={changeTab("recordings")}
          >
            <MdPlayCircleOutline />
            <span>Recordings</span>
          </button>
          <button
            className={`${styles.tab} ${
              activeTab == "billing" && styles.active_tab
            }`}
            onClick={changeTab("billing")}
          >
            <FaRegMoneyBillAlt />
            <span>Billing</span>
          </button>
          <button
            className={`${styles.tab} ${
              activeTab == "account" && styles.active_tab
            }`}
            onClick={changeTab("account")}
          >
            <MdOutlineAccountCircle />
            <span>Account</span>
          </button>
          <button
            className={styles.tab}
            onClick={async () => {
              await logout();
              navigate("/auth/user");
            }}
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
        <div className={styles.instant_action}>
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
        {activeTab === "events" && <MeetingSection />}
        {activeTab === "notes" && <Notes />}
        {activeTab === "reports" && (
          <div className={styles.disabled_section}>
            Analytics Coming Soon...
          </div>
        )}
        {activeTab === "recordings" && (
          <div className={styles.disabled_section}>
            Recordings Coming Soon...
          </div>
        )}
        {activeTab === "billing" && (
          <div className={styles.disabled_section}>
            Billing &amp; Usage Coming Soon...
          </div>
        )}
        {activeTab === "account" && (
          <div className={styles.disabled_section}>Accounts Coming Soon...</div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
