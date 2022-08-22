import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <Link to={`/meeting/call/${uuidv4()}`}>Start Instant Meeting</Link>
    </div>
  );
};

export default Dashboard;
