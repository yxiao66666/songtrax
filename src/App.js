//Yang Xiao - 46828846

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import HandleShare from "./pages/Share";
import CreateSample from "./pages/CreateSample";
import EditSample from "./pages/EditSample";
import "./styles/starterstyles.css";

function App() {
  return (
    <Router>
      <div>
        {/* Head section */}
        <head>
          <meta charset="UTF-8"></meta>
          <link rel="stylesheet" href="starterstyles.css"></link>
        </head>

        {/* Page header */}
        <header class="page-header">
          {/* Header logo */}
          <div class="header-logo">
            <h2>
              <a href="/" class="header-icon-link">
                SongTrax
              </a>
            </h2>
          </div>
          {/* Header app description */}
          <div class="header-app-description">
            <span>Create & Share Location Based Music Samples!</span>
          </div>
        </header>

        {/* Define routes */}
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/share/:id" element={<HandleShare />} />
          {/* Route for creating a new sample */}
          <Route path="/create-sample" element={<CreateSample />} />
          {/* Route for editing an existing sample */}
          <Route path="/edit-sample/:id" element={<EditSample />} />
        </Routes>

        <footer class="page-footer"></footer>
      </div>
    </Router>
  );
}

export default App;
