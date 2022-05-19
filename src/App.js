import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Header from "./components/Header"
import Footer from "./components/Footer"

import Home from "./pages/Home"
import VolcanoList from "./pages/VolcanoList"
import Volcano from "./pages/Volcano";
import Register from "./pages/Register"
import Login from "./pages/Login"

export default function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/volcano-list" element={<VolcanoList />} />
        <Route path="/volcano-list/volcano" element={<Volcano />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </div>
    </BrowserRouter>
  );
}
