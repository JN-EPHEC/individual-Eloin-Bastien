const form = document.getElementById("user-form");
const nom = document.getElementById("nom");
const prenom = document.getElementById("prenom");
const list = document.getElementById("user-list");

// Chargement page, GET /api/users
async function loadUsers() {
  const res = await fetch("/api/users");
  const users = await res.json();

  list.innerHTML = "";
  users.forEach((u) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";
    li.dataset.id = u.id;
    li.innerHTML = `
      <span>${u.nom} ${u.prenom}</span>
      <button class="btn btn-sm btn-warning edit-btn">Modifier</button>
      <button class="btn btn-sm btn-danger">X</button>
    `;
    list.appendChild(li);
  });

  const countBadge = document.getElementById("user-count");
  if (countBadge) {
    countBadge.textContent = users.length;
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Valeurs du form
  const body = { nom: nom.value, prenom: prenom.value };

  // POST /api/users
  const res = await fetch("/api/users", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  // Si ok, rafraîchir liste sans reload page
  if (res.ok) {
    form.reset();
    await loadUsers();
  }
});

// Delete user

// Gestion des clics (Delete & Update)
list.addEventListener("click", async (e) => {
  if (e.target.tagName !== "BUTTON") return;

  const li = e.target.closest("li");
  const id = li.dataset.id;

  if (e.target.classList.contains("btn-danger")) {
    const res = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });

    if (res.status === 204) {
      await loadUsers();
    }
  }

  if (e.target.classList.contains("btn-warning")) {
    const nouveauNom = prompt("Nouveau nom :");
    const nouveauPrenom = prompt("Nouveau prénom :");

    if (nouveauNom && nouveauPrenom) {
      const res = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom: nouveauNom, prenom: nouveauPrenom }),
      });

      if (res.ok) {
        await loadUsers();
      }
    }
  }
});

// Chargement initial
loadUsers();
