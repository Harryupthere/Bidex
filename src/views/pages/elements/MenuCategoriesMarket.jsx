import { useQuery } from "@apollo/client";
import { Form, Select, Pagination } from "antd";
import React, { useEffect, useState } from "react";
import CardMarketplace from "../../../components/cards/CardMarketplace";
import {
  GetAthlete,
  GetCollections,
  GetTeam,
} from "../../../graphql/queries/nftQueries";
const { Option } = Select;
function MenuCategoriesMarket() {
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
                  <CardMarketplace categories={categories} />
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
  const { data: getCollections } = useQuery(GetCollections);
  const { data: getTeam } = useQuery(GetTeam);
  const { data: getAthlete } = useQuery(GetAthlete);

  console.log(getAthlete?.getAthlete, getTeam?.getTeam);
  const onCategoryCollectionChange = (value) => {
    setCategories({ ...categories, collection: value });
  };

  const onCategoryTeamChange = (value) => {
    setCategories({ ...categories, team: value });
  };

  const onCategoryAthleteChange = (value) => {
    setCategories({ ...categories, athlete: value });
  };

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
              onChange={(value) => onCategoryCollectionChange(value)}
            >
              <Option value="">None</Option>
              {getCollections?.getCollections.map((collection, key) => (
                <Option key={key} value={collection.collections}>
                  {collection.collections}
                </Option>
              ))}
              {/* 
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
              <Option value="cricket">Cricket</Option> */}
            </Select>
          </div>
          {/* // Team */}
          <div>
            <Select
              // showSearch
              placeholder="Team"
              style={{ width: "100%" }}
              onChange={onCategoryTeamChange}
            >
              <Option value="">None</Option>
              {getTeam?.getTeam.map((collection, key) => (
                <Option key={key} value={collection.team}>
                  {collection.team}
                </Option>
              ))}
            </Select>
          </div>
          {/* //Athlete */}
          <div>
            <Select
              // showSearch
              placeholder="Athlete"
              style={{ width: "100%" }}
              onChange={onCategoryAthleteChange}
            >
              <Option value="">None</Option>

              {getAthlete?.getAthlete.map((collection, key) => (
                <Option key={key} value={collection.athlete}>
                  {collection.athlete}
                </Option>
              ))}
            </Select>
          </div>
          {/* Musician */}
          {/* <div>
            <Select
              // showSearch
              placeholder="Music"
              style={{ width: "100%" }}
              value={categories.musician || "Music"}
              onChange={(value) => onCategoryMusicianChange(value)}
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
              <Option value="binance">For Sale Binance</Option>
              <Option value="BBNB">For Sale BBNB token</Option>
              <Option value="polygon_sold">Sold Polygon</Option>
              <Option value="binance_sold">Sold Binance</Option>
              <Option value="BBNB_sold">Sold BBNB token</Option>
            </Select>
          </div>
        </div>
      </div>
    </>
  );
};
export default MenuCategoriesMarket;
