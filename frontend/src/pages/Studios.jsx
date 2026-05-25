import { useEffect, useState } from "react";
import api from "../api/api";

export default function Studios() {
  const [studios, setStudios] = useState([]);
  const [name, setName] = useState("");

  async function fetchStudios() {
    try {
      const response = await api.get("/studios/");
      setStudios(response.data.results || response.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    async function fetchStudios() {
      try {
        const response = await api.get("/studios/");
        setStudios(response.data.results || response.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchStudios();
  }, []);

  async function createStudio(e) {
    e.preventDefault();
    if (!name.trim()) {
      return;
    }

    try {
      await api.post("/studios/", { name });
      setName("");
      fetchStudios();
    } catch (err) {
      console.log(err);
      console.log(err.response?.data);
    }
  }

  return (
    <div className="page">
      <div className="top-section">
        <h1>Studios</h1>
        <p>Create and manage studios</p>
      </div>

      <form onSubmit={createStudio}>
        <input
          placeholder="Studio Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button>Create Studio</button>
      </form>

      <div className="grid">
        {studios.length === 0 && (
          <div className="card">
            <h3>No Studios Yet</h3>
          </div>
        )}

        {studios.map((studio) => (
          <div key={studio.id} className="card">
            <h2>{studio.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
