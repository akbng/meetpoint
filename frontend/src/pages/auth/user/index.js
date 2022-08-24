import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Login from "../../../components/Login";
import Register from "../../../components/Register";
import { isAuthenticated } from "../../../utils";
import styles from "./index.module.css";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [rightPanelActive, setRightPanelActive] = useState(true);

  useEffect(() => {
    if (isAuthenticated()) {
      location.state?.from
        ? navigate(location.state.from)
        : navigate("/dashboard/me", { replace: true });
    }
  }, []);

  return (
    <div className={styles.outer_container}>
      <div
        className={`${styles.inner_container} ${
          rightPanelActive ? styles.right_panel_active : ""
        }`}
        id="container"
      >
        <Register className={styles.form_container} active={rightPanelActive} />
        <Login className={styles.form_container} active={rightPanelActive} />
        <div className={styles.overlay_container}>
          <div className={styles.overlay}>
            <div className={`${styles.overlay_panel} ${styles.overlay_left}`}>
              <h1 className={styles.header}>Welcome Back!</h1>
              <p className={styles.text}>
                To keep connected with us please login with your personal info
              </p>
              <button
                className={`${styles.ghost} ${styles.button}`}
                id="signIn"
                onClick={() => setRightPanelActive(false)}
              >
                Sign In
              </button>
            </div>
            <div className={`${styles.overlay_panel} ${styles.overlay_right}`}>
              <h1 className={styles.header}>Hello, Friend!</h1>
              <p className={styles.text}>
                Enter your personal details and start journey with us
              </p>
              <button
                className={`${styles.ghost} ${styles.button}`}
                id="signUp"
                onClick={() => setRightPanelActive(true)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
