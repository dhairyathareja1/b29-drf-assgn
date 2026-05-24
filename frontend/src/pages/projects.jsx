import { useEffect, useState } from "react";
import api from "../api/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function load() {
      const response = await api.get("/projects/");
      setProjects(response.data);
    }
    load();
  }, []);

  return (
    <div>
      <h2>Projects</h2>
      {projects.map((project) => (
        <div className="card" key={project.id}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
        </div>
      ))}
    </div>
  );
}
