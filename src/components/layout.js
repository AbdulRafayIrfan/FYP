import Footer from "./footer";
import Navbar from "./navbar";

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-primary">
      <Navbar />
      <main id="content" className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
