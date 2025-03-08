const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const usersFile = path.join(__dirname, "../data/users.json");
const SECRET_KEY = "your_secret_key"; // Change this to a strong secret key

// Helper function to read users.json
const readUsers = () => {
  if (!fs.existsSync(usersFile)) return [];
  return JSON.parse(fs.readFileSync(usersFile));
};

// Helper function to write to users.json
const writeUsers = (users) => {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

// ✅ REGISTER USER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ message: "All fields are required" });

  const users = readUsers();
  if (users.find((user) => user.email === email)) return res.status(400).json({ message: "Email already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: users.length + 1, name, email, password: hashedPassword };
  users.push(newUser);
  writeUsers(users);

  res.status(201).json({ message: "User registered successfully" });
});

// ✅ LOGIN USER
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();
  const user = users.find((user) => user.email === email);

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ message: "Login successful", token });
});

// ✅ GET USER PROFILE
router.get("/users/:id", (req, res) => {
  const users = readUsers();
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: "User not found" });

  res.json({ id: user.id, name: user.name, email: user.email });
});

// ✅ UPDATE USER PROFILE
router.put("/users/:id", (req, res) => {
  const { name, email } = req.body;
  let users = readUsers();
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));

  if (index === -1) return res.status(404).json({ message: "User not found" });

  users[index] = { ...users[index], name: name || users[index].name, email: email || users[index].email };
  writeUsers(users);

  res.json({ message: "User updated successfully" });
});

// ✅ DELETE USER ACCOUNT
router.delete("/users/:id", (req, res) => {
  let users = readUsers();
  const newUsers = users.filter((u) => u.id !== parseInt(req.params.id));

  if (users.length === newUsers.length) return res.status(404).json({ message: "User not found" });

  writeUsers(newUsers);
  res.json({ message: "User deleted successfully" });
});

module.exports = router;
