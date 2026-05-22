import { useEffect, useState } from "react";
import api from "../api/api";
import TaskCard from "../components/taskcard";

export default function TaskBoard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchTasks() {
      const response = await api.get("/studios/1/projects/1/tasks/");
      setTasks(response.data.results);
    }
    fetchTasks();
  }, []);

  return (
    <div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
