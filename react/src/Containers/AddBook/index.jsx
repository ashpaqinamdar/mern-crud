import React, { useState } from "react";
import AddBookForm from "../../Components/AddBook";
import Axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const genre = [
  { genre: "Fiction/Fantasy", id: 1 },
  { genre: "Mystery", id: 2 },
  { genre: "Drama", id: 3 },
  { genre: "Thriller/Horror", id: 4 },
  { genre: "Historical", id: 5 },
  { genre: "Romance", id: 6 },
  { genre: "Other", id: 7 },
];

function AddBook(props) {
  const [bookInfo, setBookInfo] = useState({
    bookName: props.location?.state?.data?.bookName
      ? props.location?.state?.data?.bookName
      : "",
    genre: props.location?.state?.data?.genre
      ? props.location?.state?.data?.genre
      : "",
    price: props.location?.state?.data?.price
      ? props.location?.state?.data?.price
      : "",
    id: props.location?.state?.data?.id ? props.location?.state?.data?.id : "",
  });
  const [error, setError] = useState({
    bookNameError: false,
    genreError: false,
    priceError: false,
    typeError: false,
  });
  const navigate = useHistory();
  const [type, setType] = useState([
    {
      name: "PaperBack",
      checked: props.location?.state?.data?.paperBack
        ? props.location.state.data.paperBack
        : false,
    },
    {
      name: "Hardbound",
      checked: props.location?.state?.data?.hardBound
        ? props.location.state.data.hardBound
        : false,
    },
    {
      name: "PDF",
      checked: props.location?.state?.data?.pdf
        ? props.location.state.data.pdf
        : false,
    },
  ]);

  const handleChangeType = (e) => {
    const typeListCopy = [...type];
    const modiType = typeListCopy.map((item) => {
      if (e === item.name) {
        item.checked = !item.checked;
      }
      return item;
    });
    setType(modiType);
  };

  const handleOnChange = (e) => {
    let value = e.target.name;
    let bookValue = { ...bookInfo };
    bookValue[value] = e.target.value;
    setBookInfo(bookValue);
  };

  const handleSubmit = (id) => {
    let validate = { ...error };
    let pass = true;
    const re = /^[0-9\b]+$/;

    if (!bookInfo.bookName) {
      validate.bookNameError = true;
      pass = false;
    } else {
      validate.bookNameError = false;
    }
    if (!bookInfo.genre) {
      validate.genreError = true;
      pass = false;
    } else {
      validate.genreError = false;
    }
    if (!bookInfo.price) {
      validate.priceError = true;
      pass = false;
    } else if (!re.test(bookInfo.price)) {
      validate.priceError = true;
      pass = false;
    } else {
      validate.priceError = false;
    }

    const valid = type.some(checked);
    function checked(item) {
      return item.checked === true;
    }
    if (!valid) {
      validate.typeError = true;
      pass = false;
    } else {
      validate.typeError = false;
    }

    setError(validate);

    let typeToSend = {};
    type.map((item) => {
      typeToSend[item.name] = item.checked;
    });

    if (pass) {
      if (props.location?.state?.edit) {
        Axios.put("http://localhost:3001/edit-book", {
          bookName: bookInfo.bookName,
          genre: bookInfo.genre,
          price: bookInfo.price,
          hardBound: typeToSend.Hardbound,
          pdf: typeToSend.PDF,
          paperBack: typeToSend.PaperBack,
          id: id,
        })
          .then(() => {
            navigate.push({
              pathname: "/",
            });
            toast("Book updated successfully");
          })
          .catch((e) => {
            console.log("errr", e);
            toast("failed to update book");
            return "";
          });
      } else {
        Axios.post("http://localhost:3001/add-book", {
          bookName: bookInfo.bookName,
          genre: bookInfo.genre,
          price: bookInfo.price,
          hardBound: typeToSend.Hardbound,
          pdf: typeToSend.PDF,
          paperBack: typeToSend.PaperBack,
        })
          .then(() => {
            navigate.push({
              pathname: "/",
            });
            toast("Book added successfully");
          })
          .catch((e) => {
            console.log("errr", e);
            toast("failed to add book");
            return "";
          });
      }
    }
  };

  return (
    <div>
      <AddBookForm
        genre={genre}
        type={type}
        bookInfo={bookInfo}
        onChange={(e) => handleOnChange(e)}
        handleChangeType={(e) => handleChangeType(e)}
        handleSubmit={(id) => handleSubmit(id)}
        error={error}
      />
    </div>
  );
}

export default AddBook;
