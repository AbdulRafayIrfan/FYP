import React from "react";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white text-xs text-center">
      © {currentYear} BUB Student Hub, All rights reserved
    </footer>
  );
}

export default Footer;
