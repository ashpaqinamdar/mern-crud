import React, { useState } from "react";
import AddBookForm from "../../Components/AddBook";
import Axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { editBook, addBook } from "../../URL";

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
    id: props.location?.state?.data?._id
      ? props.location?.state?.data?._id
      : "",
  });
  const [loading, setLoading] = useState(false);
  const [imageBase64, setImageBase64] = useState(
    props.location?.state?.data?.coverImage
      ? props.location?.state?.data?.coverImage
      : ""
  );
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
      setLoading(true);
      if (props.location?.state?.edit) {
        Axios.put(editBook, {
          bookName: bookInfo.bookName,
          genre: bookInfo.genre,
          price: bookInfo.price,
          hardBound: typeToSend.Hardbound,
          pdf: typeToSend.PDF,
          paperBack: typeToSend.PaperBack,
          id: id,
          coverImage: imageBase64 ? imageBase64 : "",
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
            setLoading(false);
            return "";
          });
      } else {
        Axios.post(addBook, {
          bookName: bookInfo.bookName,
          genre: bookInfo.genre,
          price: bookInfo.price,
          hardBound: typeToSend.Hardbound,
          pdf: typeToSend.PDF,
          paperBack: typeToSend.PaperBack,
          coverImage: imageBase64 ? imageBase64 : "",
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
            setLoading(false);
            return "";
          });
      }
    }
  };

  const handleImageUpload = async (e) => {
    let file = e.target.files[0];
    let fileType = file.type; // image/jpeg
    let fileSize = file.size; // 3MB

    if (fileSize > 2 * 1000000) {
      alert(
        `File size is too large, please upload image of size less than 2MB.\nSelected File Size: ${
          fileSize / 1000000
        }MB only`
      );
      return;
    }
    getBase64(e.target.files[0], (result) => {
      setImageBase64(result);
    });
  };

  function getBase64(file, cb) {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  }
  const handleRemoveImage = () => {
    setImageBase64("");
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
        loading={loading}
        handleImageUpload={handleImageUpload}
        image={imageBase64}
        handleRemoveImage={handleRemoveImage}
        view={
          props?.location?.state?.view ? props?.location?.state?.view : false
        }
        data={props?.location?.state?.data}
      />
    </div>
  );
}

export default AddBook;
