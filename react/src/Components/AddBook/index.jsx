import React from "react";
import "./index.css";
import { InputBase } from "@material-ui/core";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@mui/material/Button";
import { IoIosArrowRoundBack } from "react-icons/io";
import Checkbox from "@material-ui/core/Checkbox";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import LoadingState from "../../Components/Loader";
import { AiOutlineCloseCircle } from "react-icons/ai";

function AddBookForm({
  bookInfo,
  genre,
  type,
  onChange,
  handleChangeType,
  handleSubmit,
  error,
  loading,
  handleImageUpload,
  image,
  handleRemoveImage,
  view,
  data,
}) {
  const navigate = useHistory();
  const navigateToHome = () => {
    navigate.push("/");
  };
  console.log("sdada", view);
  return (
    <div className="containerForm">
      <IoIosArrowRoundBack
        style={{ fontSize: "40px", cursor: "pointer", marginLeft: "-6px" }}
        onClick={navigateToHome}
      />
      {!view ? (
        <div className="addBookForm">
          <div className="inputField">
            <label htmlFor="bookName">
              Book Name<span className="required-sign">*</span>
            </label>
            <InputBase
              id="bookName"
              name="bookName"
              type="text"
              onChange={(e) => onChange(e)}
              value={bookInfo.bookName}
              placeholder="Enter book name"
            />
            {error.bookNameError && (
              <div className="errorTags">Please enter book name</div>
            )}
          </div>
          <div className="inputField">
            <label htmlFor="genre">
              Genre<span className="required-sign">*</span>
            </label>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="genre"
              onChange={(e) => onChange(e)}
              value={bookInfo.genre}
              placeholder="Enter book name"
            >
              {genre.map((item) => (
                <MenuItem value={item.genre} key={item.id}>
                  {item.genre}
                </MenuItem>
              ))}
            </Select>
            {error.genreError && (
              <div className="errorTags">
                Please select a genre<span className="required-sign">*</span>
              </div>
            )}
          </div>

          <div className="inputFieldGroup">
            {type.map((item, index) => (
              <div key={index}>
                <label htmlFor="type">{item.name}</label>
                <Checkbox
                  checked={item.checked}
                  onChange={() => handleChangeType(item.name)}
                  inputProps={{ "aria-label": "primary checkbox" }}
                  name="type"
                />
              </div>
            ))}
          </div>
          {error.typeError && (
            <div style={{ marginTop: "-25px" }} className="errorTags">
              Please check atleast one option
            </div>
          )}
          <div className="inputField">
            <label htmlFor="price">
              Price (₹)<span className="required-sign">*</span>
            </label>
            <InputBase
              id="price"
              name="price"
              type="text"
              onChange={(e) => onChange(e)}
              value={bookInfo.price}
              placeholder="Enter book price"
            />
            {error.priceError && (
              <div className="errorTags">Please enter a valid price</div>
            )}
          </div>
          <div className="inputField">
            {image ? (
              <>
                <img src={image} className="uploaded-image" />
                <div
                  onClick={handleRemoveImage}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginTop: 20,
                    cursor: "pointer",
                    color: "red",
                  }}
                >
                  <AiOutlineCloseCircle style={{ marginRight: 10 }} /> Remove
                  Image
                </div>
              </>
            ) : (
              <>
                <label htmlFor="price">Upload Cover Image</label>
                <input
                  type="file"
                  id="img"
                  name="img"
                  accept="image/*"
                  onChange={(event) => handleImageUpload(event)}
                  value={image}
                />
              </>
            )}
          </div>
          <Button
            variant="contained"
            onClick={() => handleSubmit(bookInfo.id)}
            className="buttonClass"
            style={{ marginTop: "30px", padding: "6px 16px" }}
            loading={true}
          >
            {loading ? (
              <LoadingState Width={30} Height={20} initial={false} />
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      ) : (
        <div style={{ paddingLeft: 30 }}>
          {console.log("sadasd", data)}
          <div style={{ margin: "20px 0px" }}>
            <label htmlFor="price">Book Name</label>
            <div style={{ marginTop: 10 }}>{bookInfo.bookName}</div>
          </div>
          <div style={{ margin: "20px 0px" }}>
            <label htmlFor="price">Genre</label>
            <div style={{ marginTop: 10 }}>{bookInfo.genre}</div>
          </div>
          <div style={{ margin: "20px 0px" }}>
            <label htmlFor="price">Available In</label>
            <div style={{ marginTop: 10 }}>
              {data.hardBound && <div>Hard Bound</div>}
              {data.paperBack && <div>Parperback</div>}
              {data.pdf && <div>PDF</div>}
            </div>
          </div>
          <div style={{ margin: "20px 0px" }}>
            <label htmlFor="price">Price</label>
            <div style={{ marginTop: 10 }}>{bookInfo.price}</div>
          </div>
          <div style={{ margin: "20px 0px" }}>
            <label htmlFor="price">Cover Image</label>
            <div style={{ marginTop: 10 }}>
              {image ? <img src={image} style={{ width: 100 }} /> : "N/A"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddBookForm;
