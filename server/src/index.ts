// This is a simple Express server that responds to a ping request
import express from "express";
import cors from "cors";

const mysql = require("mysql2");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todo_app",
});

db.connect((err: any) => {
  if (err) throw err;
  console.log("MySQL connected...");
});

//API: get all

app.get("/api/todos", (req: any, res: any) => {
  db.query("SELECT * FROM todos", (err: any, results: any) => {
    if (err) throw err;
    res.json(results);
  });
});

app.get("/api/todos/:id", (req: any, res: any) => {
  const {id} = req.params;
  db.query("SELECT * FROM todos WHERE id = ?", [id], (err: any, results: any) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json(results[0]);
    } else {
      res.status(404).json({ message: "Todo not found" });
    }
  });
})

//API: add a todo
app.post("/api/todos", (req: any, res: any) => {
  const { title } = req.body;
  db.query(
    "INSERT INTO todos (title) VALUES (?)",
    [title],
    (err: any, results: any) => {
      if (err) throw err;
      res.json({ id: results.insertId, title, completed: false });
    }
  );
});

//API: update a todo
app.put("/api/todos/:id", (req: any, res: any) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  db.query(
    "UPDATE todos SET title = ?, completed = ? WHERE id = ?",
    [title, completed, id],
    (err: any) => {
      if (err) throw err;
      res.json({ message: "Todo updated successfully" });
    }
  );
});

//API: delete a todo
app.delete("/api/todos/:id", (req: any, res: any) => {
  const { id } = req.params;
  db.query(
    "DELETE FROM todos WHERE id = ?",
    [id],
    (err: any) => {
      if (err) throw err;
      res.json({ message: "Todo updated successfully" });
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});