import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { registerUser } from "../../helper";
import { authenticate, isAuthenticated } from "../../utils";
import SocialLogin from "../SocialLogin";
import styles from "./index.module.css";

const Register = ({ className, active }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { fullName, email, password, phone } = value;

  const handleChange = (name) => (e) =>
    setValue({ ...value, [name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (fullName === "" || email === "" || password === "") {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await registerUser({ fullName, email, password, phone });
      if (response.error) {
        setError(response.reason);
        return;
      }

      setValue({ fullName: "", email: "", password: "", phone: "" });
      authenticate({
        token: response.data?.token,
        expiry: response.data?.expires,
        sub: response.data?.user?._id,
        name: [
          response.data?.user?.name?.first,
          response.data?.user?.name?.last,
        ].join(" "),
      });

      if (isAuthenticated()) {
        location.state?.from
          ? navigate(location.state.from)
          : navigate("/dashboard/me");
      }
    } catch (err) {
      console.error(err);
      setError(err.reason);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) toast.error(error);
  }, [error]);

  return (
    <div
      className={`${className} ${styles.container} ${
        active ? styles.active : ""
      }`}
    >
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.header}>Create Account</h1>
        <SocialLogin />
        <span className={styles.text_small}>or use your account</span>
        <input
          className={styles.user_input}
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={handleChange("fullName")}
        />
        <input
          className={styles.user_input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleChange("email")}
        />
        <input
          className={styles.user_input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={handleChange("password")}
        />
        <button className={styles.button} type="submit" disabled={loading}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
