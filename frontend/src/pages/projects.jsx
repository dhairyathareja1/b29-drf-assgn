import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  async function fetchProjects() {
    try {
      const response = await api.get("/projects/");
      setProjects(response.data.results || response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await api.get("/projects/");
        setProjects(response.data.results || response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchProjects();
  }, []);

  async function handleCreateProject(e) {
    e.preventDefault();

    try {
      await api.post("/projects/", {
        name,
        description,
        studio: 1,
      });

      setName("");
      setDescription("");
      fetchProjects();
    } catch (err) {
      console.log(err);
      alert("Could not create project");
    }
  }

  return (
    <div className="page">
      <h1>Projects</h1>

      <form onSubmit={handleCreateProject}>
        <input
          placeholder="Project Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button>Create Project</button>
      </form>

      <div className="grid">
        {projects.map((project) => (
          <Link
            key={project.id}
            to={`/projects/${project.id}`}
            style={{ textDecoration: "none" }}
          >
            <div className="card">
              <h2>{project.name}</h2>
              <p>{project.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
