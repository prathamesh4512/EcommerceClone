import Navbar from "../components/NavBar";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};
export default Layout;
