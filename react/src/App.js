/** @format */

import React, { Suspense, Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HomePage from "./Containers/HomePage/homePage";
import AddBook from "./Containers/AddBook/index";
import { ToastContainer } from "react-toastify";

const App = () => {
  let routes = (
    <Switch>
      <Route path="/add-book" component={AddBook} />
      <Route path="/edit-book" component={AddBook} />
      <Route path="/" component={HomePage} />
    </Switch>
  );

  return (
    <>
      <Router>
        <Suspense fallback={<div>Loading..</div>}>{routes}</Suspense>
        <ToastContainer position="bottom-right" autoClose={1500} />
      </Router>
      {/* <ToastContainer newestOnTop={false} position="bottom-right" /> */}
    </>
  );
};

export default App;
