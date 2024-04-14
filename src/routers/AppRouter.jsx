// import Detail from "pages/ShirtDetailPage/ShirtDetailPage";
// import Shirts from "pages/Shirts/Shirts";
// import Wishlist from "pages/Wishlist/Wishlist";
// import BagPage from "pages/BagPage/BagPage";

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "../components/NavBar";
import Layout from "../modules/Layout";
import { Shirts,ShirtDetails,Wishlist,CartPage,Home } from "../pages";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home/>}/>
        <Route path="/clothing" exact element={<Shirts/>} />
        <Route path="/clothing/:id" exact element={<ShirtDetails/>} />
        <Route path="/wishlist/" exact element={<Wishlist/>} />
        <Route path="/bag/" exact element={<CartPage/>} />
      </Routes>
    </Router>
  );
};
export default AppRouter;
