import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import MobileMenu from "./Menu/MobileMenu";
import MegaMenu from "./Menu/MegaMenu";
import { useWeb3React } from "@web3-react/core";
import useAuth from "../../hooks/useAuth";
import { ChainsInfo } from "../../config/config-chains";
import { SearchNfts } from "../../graphql/queries/nftQueries";
import { useLazyQuery, useQuery } from "@apollo/client";
import Glogin from "../GLogin/GLogin";
import { useGoogleLogout } from "react-google-login";

const HomesMenu = [
  {
    icon: "home-smile-2",
    title: " Home page 1",
    link: "/home-1",
  },
  {
    icon: "home-2",
    title: " Home page 2",
    link: "/home-2",
  },
  {
    icon: "home-5",
    title: " Home page 3",
    link: "/home-3",
  },
];
const PagesMenu = [
  {
    title: "Marketplace",
    link: "/marketplace",
  },

  { title: "How It Works", link: "/how-it-works" },

  {
    title: " Profile",
    link: "/profile",
  },
];

const Header = () => {
  const [isActive, setActive] = useState(false);
  const { logout, login } = useAuth();
  const [searchData, setSearchData] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const ref = useRef();
  const [searchNfts] = useLazyQuery(SearchNfts);

  const { active } = useWeb3React();
  const toggleClass = () => {
    setActive(!isActive);
  };
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
  useEffect(() => {
    if (active) {
      localStorage.setItem(
        "walletConnect",
        JSON.stringify({ isConnect: true })
      );
    }
  }, [active]);
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsVisible(false);
    }
  };

  return (
    <div>
      <header className="header__1">
        <div className="container">
          <div className="wrapper js-header-wrapper">
            <div className="header__logo">
              <Link to="/">
                <img
                  className=""
                  id="logo_js"
                  src={process.env.PUBLIC_URL + "/assets/images/bidexlogo.png"}
                  alt="logo"
                />
              </Link>
            </div>
            {/* ==================  */}
            <div className="header__menu">
              <ul className="d-flex space-x-20" style={{ margin: 0 }}>
                <li className="has_popup">
                  <Link className="color_black" to="/">
                    Home
                  </Link>
                </li>
                {PagesMenu.map((val, i) => (
                  <li key={i}>
                    <Link className="color_black" to={val.link}>
                      {val.title}
                    </Link>
                  </li>
                ))}

                <li className="has_popup2">
                  <Link className="color_black  hovered" to="/">
                    More <i className="ri-more-2-fill" />
                  </Link>
                  <ul className="menu__popup2 space-y-20">
                    <MegaMenu />
                  </ul>
                </li>
              </ul>
            </div>
            {/* ================= */}
            <div className="header__search">
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
              <Link to="no-results" className="header__result">
                <i className="ri-search-line" />
              </Link>
              {isVisible && searchData.length > 0 && (
                <div
                  className="rounded position-absolute p-3 py-2 shadow "
                  style={{
                    background: "white",
                    width: "100%",
                    top: "50px",
                    zIndex: 1000,
                  }}
                  ref={ref}>
                  {searchData.map((item, index) => (
                    <Link
                      to={`/assets/${item.network}/${item.collectionAddress}/${item.tokenId}`}
                      key={index}>
                      <div
                        className="d-flex border-bottom py-3"
                        style={{
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}>
                        <div>{item?.name}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="header__btns">
              {!active ? (
                // <Link className="btn btn-grad btn-sm" to="/connect-wallet">
                // <i className="ri-wallet-3-line" />
                <span
                  className="btn btn-grad btn-sm"
                  onClick={login}
                  style={{ width: "180px" }}>
                  <i className="ri-wallet-3-line" />
                  Connect Wallet
                </span>
              ) : (
                // </Link>
                <span
                  className="btn btn-grad btn-sm"
                  onClick={logout}
                  style={{ width: "180px" }}>
                  <i className="ri-wallet-3-line" />
                  Disconnect Wallet
                </span>
              )}
            </div>
            <div
              className="header__burger js-header-burger"
              onClick={toggleClass}
            />
            <div
              className={` header__mobile js-header-mobile  ${
                isActive ? "visible" : null
              } `}>
              <MobileMenu active={active} logout={logout} login={login} />
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
