import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  async function fetchData() {
    try {
      const projectRes = await api.get(`/projects/${id}/`);
      setProject(projectRes.data);
      const taskRes = await api.get(`/tasks/?project=${id}`);
      setTasks(taskRes.data.results || taskRes.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const projectRes = await api.get(`/projects/${id}/`);
        setProject(projectRes.data);
        const taskRes = await api.get(`/tasks/?project=${id}`);
        setTasks(taskRes.data.results || taskRes.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [id]);

  async function handleCreateTask(e) {
    e.preventDefault();

    try {
      await api.post("/tasks/", {
        title,
        project: id,
        assigned_to: 1,
        status: "DRAFT",
        priority: "HIGH",
      });

      setTitle("");

      fetchData();
    } catch (err) {
      console.log(err);
      alert("Could not create task");
    }
  }

  if (!project) {
    return <p>Loading...</p>;
  }

  return (
    <div className="page">
      <div className="card">
        <h1>{project.name}</h1>
        <p>{project.description}</p>
      </div>

      <form onSubmit={handleCreateTask}>
        <input
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button>Create Task</button>
      </form>

      <div className="grid">
        {tasks.map((task) => (
          <Link
            key={task.id}
            to={`/tasks/${task.id}`}
            style={{ textDecoration: "none" }}
          >
            <div className="card">
              <h3>{task.title}</h3>
              <p>Status: {task.status}</p>
              <p>Priority: {task.priority}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
