import React from "react";
import "./App.css";
import Names from "./Names";

const App = () => {

  return (
    <div className="app">
        <div className="list-books-Headline">
          <h1>MyReads</h1>
        </div>
        <Names/>
    </div>
  );
};

export default App;
