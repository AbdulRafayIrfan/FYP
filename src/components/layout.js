import Footer from "./footer";
import Navbar from "./navbar";

function Layout({ children }) {
  return (
    <main className="bg-primary h-screen">
      <Navbar />
      <section id="content">{children}</section>
      <Footer />
    </main>
  );
}

export default Layout;
