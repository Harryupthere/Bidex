import { useQuery } from "@apollo/client";
import { Form, Select, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import CardAuctions from "../../../components/cards/CardAuctions";
import CardMarketplace from "../../../components/cards/CardMarketplace";
const { Option } = Select;
function MenuCategoriesAuctionMarket() {
  const [categories, setCategories] = useState({
    collection: "",
    team: "",
    athlete: "",
    musician: "",
    artist: "",
    network: "",
    nftStatus: "",
  });

  useEffect(() => {
    console.log(categories);
  }, [categories]);

  return (
    <div className="w-100">
      <div className="mt-5">
        {" "}
        <CategoryPanel setCategories={setCategories} categories={categories} />
      </div>
      <>
        <div className="container">
          <div className="section mt-50">
            <div>
              <div>
                <div>
                  {/* <div className="d-flex align-items-center"> */}
                  <CardAuctions categories={categories} />

                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      {/* </Tabs> */}
    </div>
  );
}

const CategoryPanel = ({ categories, setCategories }) => {
  const onCategoryCollectionChange = (value) => {
    setCategories({ ...categories, collection: value, musician: "" });
  };
  // const onCategoryTeamChange = (value) => {
  //   console.log("TeamValue: " + value);
  //   setCategories({ ...categories, team: value });
  // };
  // const onCategoryAthleteChange = (value) => {
  //   setCategories({ ...categories, athlete: value });
  // };
  const onCategoryMusicianChange = (value) => {
    setCategories({ ...categories, musician: value, collection: "" });
  };
  // const onCategoryArtistChange = (value) => {
  //   setCategories({ ...categories, artist: value });
  // };
  const onCategoryAvailabilityChange = (value) => {
    setCategories({ ...categories, nftStatus: value });
  };
  return (
    <>
      <div className="container">
        <div className="row category-grid">
          {/* //Collection */}
          <div>
            <Select
              // showSearch
              placeholder="Sports"
              style={{ width: "100%" }}
              value={categories.collection || "Sports"}
              onChange={(value) => {
                onCategoryCollectionChange(value);
              }}
            >
              <Option value="">None</Option>
              <Option value="rugby15">Rugby 15s</Option>
              <Option value="rugby7">Rugby 7s</Option>
              <Option value="rugby_league">Rugby League</Option>
              <Option value="touch_rugby">Touch Rugby</Option>
              <Option value="track">Track & Field</Option>
              <Option value="basketball">Basketball</Option>
              <Option value="boxing">Boxing</Option>
              <Option value="handball">Handball</Option>
              <Option value="hockey">Hockey</Option>
              <Option value="soccer">Soccer</Option>
              <Option value="netball">Netball</Option>
              <Option value="tennis">Tennis</Option>
              <Option value="golf">Golf</Option>
              <Option value="mma">MMA</Option>
              <Option value="afl">AFL</Option>
              <Option value="nfl">NFL</Option>
            </Select>
          </div>

          {/* Musician */}
          {/* <div>
            <Select
              // showSearch
              placeholder="Music"
              style={{ width: "100%" }}
              value={categories.musician || "Music"}
              onChange={(value) => {
                onCategoryMusicianChange(value);
              }}
            >
              <Option value="">None</Option>
              <Option value="2-pac">2 Pac</Option>
              <Option value="taylor-swift">Taylor Swift</Option>
              <Option value="dre">Dre</Option>
              <Option value="eminem">Eminem</Option>
            </Select>
          </div> */}
          {/* Artist */}
          {/* <div>
            <Select
              // showSearch
              placeholder="Artist"
              style={{ width: "100%" }}
              onChange={onCategoryArtistChange}
            >
              <Option value="">None</Option>
              <Option value="borbay">Borbay</Option>
              <Option value="grace-daly">Grace Daly</Option>
              <Option value="kerri-scheif">Kerri Scheif</Option>
              <Option value="a-r-s">A.R.S</Option>
            </Select>
          </div> */}
          {/* Availability */}
          <div>
            <Select
              // showSearch
              placeholder="Status"
              style={{ width: "100%" }}
              onChange={onCategoryAvailabilityChange}
            >
              <Option value="">None</Option>
              <Option value="notlisted">Not Listed</Option>
              <Option value="polygon">For Sale Polygon</Option>
              <Option value="ethereum">For Sale Binance</Option>
              <Option value="polygon_sold">Sold Polygon</Option>
              <Option value="ethereum_sold">Sold Binance</Option>
            </Select>
          </div>
        </div>
      </div>
    </>
  );
};
export default MenuCategoriesAuctionMarket;
