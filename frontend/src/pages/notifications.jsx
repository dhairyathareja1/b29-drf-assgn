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

  async function markAsRead(id) {
    await api.post(`/notifications/${id}/mark_read/`);

    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, is_read: true }
          : notification,
      ),
    );
  }

  return (
    <div>
      <h2>Notifications</h2>
      {notifications.length === 0 && <p>No notifications</p>}
      {notifications.map((item) => (
        <div key={item.id} className="notification">
          <p>{item.message}</p>
          <small>{item.type}</small>
          {!item.is_read && (
            <button onClick={() => markAsRead(item.id)}>Mark as Read</button>
          )}
        </div>
      ))}
    </div>
  );
}
