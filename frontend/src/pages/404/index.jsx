import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

import { isAuthenticated } from "../../utils";
import styles from "./index.module.css";

const Error404 = () => {
  return (
    <div className={styles.container}>
      <img src="./404.png" alt="lady conveying page not found 404 message" />
      <Link
        className={styles.button}
        to={isAuthenticated() ? "/dashboard/me" : "/"}
      >
        <FaHome /> Go Home
      </Link>
    </div>
  );
};

export default Error404;
