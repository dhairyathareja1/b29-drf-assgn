import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api/api";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("DRAFT");
  const [priority, setPriority] = useState("MEDIUM");

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
        stage: status,
        priority: priority,
      });

      setTitle("");
      setStatus("DRAFT");
      setPriority("MEDIUM");

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

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="DRAFT">Draft</option>
          <option value="REVIEW">Review</option>
          <option value="REVISION">Revision</option>
          <option value="APPROVED">Approved</option>
          <option value="COMPLETED">Completed</option>
        </select>

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>

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
              <p>Status: {task.stage}</p>
              <p>Priority: {task.priority}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
