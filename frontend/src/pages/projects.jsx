import { useEffect, useState } from "react";
import api from "../api/api";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function loadProjects() {
      const response = await api.get("/studios/1/projects/");
      setProjects(response.data.results);
    }
    loadProjects();
  }, []);

  return (
    <div>
      <h2>Projects</h2>
      {projects.map((project) => (
        <div key={project.id}>{project.name}</div>
      ))}
    </div>
  );
}
