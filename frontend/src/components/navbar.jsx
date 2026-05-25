import { Link } from "react-router-dom";
import useAuth from "../context/useAuth";

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <div className="nav">
      <div className="nav-left">
        <h2 className="logo">CreativeFlow</h2>
        <Link to="/">Dashboard</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/notifications">Notifications</Link>
        <Link to="/studios">Studios</Link>
      </div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
