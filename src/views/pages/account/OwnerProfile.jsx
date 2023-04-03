import React, { useState } from "react";
import { useRef } from "react";
import { MdVerified } from "react-icons/md";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import { GetOwnerNFT, UserInfo } from "../../../graphql/queries/userQueries";
import { truncateAddress } from "../../../utils/utility";
import { useQuery } from "@apollo/client";
import { Tabs } from "react-tabs";
import { Link, useParams } from "react-router-dom";
import { ChainsInfo } from "../../../config/config-chains";

function OwnerProfile() {
  const { address } = useParams();
  const { data } = useQuery(UserInfo, {
    variables: {
      walletAddress: address,
    },
  });
  return (
    <div>
      <Header />
      <>
        <HeroProfile account={address} userInfo={data} />{" "}
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-3 col-md-7 order-md-0 order-1">
              <SidebarProfile userInfo={data} />
            </div>
            <div className="col-lg-9 col-md-12 order-md-1 order-0">
              <div className="profile__content">
                <div className="d-flex justify-content-between">
                  <Tabs className="space-x-10">
                    <div className="d-flex justify-content-between"></div>
                    <div className="tab-content">
                      {/* <CardProfile /> */}
                      <UserCardMarketplace address={address} />
                    </div>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
      <Footer />
    </div>
  );
}

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
                  <h5 style={{ marginLeft: "50px" }}>
                    @
                    {userInfo?.user?.user?.username === undefined
                      ? "Unnamed"
                      : userInfo?.user?.user?.username}
                    {userInfo?.user?.user?.isVerify && (
                      <span>
                        <MdVerified />
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

const SidebarProfile = ({ userInfo }) => {
  console.log(userInfo);
  return (
    <div className="profile__sidebar">
      <div className="space-y-40">
        <div className="space-y-10">
          <h5>About me</h5>
          <div className="box space-y-20">
            <p>{userInfo?.user?.user?.about_details}</p>
            {/* s */}
          </div>
        </div>
        <div className="space-y-10">
          <h5>Follow me</h5>
          <div className="box">
            <ul className="social_profile space-y-10 overflow-hidden">
              {userInfo?.user?.user?.facebookUrl &&
                userInfo?.user?.user?.facebookUrl.trim() !== "" && (
                  <li>
                    <a
                      href={userInfo?.user?.user?.facebookUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <i className="ri-facebook-line" />
                      <span className="color_text">facebook</span>
                    </a>
                  </li>
                )}
              {userInfo?.user?.user?.twitterUrl &&
                userInfo?.user?.user?.twitterUrl.trim() !== "" && (
                  <li>
                    <a
                      href={userInfo?.user?.user?.twitterUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <i className="ri-twitter-line" />
                      <span className="color_text"> Twitter</span>
                    </a>
                  </li>
                )}{" "}
              {userInfo?.user?.user?.instagramUrl &&
                userInfo?.user?.user?.instagramUrl.trim() !== "" && (
                  <li>
                    <a
                      href={userInfo?.user?.user?.instagramUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <i className="ri-instagram-line" />
                      <span className="color_text"> Instagram</span>
                    </a>
                  </li>
                )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

function UserCardMarketplace({ address }) {
  const ref = useRef();
  const closeTooltip = () => ref.current.close();
  const { data, loading, error } = useQuery(GetOwnerNFT, {
    variables: {
      ownerAddress: address,
    },
  });

  console.log(data);

  return (
    <div>
      <div
        className="row mb-30_reset profile-card-grid"
        // style={{ gridTemplateColumns: "repeat(3, 1fr)", display: "grid" }}
      >
        {data?.getNftsOfOwner.map((val, i) => (
          <div className="" key={i}>
            <div className="card__item " style={{ margin: "10px 0" }}>
              <div className="card_body space-y-10">
                {/* =============== */}
                <div className="creators space-x-10">
                  <div className="avatars space-x-3">
                    <div to="profile">
                      <img
                        src="https://lumiere-a.akamaihd.net/v1/images/sa_pixar_virtualbg_coco_16x9_9ccd7110.jpeg"
                        alt="Avatar"
                        className="avatar avatar-sm"
                      />
                    </div>
                    <div to="profile">
                      <p className="avatars_name txt_xs" style={{ margin: 0 }}>
                        {truncateAddress(val.creatorAddress)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card_head">
                  <Link
                    to={`/assets/${val.network}/${val.collectionAddress}/${val.tokenId}`}
                  >
                    <img src={val?.imageUrl} alt="nftimage" />
                  </Link>
                  <Link to="#" className="likes space-x-3">
                    <i className="ri-heart-3-fill" />
                    <span className="txt_sm">{val.likes}k</span>
                  </Link>
                </div>
                {/* =============== */}
                <h6 className="card_title">{val.name}</h6>
                <div className="card_footer d-block space-y-10">
                  <div className="card_footer justify-content-between">
                    <div className="creators">
                      <p className="txt_sm"> {val.stock} </p>
                    </div>
                    <div to="#">
                      {val.ownerAddress === address ? (
                        <p className="txt_sm">
                          <span
                            className="color_green
                                                  txt_sm"
                            style={{ fontWeight: "bold" }}
                          >
                            OWNED
                          </span>
                        </p>
                      ) : (
                        <p className="txt_sm">
                          Price:{" "}
                          <span
                            className="color_green
                                                txt_sm"
                          >
                            {val.price ? val.price : 0}{" "}
                            {ChainsInfo[val.chainId].CURRENCY_SYMBOL}
                          </span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OwnerProfile;
