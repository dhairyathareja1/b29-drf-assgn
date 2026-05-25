import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [studios, setStudios] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [studioId, setStudioId] = useState("");

  async function fetchProjects() {
    try {
      const response = await api.get("/projects/");
      setProjects(response.data.results || response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const [projectsRes, studiosRes] = await Promise.all([
          api.get("/projects/"),
          api.get("/studios/")
        ]);
        setProjects(projectsRes.data.results || projectsRes.data);
        const fetchedStudios = studiosRes.data.results || studiosRes.data;
        setStudios(fetchedStudios);
        if (fetchedStudios.length > 0) {
          setStudioId(fetchedStudios[0].id);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  async function handleCreateProject(e) {
    e.preventDefault();

    if (!studioId) {
      alert("You must select or create a studio first.");
      return;
    }

    try {
      await api.post("/projects/", {
        name,
        description,
        studio: studioId,
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

        <select value={studioId} onChange={(e) => setStudioId(e.target.value)}>
          {studios.length === 0 && <option value="">No studios available</option>}
          {studios.map(s => (
            <option key={s.id} value={s.id}>{s.name}</option>
          ))}
        </select>

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
