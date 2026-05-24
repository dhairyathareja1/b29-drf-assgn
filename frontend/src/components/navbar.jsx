import { Link } from "react-router-dom";
import useAuth from "../context/useAuth";

export default function Navbar() {
  const { logout, user } = useAuth();

  return (
    <nav className="nav">
      <Link to="/">Dashboard</Link>
      <Link to="/projects">Projects</Link>
      <Link to="/tasks">Tasks</Link>
      <Link to="/notifications">Notifications</Link>

      {!user && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}

      {user && <button onClick={logout}>Logout</button>}
    </nav>
  );
}
