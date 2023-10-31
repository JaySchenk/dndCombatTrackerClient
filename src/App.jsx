import { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Collection from "./pages/Collection.jsx";
import HomePage from "./pages/HomePage.jsx";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <>
        <Link to="/collection">
          <button>collection</button>
        </Link>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collection" element={<Collection />} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
