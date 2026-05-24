import { useEffect, useState } from "react";
import api from "../api/api";
import TaskCard from "../components/taskcard";

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      const response = await api.get(`/tasks/?search=${search}`);
      setTasks(response.data);
    }

    load();
  }, [search]);

  return (
    <div>
      <h2>Tasks</h2>
      <input
        placeholder="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
