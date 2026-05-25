import { Link, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div className="nav">
      <div className="nav-left">
        <h2 className="logo">CreativeFlow</h2>
        {user && (
          <>
            <Link to="/">Dashboard</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/tasks">Tasks</Link>
            <Link to="/notifications">Notifications</Link>
            <Link to="/studios">Studios</Link>
          </>
        )}
      </div>

      <div>
        {user ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <div className="auth-links">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        )}
      </div>
    </div>
  );
}
