import express from "express";
import cors from "cors";

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Temporary storage (in-memory)
let users = [];

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("API WORKING");
});

// ✅ REGISTER
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  // check if user already exists
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = { name, email, password };
  users.push(user);

  res.json({
    message: "User registered successfully",
    user: { name, email }
  });
});

// ✅ LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  // ❗ Correct logic
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  res.json({
    message: "Login successful",
    user: { name: user.name, email: user.email }
  });
});

// ✅ START SERVER
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});