import Image from "next/image";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Features from "./components/Features";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Banner />
      <Features />
      <Footer />
    </div>
  );
}
