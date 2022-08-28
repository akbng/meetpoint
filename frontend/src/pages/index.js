import { Link } from "react-router-dom";
import Svg from "react-inlinesvg";

import Logo from "../Logo.svg";
import styles from "./index.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.menu}>
        <Svg src={Logo} className={styles.logo} />
        <div className={styles.menu_link}>
          <Link className={styles.menu_link_item} to="/auth/user">
            login
          </Link>
          <Link
            className={`${styles.menu_link_item} ${styles.register}`}
            to="/auth/user?mode=register"
          >
            Register
          </Link>
        </div>
      </nav>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Improve productivity withquality video meetings, work on the go!
        </h1>
        <h3 className={styles.subtitle}>
          Quality video chat for businesses,High resolution video and audio
          output. Track your time on the go
        </h3>
        <div className={styles.buttons}>
          <Link to="/auth/user?mode=register" className={styles.button}>
            Get started for free
          </Link>
        </div>
        <main className={styles.mockup}>
          <div className={styles.img}>
            <img src="/OfficeLady.png" alt="Lady holding suitcase" />
          </div>
          <div className={styles.img}>
            <img src="/Man.png" alt="Business man talking with arms open" />
          </div>
          <div className={styles.img}>
            <img src="/TabletLady.png" alt="Girl holding tablet" />
          </div>
        </main>
      </header>
    </div>
  );
};

export default Home;
