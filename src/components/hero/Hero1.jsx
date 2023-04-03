import React from "react";
import { Link } from "react-router-dom";

const Hero1 = () => {
  return (
    <div className="hero__1">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <div className="hero__left space-y-20">
              <h1 className="hero__title">
                Discover Digital Art & Collect Your Favourite NFTs.
              </h1>
              <p className="hero__text txt">
                Bidex NFT is a unique and new way to collaborate with your
                favourite artist, musicians, athletes and teams.
              </p>
              <div
                className="space-x-20 d-flex flex-column flex-md-row
							sm:space-y-20"
                style={{ alignItems: "center" }}>
                <Link className="btn btn-primary" to="marketplace">
                  Start Collaborating
                </Link>
                <Link
                  className="btn btn-white"
                  to="upload"
                  style={{ marginTop: 0 }}>
                  Create NFT
                </Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <img
              className=""
              id="img_js"
              src={process.env.PUBLIC_URL + "assets/images/3dside.jpg"}
              alt="img"
              style={{ objectFit: "cover", width: "100%" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero1;
