// eslint-disable-next-line no-unused-vars
import { createContext, useContext, useState } from "react";

import api from "../api/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function login(username, password) {
    const response = await api.post("/auth/login/", {
      username,
      password,
    });

    localStorage.setItem("token", response.data.access);

    const me = await api.get("/auth/me/");

    setUser(me.data);
  }

  async function register(data) {
    await api.post("/auth/register/", data);
  }

  function logout() {
    localStorage.clear();

    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
