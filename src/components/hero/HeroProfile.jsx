import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import { MdVerified } from "react-icons/md";
import { truncateAddress } from "../../utils/utility";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";
const HeroProfile = ({ account, userInfo }) => {
  const ref = useRef();
  const [isActive, setActive] = useState(false);
  const toggleFollow = () => {
    setActive(!isActive);
  };
  const [isShare, setShare] = useState(false);

  const toggleShare = () => {
    setShare(!isShare);
  };
  const [isMore, setMore] = useState(false);

  const toggleMore = () => {
    setMore(!isMore);
  };
  useEffect(() => {}, []);

  console.log(userInfo?.user?.user?.bg_image);

  return (
    <div className="mb-100">
      <div className="hero__profile">
        <div className="cover">
          <img
            src={
              userInfo?.user?.user?.bg_image ||
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIL0qVUQJz_FAJmid8OrOh7rKzwB-LWXDbDkrHQpujVkp1I0vvXGZYEPT7aYj-Ji2QZyQ&usqp=CAU"
            }
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src =
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIL0qVUQJz_FAJmid8OrOh7rKzwB-LWXDbDkrHQpujVkp1I0vvXGZYEPT7aYj-Ji2QZyQ&usqp=CAU";
            }}
            alt="ImgPreview"
          />
        </div>
        <div className="infos">
          <div className="container">
            <div className="row flex-wrap align-items-center justify-content-between sm:space-y-50">
              <div className="col-md-auto mr-20">
                <div className="avatars d-flex space-x-20 align-items-center">
                  <div className="avatar_wrap">
                    <img
                      className="avatar avatar-xl"
                      src={
                        userInfo?.user?.user?.avatar_url ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIL0qVUQJz_FAJmid8OrOh7rKzwB-LWXDbDkrHQpujVkp1I0vvXGZYEPT7aYj-Ji2QZyQ&usqp=CAU"
                      }
                      alt="avatar"
                    />
                  </div>
                  <h5
                    style={{ marginLeft: "50px" }}
                    onClick={() =>
                      tippy("#verifyBadge", {
                        content: "You are " + userInfo?.user?.user?.userBadge,
                      })
                    }
                  >
                    @
                    {userInfo?.user?.user?.username === undefined
                      ? "Unnamed"
                      : userInfo?.user?.user?.username}
                    {userInfo?.user?.user?.isVerify && (
                      <span id="verifyBadge">
                        {userInfo?.user?.user?.userBadge === "legend" && (
                          <MdVerified size={30} color="#000" />
                        )}{" "}
                        {userInfo?.user?.user?.userBadge === "verified" && (
                          <MdVerified size={30} color="#00a1e5" />
                        )}{" "}
                        {userInfo?.user?.user?.userBadge === "superstar" && (
                          <MdVerified size={30} color="#eeb635" />
                        )}{" "}
                        {userInfo?.user?.user?.userBadge === "experienced" && (
                          <MdVerified size={30} color={"#00c666"} />
                        )}
                      </span>
                    )}
                  </h5>
                </div>
              </div>
              <div className="col-md-auto">
                <div className="d-sm-flex flex-wrap align-items-center space-x-20 mb-20_reset d-sm-block">
                  <div className="mb-20">
                    <div className="copy">
                      <span className="color_text">
                        {truncateAddress(account)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroProfile;
