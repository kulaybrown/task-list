import React from "react";
import logo from "./logo.svg";
import { Task } from "./redux/Task";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Task />
      </header>
    </div>
  );
}

export default App;
