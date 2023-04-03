import React, { useEffect, useRef, useState } from "react";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import { Link, useHistory } from "react-router-dom";
import { Card, Tabs, message, Modal } from "antd";

import { TabList, TabPanel } from "react-tabs";
import { useParams } from "react-router-dom";
import Countdown from "react-countdown";
import useDocumentTitle from "../../../components/useDocumentTitle";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import Web3 from "web3";
import { ChainsInfo } from "../../../config/config-chains";
import {
  getErc1155Contract,
  getErc721Contract,
} from "../../../utils/contractHelper";

import useStorage from "../../../hooks/useStorage";
import {
  getNetworkChainID,
  getNetworkName,
  truncateAddress,
} from "../../../utils/utility";
import { FilterNfts, GetActivity } from "../../../graphql/queries/nftQueries";
import { useMutation, useQuery } from "@apollo/client";
import useNFT from "../../../hooks/useNFT";
import { useWeb3React } from "@web3-react/core";
import useCardTransaction from "../../../hooks/useCardTransaction";
import Loading from "../../../components/Loading/Loading";
import {
  DeleteNft,
  LazyMint,
  UpdateNft,
} from "../../../graphql/mutations/nftMutations";
import useAuth from "../../../hooks/useAuth";
import {
  GetOwnerNFT,
  GetSingleNFT,
} from "../../../graphql/queries/userQueries";
import { DownOutlined } from "@ant-design/icons";
import { MdOutlineZoomOutMap } from "react-icons/md";
import Counter from "../../../components/Counter";

// Random component
const Completionist = () => <span>auction ending soon now!</span>;
// Renderer callback with condition
const renderer = ({ hours, minutes, seconds, completed }) => {
  if (completed) {
    // Render a complete state
    return <Completionist />;
  } else {
    // Render a countdown
    return (
      <span>
        {hours} : {minutes} : {seconds}
      </span>
    );
  }
};

