import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import useDocumentTitle from "../../../components/useDocumentTitle";

function HowItWorks() {
  useDocumentTitle("Bidex NFT | How it Works");

  const data = [
    {
      title: "Step 1",
      content: "Connect to wallet for login.",
    },
    {
      title: "Step 2",
      content: (
        <>
          Create your profile information.{" "}
          <Link to="/edit-profile"> Click Here </Link>
        </>
      ),
    },
    {
      title: "Step 3",
      content: "Browse NFTs. Find one you like.",
    },
    {
      title: "Step 4",
      content: "Purchase NFT by there given price.",
    },
    {
      title: "Step 5",
      content: "Now you will get your NFT and you are the new owner. ",
    },
  ];
  return (
    <>
      <Header />
      <div className="container" style={{ paddingTop: "80px" }}>
        <h1 className="text-center">How It Works?</h1>
        <div className="text-center">
          {data.map((item, key) => (
            <>
              <div
                key={key}
                style={{ marginBottom: "10px", marginTop: "10px" }}>
                <h2 style={{ marginBottom: "10px", marginTop: "10px" }}>
                  {item.title}
                </h2>
                <p style={{ fontSize: "26px" }}>{item.content}</p>
              </div>
            </>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default HowItWorks;
