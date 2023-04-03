import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SearchNfts } from "../../../graphql/queries/nftQueries";
const Menu = [
  {
    title: "Marketplace",
    link: "/marketplace",
  },

  { title: "How It Works", link: "/how-it-works" },

  {
    title: " Profile",
    link: "/profile",
  },
  {
    title: "Edit Profile",
    link: "/edit-profile",
  },

  {
    title: "Create NFT",
    link: "/upload",
  },

  {
    title: "Contact",
    link: "/contact",
  },
];

function MobileMenu({ active, logout, login }) {
  const [searchNfts] = useLazyQuery(SearchNfts);
  const [searchData, setSearchData] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const ref = useRef();

  const Search = (searchQuery) => {
    searchNfts({
      variables: {
        key: searchQuery,
      },
    })
      .then((res) => {
        setSearchData(res.data.searchNfts);
        console.log(res.data.searchNfts);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsVisible(false);
    }
  };
  return (
    <div>
      <div className="header__mobile__menu space-y-40">
        <ul className="d-flex space-y-20">
          {Menu.map((val, i) => (
            <li key={i}>
              <Link to={val.link} className="color_black">
                {val.title}
              </Link>
            </li>
          ))}
        </ul>
        <div className="space-y-20">
          <div className="header__search in_mobile w-full">
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => {
                setIsVisible(true);
                console.log(e.target.value);
                e.target.value.trim() !== ""
                  ? Search(e.target.value)
                  : setSearchData([]);
              }}
              onFocus={() => {
                setSearchData([]);
              }}
            />
            <button className="header__result">
              <i className="ri-search-line" />
            </button>
            {isVisible && searchData.length > 0 && (
              <div
                className="rounded position-absolute p-3 py-2 shadow "
                style={{
                  background: "white",
                  width: "100%",
                  top: "50px",
                  zIndex: 1000,
                }}
                ref={ref}
              >
                {searchData.map((item, index) => (
                  <Link
                    to={`/assets/${item.network}/${item.collectionAddress}/${item.tokenId}`}
                  >
                    <div
                      className="d-flex border-bottom py-3"
                      style={{
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>{item.name}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
          {!active ? (
            <span className="btn btn-grad btn-sm" onClick={login}>
              <i className="ri-wallet-3-line" />
              Connect Wallet
            </span>
          ) : (
            <span className="btn btn-grad btn-sm" onClick={logout}>
              <i className="ri-wallet-3-line" />
              Disconnect Wallet
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default MobileMenu;
