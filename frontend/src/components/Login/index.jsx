import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { loginUser } from "../../helper";
import { authenticate, isAuthenticated } from "../../utils";
import SocialLogin from "../SocialLogin";
import styles from "./index.module.css";

const Login = ({ className, active }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { email, password } = value;

  const handleChange = (name) => (e) =>
    setValue({ ...value, [name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }

    setLoading(true);
    const loader = toast.loading("...loading");
    setError("");

    try {
      const response = await loginUser({ email, password });
      if (response.error) {
        setError(response.reason);
        return;
      }

      setValue({ email: "", password: "" });
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
      setError(err.reason || err.message);
    } finally {
      setLoading(false);
      toast.dismiss(loader);
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
        <h1 className={styles.header}>Sign in</h1>
        <SocialLogin />
        <span className={styles.text_small}>or use your account</span>
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
        <a className={styles.link} href="#">
          Forgot your password?
        </a>
        <button className={styles.button} type="submit" disabled={loading}>
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
