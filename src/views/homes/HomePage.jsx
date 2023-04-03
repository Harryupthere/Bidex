import React, { useEffect } from "react";
import Cards1 from "../../components/cards/Cards1";
import useDocumentTitle from "../../components/useDocumentTitle";
import Header from "../../components/header/Header";
import Hero1 from "../../components/hero/Hero1";
import Footer from "../../components/footer/Footer";

const Home1 = () => {
  useDocumentTitle(" Bidex NFT | Home");
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <Header />
      <Hero1 />
      <Cards1 />
      <Footer />
    </div>
  );
};

export default Home1;