const AuctionItemDetails = () => {
  const ref = useRef();
  const [open, setOpen] = useState(false);
  const { account, active, chainId } = useWeb3React();
  const { network, address, tokenid } = useParams();
  const { initCardTransaction } = useCardTransaction();
  const [price, setPrice] = useState(0);
  const [placeBidding, setPlaceBid] = useState(0);
  const [auctionDate, setAuctionDate] = useState(null);
  const [updateNft] = useMutation(UpdateNft);
  const [lazyMinting] = useMutation(LazyMint);
  const [auctionData, setAuctionDataset] = useState([]);
  const {
    nftApprove,
    putOnAuction,
    putOnSale,
    placeBid,
    auctionDataset,
    cancelAuction,
    nftApproveToken,
    getAllBidders,
    tokenURI,
  } = useNFT();

  const { login } = useAuth();
  const [metadata, setMetadata] = useState({});
  const { downloadJSONOnIpfs } = useStorage();
  const [update, setUpdate] = useState(false);
  const closeTooltip = () => ref.current.close();
  const [loading, setLoading] = useState(false);
  const [allBidders, setGetAllBidders] = useState([]);
  //NFT PURCHASE

  const getOwnerNFT = useQuery(GetSingleNFT, {
    variables: {
      tokenId: tokenid,
      collectionAddress: address,
      network: network,
    },
  });

  useEffect(async () => {
    setLoading(true);
    await auctionDataset(network, tokenid).then((res) => {
      console.log(res);
      setAuctionDataset(res);
    });
    await getAllBidders(network, tokenid).then((res) => {
      console.log(res);
      setGetAllBidders(res);
    });
    setLoading(false);
  }, [update]);

  useEffect(async () => {
    setLoading(true);
    await downloadJSONOnIpfs(getOwnerNFT?.data?.getSingleNft[0]?.url).then(
      (metadata_) => {
        setMetadata(metadata_);
      }
    );
    setLoading(false);
  }, [getOwnerNFT?.data?.getSingleNft[0]?.url]);
  useDocumentTitle("Item Details");

  const onChangeNFTPrice = (e) => {
    console.log(e.target.value);
    setPrice(e.target.value);
  };
  const onPlaceBid = (e) => {
    console.log(e.target.value);
    setPlaceBid(e.target.value);
  };

  const onChangeAuctionDate = (e) => {
    console.log(
      parseInt(
        (new Date(e.target.value).getTime() - new Date().getTime()) / 1000
      )
    );
    setAuctionDate(
      parseInt(
        (new Date(e.target.value).getTime() - new Date().getTime()) / 1000
      )
    );
  };

  const placeBidNFT = async () => {
    setLoading(true);
    nftApproveToken(placeBidding)
      .send({
        from: account,
      })
      .then(() => {
        placeBid(tokenid, placeBidding)
          .send({
            from: account,
          })
          .then((res) => {
            console.log(res);
            updateNft({
              variables: {
                collectionAddress: address,
                tokenId: tokenid,
                isMarketPlace: true,
                nftStatus: getNetworkName(chainId),
                ownerAddress: getOwnerNFT?.data?.getSingleNft[0]?.ownerAddress,
                price: parseFloat(placeBidding),
              },
              refetchQueries: [
                {
                  query: FilterNfts,
                  variables: {
                    collections: "",
                    team: "",
                    athlete: "",
                    musician: "",
                    artist: "",
                    network: "",
                    nftStatus: "",
                    page: 0,
                  },
                },
              ],
            });
            setLoading(false);
            setUpdate(!update);
          })
          .catch((err) => {
            console.log(err);
            message.error(err);
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
        message.error(err);
        setLoading(false);
      });
  };

  const removeNftFromAuction = async () => {
    setLoading(true);
    cancelAuction(tokenid)
      .send({
        from: account,
      })
      .then((res) => {
        console.log(res);
        setLoading(false);
        setUpdate(!update);
        updateNft({
          variables: {
            collectionAddress: address,
            tokenId: tokenid,
            ownerAddress: account,
            nftStatus: "notlisted",
            isMarketPlace: false,
            price: 0.0,
          },
          update: (cache) => {
            cache.writeQuery({
              query: FilterNfts,
              data: {
                filterNfts: {
                  collections: "",
                  team: "",
                  athlete: "",
                  musician: "",
                  artist: "",
                  network: "",
                  nftStatus: "",
                  page: 0,
                },
              },
              variables: {
                collections: "",
                team: "",
                athlete: "",
                musician: "",
                artist: "",
                network: "",
                nftStatus: "",
                page: 0,
              },
            });
          },
        });
      })
      .catch((err) => {
        message.error(err);
        setLoading(false);
      });
  };

  const onPutOnAuction = async () => {
    setLoading(true);
    await nftApprove(tokenid)
      .send({ from: account })
      .then(async (res) => {
        console.log(res);
        await putOnAuction(tokenid, price, auctionDate)
          .send({
            from: account,
          })
          .then(() => {
            updateNft({
              variables: {
                collectionAddress: address,
                tokenId: tokenid,
                isMarketPlace: true,
                nftStatus: getNetworkName(chainId),
                ownerAddress: account,
                price: parseFloat(placeBidding),
              },
              refetchQueries: [
                {
                  query: FilterNfts,
                  variables: {
                    collections: "",
                    team: "",
                    athlete: "",
                    musician: "",
                    artist: "",
                    network: "",
                    nftStatus: "",
                    page: 0,
                  },
                },
              ],
            });
            setLoading(false);
            setUpdate(!update);
          })
          .catch((err) => {
            message.error(err);
            setLoading(false);
          });
      })
      .catch((err) => {
        message.error(err);
        setLoading(false);
      });
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <div>
      <Header />
      <div className="container">
        <Link to="/" className="btn btn-white btn-sm my-40">
          Back to home
        </Link>
        <div className="item_details">
          <div className="row sm:space-y-20">
            <div className="col-lg-6" style={{ position: "relative" }}>
              <img
                className="item_img"
                src={metadata?.image}
                alt="ImgPreview"
              />

              <div style={{ position: "absolute", bottom: 0, right: 0 }}>
                {" "}
                <ImageModal
                  setOpen={setOpen}
                  open={open}
                  getOwnerNFT={getOwnerNFT}
                  metadata={metadata}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="space-y-20">
                <h3>
                  {getOwnerNFT?.data?.getSingleNft[0].lazyMint !== "1" &&
                  getOwnerNFT?.data?.getSingleNft[0].lazyMint !== "2"
                    ? metadata?.title
                    : getOwnerNFT?.data?.getSingleNft[0].name}
                </h3>
                <div className="numbers">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="space-y-5">
                        <h6>Price</h6>
                        {getOwnerNFT?.data?.getSingleNft[0].lazyMint === "1" ? (
                          <>
                            <h4>
                              {parseInt(auctionData?.highestBid) /
                                Math.pow(10, 18)}
                              <span className="txt_sm color_text">
                                {
                                  ChainsInfo[getNetworkChainID(network)]
                                    .CURRENCY_SYMBOL
                                }{" "}
                              </span>
                            </h4>
                          </>
                        ) : (
                          <>
                            <h4>
                              {parseInt(auctionData?.highestBid) /
                                Math.pow(10, 18)}{" "}
                              <span className="txt_sm color_text">
                                {
                                  ChainsInfo[getNetworkChainID(network)]
                                    .CURRENCY_SYMBOL
                                }{" "}
                              </span>
                            </h4>
                          </>
                        )}
                        {auctionData.started && (
                          <Counter endDate={parseInt(auctionData.endAt)} />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/* getOwnerNFT.data.getSingleNft[0] */},
                <div className="d-flex gap-5">
                  <div class="avatars space-x-5 mb-4">
                    <div class="media">
                      <div>
                        <img
                          alt="Avatar"
                          class="avatar "
                          style={{ width: "50px", height: "50px" }}
                          src="data:image/jpeg;base64,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"
                        ></img>
                      </div>
                    </div>
                    <div>
                      <div>
                        <div>
                          <p
                            class="avatars_name color_black"
                            style={{ margin: "0px" }}
                          >
                            Owner
                          </p>
                          <Link
                            to={`/owner/${getOwnerNFT?.data?.getSingleNft[0]?.ownerAddress}`}
                          >
                            <p
                              class="avatars_name"
                              style={{
                                margin: "0px",
                                color: "rgb(112, 112, 112)",
                              }}
                            >
                              {truncateAddress(
                                getOwnerNFT?.data?.getSingleNft[0]?.ownerAddress
                              )}
                            </p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="avatars space-x-5 mb-4">
                    <div class="media">
                      <div>
                        <img
                          alt="Avatar"
                          class="avatar "
                          style={{ width: "50px", height: "50px" }}
                          src="https://media.istockphoto.com/photos/modern-abstract-background-picture-id1178390169?b=1&k=6&m=1178390169&s=170667a&w=0&h=hFpXCZd_02pYgGGRCtcuCZ0UvWG7hf1ZdUJCP6RRp44="
                        ></img>
                      </div>
                    </div>
                    <div>
                      <div>
                        <div>
                          <p
                            class="avatars_name color_black"
                            style={{ margin: "0px" }}
                          >
                            Creator
                          </p>
                          <p
                            class="avatars_name"
                            style={{
                              margin: "0px",
                              color: "rgb(112, 112, 112)",
                            }}
                          >
                            {truncateAddress(metadata.creator)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <></>
                <a
                  target="_blank"
                  href={`${
                    ChainsInfo[getNetworkChainID(network)].BLOCK_EXPLORER_URL +
                    "token/" +
                    address
                  }`}
                  rel="noreferrer"
                  // className="mt-3 "
                  style={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    color: "rgb(86, 145, 254)",
                    cursor: "pointer",
                  }}
                >
                  <span>
                    <img
                      src="https://pbs.twimg.com/profile_images/1296736608482283520/6mDtyT6V_400x400.jpg"
                      alt="scan"
                      width={30}
                    ></img>
                  </span>{" "}
                  View on Explore{" "}
                </a>
                <div className="mt-3 d-flex">
                  <DropdownMenu network={network} metadata={metadata?.image} />
                </div>
                <div className="hr2" />
                <div className="d-flex space-x-20">
                  {active ? (
                    <div className="d-flex space-x-20">
                      <>
                        {console.log(
                          getOwnerNFT?.data?.getSingleNft[0]?.ownerAddress ===
                            account,
                          auctionData.started
                        )}
                        {getOwnerNFT?.data?.getSingleNft[0]?.ownerAddress ===
                          account && (
                          <>
                            {auctionData.started ? (
                              <div>
                                <button
                                  className="btn btn-primary
                                                w-full"
                                  aria-label="Close"
                                  onClick={() => {
                                    removeNftFromAuction();
                                  }}
                                >
                                  Remove From Auction
                                </button>
                              </div>
                            ) : (
                              <Popup
                                className="custom"
                                ref={ref}
                                trigger={
                                  <button className="btn btn-lg btn-primary">
                                    Put on Auction
                                  </button>
                                }
                                position="bottom center"
                              >
                                <div>
                                  <div
                                    className="popup"
                                    id="popup_bid"
                                    tabIndex={-1}
                                    role="dialog"
                                    aria-hidden="true"
                                  >
                                    <div>
                                      <button
                                        type="button"
                                        className="button close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                        onClick={closeTooltip}
                                      >
                                        <span aria-hidden="true">×</span>
                                      </button>
                                      <div className="space-y-20">
                                        <h3>Checkout</h3>
                                        <p>
                                          You are going to put{" "}
                                          <span className="color_black">
                                            <strong> {metadata?.title} </strong>
                                          </span>
                                          on marketplace.
                                        </p>
                                        <div className="space-y-10">
                                          <p>You pay</p>

                                          <input
                                            type="number"
                                            className="form-control"
                                            min={0}
                                            placeholder={`00.00 ${
                                              ChainsInfo[
                                                getNetworkChainID(network)
                                              ].CURRENCY_SYMBOL
                                            }`}
                                            onChange={onChangeNFTPrice}
                                          />
                                          <input
                                            type="date"
                                            min={new Date().getDate() + 1}
                                            onChange={onChangeAuctionDate}
                                            required
                                          />
                                        </div>
                                        <div className="hr" />

                                        <button
                                          to="404"
                                          className="btn btn-primary
                                                           w-full"
                                          aria-label="Close"
                                          onChange={onChangeNFTPrice}
                                          onClick={() => {
                                            if (
                                              getNetworkChainID(network) ==
                                              chainId
                                            ) {
                                              onPutOnAuction();
                                            } else {
                                              alert(
                                                "Please change your network "
                                              );
                                              closeTooltip();
                                            }
                                          }}
                                        >
                                          Put on Auction
                                        </button>

                                        <button
                                          to="404"
                                          className="btn btn-primary
                                                           w-full"
                                          aria-label="Close"
                                          // onChange={onChangeNFTPrice}
                                          onClick={() => {
                                            closeTooltip();
                                            initCardTransaction();
                                          }}
                                        >
                                          Buy with Card
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Popup>
                            )}
                          </>
                        )}

                        {getOwnerNFT?.data?.getSingleNft[0]?.ownerAddress !==
                          account && (
                          <>
                            {auctionData.started ? (
                              !allBidders.includes(account) ? (
                                <Popup
                                  className="custom"
                                  ref={ref}
                                  trigger={
                                    <button className="btn btn-lg btn-primary">
                                      Place Bid
                                    </button>
                                  }
                                  position="bottom center"
                                >
                                  <div>
                                    <div
                                      className="popup"
                                      id="popup_bid"
                                      tabIndex={-1}
                                      role="dialog"
                                      aria-hidden="true"
                                    >
                                      <div>
                                        <button
                                          type="button"
                                          className="button close"
                                          data-dismiss="modal"
                                          aria-label="Close"
                                          onClick={closeTooltip}
                                        >
                                          <span aria-hidden="true">×</span>
                                        </button>
                                        <div className="space-y-20">
                                          <h3>Checkout</h3>
                                          <p>
                                            You are going to place bid{" "}
                                            <span className="color_black">
                                              <strong>
                                                {" "}
                                                {metadata?.title}{" "}
                                              </strong>
                                            </span>
                                          </p>
                                          <div className="space-y-10">
                                            <p>You pay</p>

                                            <input
                                              type="number"
                                              className="form-control"
                                              min={0}
                                              placeholder={`00.00 ${
                                                ChainsInfo[
                                                  getNetworkChainID(network)
                                                ].CURRENCY_SYMBOL
                                              }`}
                                              onChange={onPlaceBid}
                                            />
                                          </div>
                                          <div className="hr" />

                                          <button
                                            to="404"
                                            className="btn btn-primary
                                                               w-full"
                                            aria-label="Close"
                                            onChange={placeBidNFT}
                                            onClick={() => {
                                              if (
                                                getNetworkChainID(network) ==
                                                chainId
                                              ) {
                                                placeBidNFT();
                                              } else {
                                                alert(
                                                  "Please change your network "
                                                );
                                                closeTooltip();
                                              }
                                            }}
                                          >
                                            Place Bid
                                          </button>

                                          <button
                                            to="404"
                                            className="btn btn-primary
                                                               w-full"
                                            aria-label="Close"
                                            onClick={() => {
                                              closeTooltip();
                                              initCardTransaction();
                                            }}
                                          >
                                            Buy with Card
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Popup>
                              ) : (
                                <button className="btn btn-lg btn-primary">
                                  You have already place bid
                                </button>
                              )
                            ) : (
                              <button className="btn btn-lg btn-primary">
                                Not Listed
                              </button>
                            )}
                          </>
                        )}
                      </>
                    </div>
                  ) : (
                    <button onClick={login} className="btn btn-lg btn-primary">
                      Connect Wallet
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row sm:space-y-20">
            <div className="col-lg-6">
              <div className="my-3">
                <Card title="Description" style={{}}>
                  <div className="d-flex justify-content-between mt-2">
                    <span className="avatars_name color_black">
                      Contract Address
                    </span>
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "18px",
                        color: "#5691fe",
                        cursor: "pointer",
                      }}
                    >
                      {truncateAddress(address)}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <span className="avatars_name color_black">
                      Creator Address
                    </span>
                    <span
                      style={{
                        fontWeight: "bold",
                        fontSize: "18px",
                        color: "#5691fe",
                        cursor: "pointer",
                      }}
                    >
                      {truncateAddress(
                        getOwnerNFT?.data?.getSingleNft[0]?.creatorAddress
                      )}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <span className="avatars_name color_black">Token ID</span>
                    <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                      {tokenid}
                    </span>
                  </div>{" "}
                  <div className="d-flex justify-content-between mt-2">
                    <span className="avatars_name color_black">
                      Token Standard
                    </span>
                    <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                      {" "}
                      {"ERC721"}
                    </span>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <span className="avatars_name color_black">Blockchain</span>
                    <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                      {network}
                    </span>
                  </div>
                </Card>
              </div>
              <div className="my-3">
                <Card title="Details" style={{}}>
                  {metadata?.description}
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const TabSection = ({ metadata }) => {
  const { network, address, tokenid } = useParams();
  const { data, loading, error } = useQuery(GetActivity, {
    variables: {
      contractAddress: address.toString(),
      network: network.toString(),
      tokenId: parseInt(tokenid),
    },
  });
  if (!loading) {
    console.log(data?.activity);
  }

  return (
    <Tabs
      defaultActiveKey="1"
      // onChange={onChange}
      items={[
        {
          label: `History`,
          key: "history",
          children: data?.activity.map((item, i) => (
            <p key={i}>{item.event}</p>
          )),
        },
        {
          label: `Properties`,
          key: "properties",
          children: (
            <>
              <div>
                {metadata?.properties?.length > 0 ? (
                  <div>Data</div>
                ) : (
                  <div>No Properties</div>
                )}
              </div>
            </>
          ),
        },
      ]}
    />
  );
};

const DropDownHover = () => {
  const items = [
    {
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          1st menu item
        </a>
      ),
      key: "0",
    },
    {
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          2nd menu item
        </a>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: "3rd menu item（disabled）",
      key: "3",
      disabled: true,
    },
  ];
};

export default AuctionItemDetails;
function DropdownMenu({ network, metadata }) {
  return (
    <>
      <div class="dropdown">
        <button class="btn btn-lg btn-primary">More Option</button>
        <div class="dropdown-content">
          <a
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              alert("Link Copied");
            }}
          >
            Share Link
          </a>
          <a target="_blank" href={metadata}>
            Metadata Content
          </a>
        </div>
      </div>
    </>
  );
}
const ImageModal = ({ setOpen, open, getOwnerNFT, metadata }) => {
  return (
    <>
      <>
        <div
          type="primary"
          onClick={() => setOpen(true)}
          style={{ cursor: "pointer" }}
        >
          <MdOutlineZoomOutMap size={30} />
        </div>
        <Modal
          footer={null}
          centered
          open={open}
          onOk={() => setOpen(false)}
          onCancel={() => setOpen(false)}
          width={1000}
        >
          {" "}
          <img
            style={{ width: "100%" }}
            className="item_img"
            src={
              getOwnerNFT?.data?.getSingleNft[0].lazyMint !== "1" &&
              getOwnerNFT?.data?.getSingleNft[0].lazyMint !== "2"
                ? metadata?.image
                : getOwnerNFT?.data?.getSingleNft[0].imageUrl
            }
            alt="ImgPreview"
          />
        </Modal>
      </>
    </>
  );
};
