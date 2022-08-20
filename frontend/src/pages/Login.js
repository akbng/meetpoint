import { useState } from "react";
import { loginUser } from "../helper";

const Login = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { email, password } = value;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (email === "" || password === "") {
      setError("Please fill all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await loginUser({ email, password });
      if (response.error) {
        setError(response.reason);
        return;
      }
      setError("");
      console.log(response.data.user);
      if (typeof window !== "undefined") {
        localStorage.setItem("token", response.data.token);
      }
      // TODO: Redirect to dashboard
      setValue({ email: "", password: "" });
    } catch (err) {
      console.error(err);
      setError(err.reason);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (name) => (e) =>
    setValue({ ...value, [name]: e.target.value });

  return (
    <div>
      <h1>Login</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleChange("email")}
          />
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handleChange("password")}
          />
        </div>
        <button type="submit" disabled={loading}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
