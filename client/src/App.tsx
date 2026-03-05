import { useEffect, useState } from "react";
import "./App.css";

interface User {
  id: number;
  nom: string;
  prenom: string;
}

function App() {
  const [data, setData] = useState<User[]>([]);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");

  const API_URL = "http://localhost:3000/api/users";

  // Charger les utilisateurs (GET)
  const loadUsers = async () => {
    try {
      const res = await fetch(API_URL);
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error("Erreur lors du chargement :", err);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  // Ajouter un utilisateur (POST)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom, prenom }),
    });

    if (res.ok) {
      setNom("");
      setPrenom("");
      await loadUsers();
    }
  };

  // Supprimer un utilisateur (DELETE)
  const handleDelete = async (id: number) => {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (res.status === 204) {
      await loadUsers();
    }
  };

  // Modifier un utilisateur (PUT)
  const handleEdit = async (user: User) => {
    const nouveauNom = prompt("Nouveau nom :", user.nom);
    const nouveauPrenom = prompt("Nouveau prénom :", user.prenom);

    if (nouveauNom && nouveauPrenom) {
      const res = await fetch(`${API_URL}/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom: nouveauNom, prenom: nouveauPrenom }),
      });
      if (res.ok) await loadUsers();
    }
  };

  return (
    <div className="container py-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h1 className="card-title mb-3 d-flex justify-content-between align-items-center">
            <span>Liste des étudiants</span>
            <span className="badge bg-secondary">{data.length}</span>
          </h1>

          <form onSubmit={handleSubmit} className="row g-2 mb-3">
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
              />
            </div>
            <div className="col-md-4">
              <input
                className="form-control"
                placeholder="Prénom"
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                required
              />
            </div>
            <div className="col-md-4 d-grid">
              <button className="btn btn-primary" type="submit">
                Ajouter
              </button>
            </div>
          </form>

          <ul className="list-group mt-3">
            {data.map((u) => (
              <li
                key={u.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>
                  {u.nom} {u.prenom}
                </span>
                <div className="btn-group">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => handleEdit(u)}
                  >
                    Modifier
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(u.id)}
                  >
                    X
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
