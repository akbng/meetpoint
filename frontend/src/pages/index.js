import { Link } from "react-router-dom";
import Svg from "react-inlinesvg";

import Logo from "../Logo.svg";
// import Man from "../Man.svg";
// import OfficeLady from "../OfficeLady.svg";
// import TabletLady from "../TabletLady.svg";
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
        <main>
          {/* <Svg src={OfficeLady} />
          <Svg src={Man} />
          <Svg src={TabletLady} /> */}
        </main>
      </header>
    </div>
  );
};

export default Home;
