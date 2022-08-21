import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/auth/user">Login/Register</Link>
    </div>
  );
};

export default Home;
