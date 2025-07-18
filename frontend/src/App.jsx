import React from "react";
import Navbar from "./components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import {Toaster} from "react-hot-toast";

const App = () => {
  // we are in the seller dashboard or not. if the path is /seller, we are in the seller dashboard
  // const isSellerPath = window.location.pathname.includes('/seller');
  const isSellerPath = useLocation().pathname.includes("seller");

  return (
    <div>
      {isSellerPath ? null : <Navbar />}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#fff",
            color: "#000",
            fontSize: "14px",
          },
          success: {
            duration: 3000,
            style: {
              background: "#4caf50",
              color: "#fff",
            },
          },
          error: {
            duration: 3000,
            style: {
              background: "#f44336",
              color: "#fff",
            },
          },
          loading: {
            duration: 3000,
            style: {
              background: "#2196f3",
              color: "#fff",
            },
          },
        }}
      />
      
      <div
        className={` ${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}
      >
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
