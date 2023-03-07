const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "booksSchema",
});

app.post("/add-book", (req, res) => {
  const bookName = req.body.bookName;
  const genre = req.body.genre;
  const hardBound = req.body.hardBound;
  const pdf = req.body.pdf;
  const paperBack = req.body.paperBack;
  const price = req.body.price;

  db.query(
    "INSERT INTO books (bookName,genre,price,hardBound,pdf,paperBack) VALUES (?,?,?,?,?,?)",
    [bookName, genre, price, hardBound, pdf, paperBack],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("data inserted successfully");
      }
    }
  );
});

app.get("/get-books", (req, res) => {
  db.query("SELECT  * FROM books", (err, result) => {
    if (err) {
      res.send(err);
    } else {
      const converted = result.map((item) => {
        item.paperBack = Boolean(item.paperBack);
        item.hardBound = Boolean(item.hardBound);
        item.pdf = Boolean(item.pdf);
        return item;
      });

      res.send(converted);
    }
  });
});

app.delete("/delete-book/:id", (req, res) => {
  const bookId = req.params.id;
  db.query("DELETE FROM books WHERE id = ?", bookId, (err, result) => {
    if (err) {
      console.log("error", err);
    } else {
      res.send("data deleted successfully");
    }
  });
});

app.put("/edit-book", (req, res) => {
  const bookName = req.body.bookName;
  const genre = req.body.genre;
  const hardBound = req.body.hardBound;
  const pdf = req.body.pdf;
  const paperBack = req.body.paperBack;
  const price = req.body.price;
  const id = req.body.id;

  db.query(
    "UPDATE books SET bookName= ?,genre = ?,price = ?,hardBound = ?,pdf = ?,paperBack = ? WHERE id = ?",
    [bookName, genre, price, hardBound, pdf, paperBack, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("data updated successfully");
      }
    }
  );
});
app.listen(3001, () => console.log("running"));
