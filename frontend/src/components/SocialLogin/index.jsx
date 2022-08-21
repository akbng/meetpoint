import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";

import styles from "./index.module.css";

const SocialLogin = () => {
  return (
    <div className={styles.social_container}>
      <a href="#" className={styles.social}>
        <FaFacebookF />
      </a>
      <a href="#" className={styles.social}>
        <FaGoogle />
      </a>
      <a href="#" className={styles.social}>
        <FaApple />
      </a>
    </div>
  );
};

export default SocialLogin;
