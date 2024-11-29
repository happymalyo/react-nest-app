import React from "react";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/Signup";
import Home from "./components/home/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/dashboard/Layout";
import Article from "./components/dashboard/article";
import User from "./components/dashboard/users";

import "./App.css";

function App() {
  return (
    <Router>
      <div>
        {/* Define Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/app/articles"
            element={
              <Layout>
                <Article />
              </Layout>
            }
          />
          <Route
            path="/app/users"
            element={
              <Layout>
                <User />
              </Layout>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>

      <ToastContainer />
    </Router>
  );
}

export default App;
