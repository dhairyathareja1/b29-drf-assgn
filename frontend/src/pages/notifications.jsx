import { useEffect, useState } from "react";
import api from "../api/api";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function load() {
      const response = await api.get("/notifications/");
      setNotifications(response.data);
    }
    load();
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.map((item) => (
        <div key={item.id} className="notification">
          {item.message}
        </div>
      ))}
    </div>
  );
}
