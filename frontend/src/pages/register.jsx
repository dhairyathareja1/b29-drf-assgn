import { useState } from "react";
import useAuth from "../context/useAuth";

export default function Register() {
  const { register } = useAuth();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  async function submit(e) {
    e.preventDefault();
    await register(form);
    alert("Registered");
  }

  return (
    <form onSubmit={submit}>
      <input
        placeholder="Username"
        onChange={(e) =>
          setForm({
            ...form,
            username: e.target.value,
          })
        }
      />

      <input
        placeholder="Email"
        onChange={(e) =>
          setForm({
            ...form,
            email: e.target.value,
          })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setForm({
            ...form,
            password: e.target.value,
          })
        }
      />

      <button>Register</button>
    </form>
  );
}
