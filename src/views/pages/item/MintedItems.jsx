import React, { useEffect, useRef, useState } from "react";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import { Link, useHistory } from "react-router-dom";
import {
  Card,
  Tabs,
  message,
  InputNumber,
  Dropdown,
  Space,
  Modal,
  Button,
} from "antd";

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
import {
  FilterNfts,
  GetActivity,
  GetNFTbyObjectId,
} from "../../../graphql/queries/nftQueries";
import { useMutation, useQuery } from "@apollo/client";
import useNFT from "../../../hooks/useNFT";
import { useWeb3React } from "@web3-react/core";
import useCardTransaction from "../../../hooks/useCardTransaction";
import Loading from "../../../components/Loading/Loading";
import {
  CreateNft,
  DeleteNft,
  MintedSupply,
  UpdateNft,
} from "../../../graphql/mutations/nftMutations";
import useAuth from "../../../hooks/useAuth";
import { GetOwnerNFT } from "../../../graphql/queries/userQueries";
import { MdOutlineZoomOutMap } from "react-icons/md";

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

const MintedItem = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { account, active } = useWeb3React();
  const { network, address, id } = useParams();
  const { downloadJSONOnIpfs } = useStorage();
  const history = useHistory();
  const { login } = useAuth();
  const [metadata, setMetadata] = useState({});
  const [deleteNft] = useMutation(DeleteNft);
  const [createNft] = useMutation(CreateNft);
  const [mintedSupply] = useMutation(MintedSupply);
  const { lazyMintReedem, getTotalNFTCount } = useNFT();

  useDocumentTitle("Item Details");
  const { data: NFTData } = useQuery(GetNFTbyObjectId, {
    variables: {
      nftId: id,
    },
  });

  useEffect(() => {
    downloadJSONOnIpfs(NFTData?.getNFTbyObjectId[0].url).then((metadata_) => {
      setMetadata(metadata_);
    });
  }, [NFTData]);

  const getNFTPrice = (data) => {
    if (data) {
      return parseInt(JSON.parse(data).value.minPrice);
    }
    return 0;
  };

  const mintNft = () => {
    if (active) {
      let data = NFTData?.getNFTbyObjectId[0];
      setLoading(true);
      console.log(getNFTPrice(data.lazyMintData));
      let lazyData = JSON.parse(data.lazyMintData);
      console.log([
        lazyData.value.creator,
        lazyData.value.minPrice,
        lazyData.value.royaltyCut,
        lazyData.value.royaltyWalletAddr,
        lazyData.value.uri,
        lazyData.signer,
      ]);
      lazyMintReedem(account, [
        lazyData.value.creator,
        lazyData.value.minPrice,
        lazyData.value.royaltyCut,
        lazyData.value.royaltyWalletAddr,
        lazyData.value.uri,
        lazyData.signer,
      ])
        .send({
          from: account,
          value: lazyData.value.minPrice,
        })
        .then(async (res) => {
          const count = parseInt(await getTotalNFTCount()) - 1;
          console.log(count);
          mintedSupply({
            variables: {
              nftId: data._id,
              mintedNft: parseInt(data.mintedNft) + 1,
              availableSupply: parseInt(data.availableSupply) - 1,
            },
          });
          createNft({
            variables: {
              name: data.name,
              tokenId: count.toString(),
              url: data.url,
              chainId: data.chainId,
              creatorAddress: account,
              ownerAddress: account,
              imageUrl: data.imageUrl,
              network: getNetworkName(data.chainId),
              collectionAddress: data.collectionAddress,
              collections: data.collections,
              athlete: "",
              availability: "",
              musician: data.musician,
              nftStatus: getNetworkName(data.chainId),
              teams: "",
              artist: "",
              lazyMint: "",
              lazyMintData: "",
              isAuction: false,
              availableSupply: 0,
              mintedNft: 0,
              supply: 0,
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
              cache.writeQuery({
                query: GetOwnerNFT,
                data: {
                  getNftsOfOwner: {
                    ownerAddress: account,
                  },
                },
                variables: {
                  ownerAddress: account,
                },
              });
            },
          }).then((res) => {
            setLoading(false);
            history.goBack();
            console.log(res);
            setLoading(false);
          });
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          setLoading(false);
        });
    }
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
                src={NFTData?.getNFTbyObjectId[0]?.imageUrl}
                alt="ImgPreview"
              />

              <div style={{ position: "absolute", bottom: 0, right: 0 }}>
                {" "}
                <ImageModal
                  setOpen={setOpen}
                  open={open}
                  getOwnerNFT={NFTData?.getNFTbyObjectId[0]?.creatorAddress}
                  metadata={NFTData?.getNFTbyObjectId[0]?.imageUrl}
                />
              </div>
            </div>
            <div className="col-lg-6">
              <div className="space-y-20">
                <div className="numbers">
                  <div className="">
                    <h2>{metadata?.title}</h2>
                    <div className="d-flex justify-content-between">
                      <div className="space-y-5">
                        <h6>Price</h6>

                        <>
                          <h4>
                            {getNFTPrice(
                              NFTData?.getNFTbyObjectId[0]?.lazyMintData
                            ) / Math.pow(10, 18)}{" "}
                            <span className="txt_sm color_text">
                              {
                                ChainsInfo[getNetworkChainID(network)]
                                  .CURRENCY_SYMBOL
                              }{" "}
                            </span>
                          </h4>
                        </>
                      </div>
                      <div className="space-y-5 ">
                        <h6>Total Supply Available</h6>

                        <>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <h4>
                              {NFTData?.getNFTbyObjectId[0]?.supply -
                                NFTData?.getNFTbyObjectId[0]?.mintedNft}
                            </h4>
                          </div>
                        </>
                      </div>{" "}
                      <div className="space-y-5  ">
                        <h6>NFT Minted</h6>

                        <>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            <h4>{NFTData?.getNFTbyObjectId[0]?.mintedNft}</h4>
                          </div>
                        </>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex gap-5">
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
                            {truncateAddress(
                              NFTData?.getNFTbyObjectId[0]?.creatorAddress
                            )}
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
                  {NFTData?.getNFTbyObjectId[0]?.supply -
                    NFTData?.getNFTbyObjectId[0]?.mintedNft ===
                  0 ? (
                    <button class="btn btn-lg btn-primary">
                      ALL NFT ARE SOLD
                    </button>
                  ) : (
                    <button
                      class="btn btn-lg btn-primary"
                      onClick={() => (active ? mintNft() : login())}
                    >
                      {active ? "Mint NFT" : "Connect Wallet"}
                    </button>
                  )}
                  {NFTData?.getNFTbyObjectId[0]?.lazyMint === "1" &&
                    NFTData?.getNFTbyObjectId[0]?.ownerAddress === account && (
                      <div className="ml-3">
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            setLoading(true);
                            deleteNft({
                              variables: {
                                deleteNftId: NFTData?.getNFTbyObjectId[0]?._id,
                              },
                            }).then((res) => {
                              setLoading(false);
                              history.push("/marketplace");
                            });
                          }}
                        >
                          Delete
                        </button>
                      </div>
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
                    ></span>
                  </div>
                  <div className="d-flex justify-content-between mt-2">
                    <span className="avatars_name color_black">Token ID</span>
                    <span style={{ fontWeight: "bold", fontSize: "18px" }}>
                      {id}
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
  const { network, address, id } = useParams();
  const { data, loading, error } = useQuery(GetActivity, {
    variables: {
      contractAddress: address.toString(),
      network: network.toString(),
      tokenId: parseInt(id),
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

export default MintedItem;
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
const ImageModal = ({ setOpen, open, metadata }) => {
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
            src={metadata}
            alt="ImgPreview"
          />
        </Modal>
      </>
    </>
  );
};
