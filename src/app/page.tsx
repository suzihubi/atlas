import Header from "../components/sections/Header";
import StickyNav from "../components/sections/StickyNav";
import Features from "../components/sections/Features";
import Products from "../components/sections/Products";
import Footer from "../components/sections/Footer";

export default function Home() {
  return (
    <>
      <StickyNav />
      <main data-component="page" style={{ position: "relative", zIndex: 9 }}>
        <Header />
        <Features />
        <Products />
        <Footer />
      </main>
    </>
  );
}
