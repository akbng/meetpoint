import { useState } from "react";
import { registerUser } from "../helper";

const Register = () => {
  const [value, setValue] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { fullName, email, password, phone } = value;

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
      console.log(response.data.user);
      if (typeof window !== "undefined") {
        localStorage.setItem("token", response.data.token);
      }
      // TODO: Redirect to dashboard
      setValue({ fullName: "", email: "", password: "", phone: "" });
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
      <h1>Register</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name: </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={handleChange("fullName")}
          />
        </div>
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
        <div>
          <label htmlFor="phone">Phone: </label>
          <input
            type="number"
            id="phone"
            value={phone}
            onChange={handleChange("phone")}
          />
        </div>
        <button type="submit" disabled={loading}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
