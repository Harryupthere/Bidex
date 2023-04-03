import React from "react";
import HeroAuctions from "../../../components/hero/HeroAuctions";
import Header from "../../../components/header/Header";
import Footer from "../../../components/footer/Footer";
import CardAuctions from "../../../components/cards/CardAuctions";
import useDocumentTitle from "../../../components/useDocumentTitle";
import MenuCategoriesAuctionMarket from "../elements/MenuCategoriesAuctionMarket";

const LiveAuctions = () => {
  useDocumentTitle(" Live Auctions ");
  return (
    <div>
      <Header />
      <HeroAuctions />
      <div className="mt-100">
        <div className="container">
          <MenuCategoriesAuctionMarket />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LiveAuctions;
