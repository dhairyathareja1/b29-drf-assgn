import { Link } from "react-router-dom";
import useAuth from "../context/useAuth";

export default function Navbar() {
  const { logout } = useAuth();

  return (
    <nav>
      <Link to="/">Dashboard</Link>
      <button onClick={logout}>Logout</button>
    </nav>
  );
}
