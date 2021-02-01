import React from "react";
import ReactDom from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "tailwindcss/tailwind.css";

import "./styles.css";
import Home from "./Home";
import AsteroidsCharts from "./AsteroidsCharts";

function App() {
  return (
    <Router>
      <Route exact path="/">
        <Home />{" "}
      </Route>
      <Route path="/charts">
        <AsteroidsCharts />{" "}
      </Route>
    </Router>
  );
}

ReactDom.render(<App />, document.querySelector("#main"));
