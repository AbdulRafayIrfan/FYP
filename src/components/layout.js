import Footer from "./footer";
import Navbar from "./navbar";

function Layout({ children }) {
  return (
    <main className="bg-primary h-max">
      <Navbar />
      <section id="content">{children}</section>
      <Footer />
    </main>
  );
}

export default Layout;
