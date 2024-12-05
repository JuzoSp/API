const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

const app = express();

//Activer cors pour seulement le port 3000
app.use(cors({
    origin: 'http://localhost:3000', // Origine autorisée
  }));
  
app.use(bodyParser.json()); // Middleware pour parser les JSON dans les requêtes

// Simuler une base de données en mémoire
let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

// GET /users - Retourne la liste des utilisateurs
app.get("/users", (req, res) => {
  res.status(200).json(users);
});

// POST /users - Ajoute un utilisateur
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  // Validation des champs
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required." });
  }

  // Création d'un nouvel utilisateur avec un ID unique
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);

  res.status(201).json(newUser);
});

// DELETE /user/:id - Supprime un utilisateur par ID
app.delete("/user/:id", (req, res) => {
  const { id } = req.params;

  // Trouver l'index de l'utilisateur
  const userIndex = users.findIndex((user) => user.id === parseInt(id));

  if (userIndex === -1) {
    return res.status(404).json({ error: "User not found." });
  }

  // Supprimer l'utilisateur
  users.splice(userIndex, 1);

  res.status(200).json({ message: "User deleted successfully." });
});

// Démarrer le serveur
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
