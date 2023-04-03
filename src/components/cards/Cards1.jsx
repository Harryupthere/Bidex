import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import CardMarketplace from "./CardMarketplace";

const Cards1 = () => {
  const ref = useRef();
  const closeTooltip = () => ref.current.close();

  const [categories, setCategories] = useState({
    collection: "",
    team: "",
    athlete: "",
    musician: "",
    artist: "",
    network: "",
    nftStatus: "",
    page: 0,
  });

  return (
    <div className="mt-100">
      <div className="container">
        <div className="section__head">
          <div
            className="d-flex
				space-x-20
				justify-content-between
				align-items-center"
          >
            <h2 className="section__title text-center">Explore</h2>
            <Link to="/marketplace" className="btn btn-sm btn-dark">
              {" "}
              view all{" "}
            </Link>
          </div>
        </div>
        <CardMarketplace categories={categories} />
      </div>
    </div>
  );
};

export default Cards1;
