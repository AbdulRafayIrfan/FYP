import React from "react";
import Footer from "./footer";
import Navbar from "./navbar";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="bg-primary h-max mt-0">{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
