const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const BookModel = require("./models/Books");

app.use(cors());
app.use(express.json());

mongoose.connect(
  "mongodb+srv://inamdarashpaq:qP6bJh1JICE3dqF2@merncrud.3c3bmys.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

app.post("/add-book", async (req, res) => {
  const bookName = req.body.bookName;
  const genre = req.body.genre;
  const hardBound = req.body.hardBound;
  const pdf = req.body.pdf;
  const paperBack = req.body.paperBack;
  const price = req.body.price;

  const book = new BookModel({
    bookName: bookName,
    genre: genre,
    hardBound: hardBound,
    pdf: pdf,
    paperBack: paperBack,
    price: price,
  });

  try {
    await book.save();
    res.send("Data inserted");
  } catch (err) {
    console.log("err", err);
  }
});

app.get("/get-books", async (req, res) => {
  try {
    const books = await BookModel.find({});
    res.send(books);
    console.log(books);
  } catch (err) {
    console.log(err);
  }
});

app.delete("/delete-book/:id", async (req, res) => {
  const bookId = req.params.id;
  try {
    const books = await BookModel.findByIdAndRemove(bookId).exec();
    res.send("deleted successfully");
  } catch (err) {
    console.log(err);
  }
});

app.put("/edit-book", async (req, res) => {
  const bookName = req.body.bookName;
  const genre = req.body.genre;
  const hardBound = req.body.hardBound;
  const pdf = req.body.pdf;
  const paperBack = req.body.paperBack;
  const price = req.body.price;
  const id = req.body.id;

  try {
    const updatedResult = await BookModel.findByIdAndUpdate(
      { _id: id },
      {
        bookName: bookName,
        genre: genre,
        hardBound: hardBound,
        pdf: pdf,
        paperBack: paperBack,
        price: price,
      }
    );
    res.send("Data updated");
    console.log(updatedResult);
  } catch (error) {
    console.log(error);
  }
});
app.listen(3001, () => console.log("running"));
