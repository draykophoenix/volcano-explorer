import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./constant/Header"
import Footer from "./constant/Footer"

import Home from "./pages/Home"
import VolcanoList from "./pages/VolcanoList"
import Volcano from "./pages/Volcano";
import Register from "./pages/Register"
import Login from "./pages/Login"

export default function App() {
  let stored_instance = localStorage.getItem("instance");
  let initial_instance = (stored_instance === null ?
     {email: "", token: ""} 
     :
      JSON.parse(stored_instance))

  const [instance, setInstance] = useState(initial_instance);

  return (
    <div className="App">
      <BrowserRouter>
      <div className="content">
      <Header instance= {instance} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/volcano-list" element={<VolcanoList />} />
          <Route path="/volcano-list/volcano" element={<Volcano />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login setInstance= {setInstance} />} />
        </Routes>
      </div>
      <Footer />
      </BrowserRouter>
    </div>
  );
}
