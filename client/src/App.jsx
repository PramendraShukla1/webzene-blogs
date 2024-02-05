import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./utils/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PostDetails from "./pages/PostDetails";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Profile from "./pages/Profile";
import Loader from "./components/Loader"
import axios from "axios";

const App = () => {

  axios.defaults.baseURL = "http://localhost:4001/"
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />} path="/">
            <Route  element={<Home />}path="/" />
            <Route element={<PostDetails />} path="/posts/post/:id" />
            <Route element={<CreatePost />} path="/write" />
            <Route element={<EditPost />} path="/edit/:id" />
            <Route element={<Profile />} path="/profile/:id" />
            <Route element={<Loader />} path="/loader" />
          </Route>
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
