import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./components/HomePage/HomePage";
import Registration from "./components/Register/Registration";
import Login from "./components/Login/Login";
import Header from "./components/Header/Header";

import QueryArea from "./components/HomePage/QueryArea";
import Subscriptions from "./components/HomePage/Subscriptions";


// Import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';
import {UserContextProvider } from "./components/Context/UserContext";


function App() {
  return (

    <BrowserRouter>

  <UserContextProvider>


    <Header />


      <Routes>

        <Route path="/" element = {<Registration />}></Route>
        <Route path = "/login" element = {<Login />}></Route>
        <Route path = "/home" element = {<Homepage />}></Route>
        <Route path = "/subscriptions" element = {<Subscriptions />}></Route>
        <Route path = "/query" element = {<QueryArea />}></Route>

        
      </Routes>


      </UserContextProvider>




    </BrowserRouter>

  );
}

export default App;
