import React, { useEffect, useState } from "react";
import TableComponent from "../../Components/Table";
import Axios from "axios";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function HomePage() {
  const [books, setBooks] = useState([]);
  const navigate = useHistory();
  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = (e) => {
    Axios.get("http://localhost:3001/get-books")
      .then((res) => {
        setBooks(res.data);
      })
      .catch((e) => {
        console.log("errr", e);
        return "";
      });
  };
  const handleEdit = (row) => {
    navigate.push({
      pathname: "/edit-book",
      state: {
        data: row,
        edit: true,
      },
    });
  };

  const deleteBook = (id) => {
    Axios.delete(`http://localhost:3001/delete-book/${id}`)
      .then((res) => {
        getBooks();
        toast("Book deleted successfully");
      })
      .catch((e) => {
        console.log("errr", e);
        toast("failed to delete book");
        return "";
      });
  };
  return (
    <div>
      <TableComponent
        books={books}
        handleEdit={(row) => handleEdit(row)}
        deleteBook={(id) => deleteBook(id)}
      />
    </div>
  );
}

export default HomePage;
