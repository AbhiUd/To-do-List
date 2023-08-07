const express = require("express");
const cors = require("cors");
const uuid = require("uuid");
uuidv4 = uuid.v4;

const app = express();

app.use(express.json());
app.use(cors());

let tasks = {};

app.get("/tasks", (req, res) => {
  console.log(tasks);
  res.json({ status: "done", tasks });
});

app.post("/tasks", (req, res) => {
  const task = req.body.task;
  const id = uuidv4();
  tasks[id] = task;
  console.log(tasks);
  res.json({ staus: "done" });
});

app.delete("/tasks/:id", (req, res) => {
  const id = req.params.id;
  if (id in tasks) {
    delete tasks[id];
  }
  console.log(tasks);
  res.json({ status: "done" });
});

app.get("/clearTasks", (req, res) => {
  tasks = {};
  res.json({ status: "done" });
});

app.listen(8080, () => {
  console.log("server started");
});
