import { useEffect, useState } from "react";
import api from "../api/api";

export default function Studios() {
  const [studios, setStudios] = useState([]);
  const [name, setName] = useState("");

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

    try {
      await api.post("/studios/", { name });
      setName("");

      const response = await api.get("/studios/");
      setStudios(response.data.results || response.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="page">
      <h1>Studios</h1>

      <form onSubmit={createStudio}>
        <input
          placeholder="Studio Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <button>Create Studio</button>
      </form>

      <div className="grid">
        {studios.map((studio) => (
          <div key={studio.id} className="card">
            <h2>{studio.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
