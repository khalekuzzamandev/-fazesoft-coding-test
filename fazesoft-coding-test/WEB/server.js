const express = require("express");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const tasks = [];
let nextId = 1;

app.get("/", (req, res) => {
  res.send("Server is running......");
});

app.post("/api/tasks", (req, res) => {
  const { title, category } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      message: "Title is required and cannot be empty",
    });
  }

  if (!category || !["work", "personal", "study"].includes(category)) {
    return res.status(400).json({
      message: "Category must be work, personal, or study",
    });
  }

  const newTask = {
    id: nextId++,
    title: title.trim(),
    category,
    status: "pending",
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

app.get("/api/tasks", (req, res) => {
  const { category } = req.query;

  if (
    category &&
    !["work", "personal", "study"].includes(category)
  ) {
    return res.status(400).json({
      message: "Invalid category",
    });
  }

  const filteredTasks = category
    ? tasks.filter((task) => task.category === category)
    : tasks;

  res.status(200).json(filteredTasks);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});