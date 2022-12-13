const { Pool } = require("pg");

require("dotenv").config();

const express = require("express");
const { json } = require("express");

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

const pool = new Pool({
  PGHOST: process.env.PGHOST,
  PGUSER: process.env.PGUSER,
  PGDATABASE: process.env.USER,
  PGPASSWORD: process.env.PGPASSWORD,
  PGPORT: 5432,
});

app.get("/", (req, res) => {
  res.send("Welcome to user's API");
});

app.get("/api/users", (req, res) => {
  pool
    .query("SELECT * FROM users")
    .then((data) => res.json(data.rows))
    .catch((e) => res.sendStatus(500));
});

app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  pool
    .query("SELECT * FROM users WHERE id=$1", [id])
    .then((data) => res.json(data.rows))
    .catch((e) => res.sendStatus(500));
});

app.post("/api/users", (req, res) => {
  const { first_name, last_name, age } = req.body;
  console.log(first_name);
  pool
    .query(
      "INSERT INTO users (first_name,last_name,age) VALUES ($1,$2,$3) RETURNING *",
      [first_name, last_name, age]
    )
    .then((data) => res.json(data.rows))
    .catch((e) => res.sendStatus(500));
});
app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, age } = req.body;
  // console.log(
  //   "id:",
  //   id,
  //   "first_name",
  //   first_name,
  //   "last_name",
  //   last_name,
  //   "age",
  //   age
  // );
  pool
    .query("UPDATE users SET first_name=$1, last_name=$2,age=$3 WHERE id=$4 ", [
      first_name,
      last_name,
      age,
      id,
    ])
    .then((data) => res.json(data.rows))
    .catch((e) => res.sendStatus(500));
});
app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  pool
    .query("DELETE FROM users WHERE id =$1", [id])
    .then((data) => res.json(data.rows))
    .catch((e) => res.sendStatus(500));
});

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});

app.get("/api/orders", (req, res) => {
  pool
    .query("SELECT * FROM orders")
    .then((data) => res.json(data.rows))
    .catch((e) => res.sendStatus(500));
});

app.get("/api/orders/:id", (req, res) => {
  const { id } = req.params;
  pool
    .query("SELECT * FROM orders WHERE id=$1", [id])
    .then((data) => res.json(data.rows))
    .catch((e) => res.sendStatus(500));
});

app.post("/api/orders", (req, res) => {
  const { price, date, user_id } = req.body;

  pool
    .query(
      "INSERT INTO orders (price,date,user_id) VALUES ($1,$2,$3) RETURNING *",
      [price, date, user_id]
    )
    .then((data) => res.json(data.rows))
    .catch((e) => res.sendStatus(500));
});

app.put("/api/orders/:id", (req, res) => {
  const { id } = req.params;
  const { price, date, user_id } = req.body;

  pool
    .query("UPDATE orders SET price=$1, date=$2,user_id=$3 WHERE id=$4 ", [
      price,
      date,
      user_id,
      id,
    ])
    .then((data) => res.json(data.rows))
    .catch((e) => res.sendStatus(500));
});
