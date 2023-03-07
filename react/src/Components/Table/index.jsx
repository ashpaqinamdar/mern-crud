import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "./index.css";
import Button from "@mui/material/Button";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FiEdit } from "react-icons/fi";
import { AiFillFilePdf, AiOutlineBook, AiOutlineDelete } from "react-icons/ai";
import { BsNewspaper } from "react-icons/bs";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  root: {
    width: 800,
    margin: "0 auto",
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function TableComponent({ books, handleEdit, deleteBook }) {
  const classes = useStyles();
  const navigate = useHistory();

  const navigateToAddBook = () => {
    navigate.push("/add-book");
  };

  return (
    <>
      <div className="container">
        <div className="headingMainTable">Books listing</div>
        <div style={{ textAlign: "right", margin: "20px 0px" }}>
          <Button
            variant="contained"
            onClick={navigateToAddBook}
            className="buttonClass"
          >
            ADD BOOK
          </Button>
        </div>

        <TableContainer component={Paper} className="tableClass">
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Book Name</TableCell>
                <TableCell align="left">Genre</TableCell>
                <TableCell align="left">Available In</TableCell>
                <TableCell align="left">Price (₹)</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {books?.map((row) => (
                <TableRow key={row.id}>
                  <TableCell component="th" scope="row">
                    {row.bookName}
                  </TableCell>
                  <TableCell align="left">{row.genre}</TableCell>
                  <TableCell align="left">
                    <div>
                      {row.hardBound && (
                        <span>
                          <AiOutlineBook style={{ marginRight: 5 }} />
                          HardBound
                        </span>
                      )}
                    </div>
                    <div>
                      {row.paperBack && (
                        <span>
                          <BsNewspaper style={{ marginRight: 5 }} />
                          Paperback
                        </span>
                      )}
                    </div>
                    <div>
                      {row.pdf && (
                        <span>
                          <AiFillFilePdf style={{ marginRight: 5 }} />
                          PDF
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell align="left">{row.price} /-</TableCell>
                  <TableCell align="left">
                    <span title="Edit">
                      <FiEdit
                        style={{
                          fontSize: 20,
                          marginRight: 20,
                          cursor: "pointer",
                        }}
                        onClick={() => handleEdit(row)}
                      />
                    </span>
                    <span title="Delete">
                      <AiOutlineDelete
                        style={{ fontSize: 22, cursor: "pointer" }}
                        onClick={() => deleteBook(row.id)}
                      />
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {books.length <= 0 && <div className="noBooks">No books added</div>}
      </div>
    </>
  );
}
