import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await login(username, password);
      navigate("/");
    } catch {
      alert("Login failed");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button>Login</button>
    </form>
  );
}
