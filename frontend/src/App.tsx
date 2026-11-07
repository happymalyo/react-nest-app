import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/Signup";
import Home from "./components/home/Home";
import AppSection from "./components/home/AppSection";
import Layout from "./components/dashboard/Layout";
import Article from "./components/dashboard/article";
import User from "./components/dashboard/users";
import ArticleForm from "./components/dashboard/article/ArticleForm";
import ProtectedRoute from "./utils/ProtectedRoute";
import "./App.css";

const sectionRoutes = [
  { path: "/app/discussions", title: "Discussions", description: "Share ideas and join conversations with the community." },
  { path: "/app/jobs", title: "Jobs & internships", description: "Discover the latest roles and early-career opportunities." },
  { path: "/app/salaries", title: "Salary statistics", description: "Explore anonymous compensation insights." },
  { path: "/app/messages", title: "Messages", description: "Keep up with your private conversations." },
  { path: "/app/profile", title: "Profile & settings", description: "Manage your profile, preferences, and privacy." },
];
const inApp = (content: React.ReactNode) => <ProtectedRoute><Layout>{content}</Layout></ProtectedRoute>;
function App() {
  return <Router><Routes>
    <Route path="/" element={inApp(<Home />)} />
    {sectionRoutes.map((section) => <Route key={section.path} path={section.path} element={inApp(<AppSection title={section.title} description={section.description} />)} />)}
    <Route path="/app/articles" element={inApp(<Article />)} />
    <Route path="/app/articles/add" element={inApp(<ArticleForm />)} />
    <Route path="/app/articles/edit/:id" element={inApp(<ArticleForm />)} />
    <Route path="/app/users" element={inApp(<User />)} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
  </Routes><ToastContainer position="top-right" /></Router>;
}
export default App;
