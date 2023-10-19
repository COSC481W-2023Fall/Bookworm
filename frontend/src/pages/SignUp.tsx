import React from "react";
import ReactDOM from "react-dom";
import App from "./signupApp.tsx";
import "./signup-styles.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

export default App;