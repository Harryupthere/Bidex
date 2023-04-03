import { useQuery } from "@apollo/client";

import { Pagination } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import { ChainsInfo } from "../../config/config-chains";
import { FilterNfts, GetAll } from "../../graphql/queries/nftQueries";
import { truncateAddress } from "../../utils/utility";

function CardMarketplace({ categories }) {
  console.log(categories, "categories")
  const [length, setLength] = useState(0);
  const [page, setPage] = useState(1);
  const { data } = useQuery(GetAll);
//  console.log(data, "data")
  const { data: filterNftData } = useQuery(FilterNfts, {
    variables: {
      collections: categories?.collection,
      team: categories?.team,
      athlete: categories?.athlete,
      musician: categories?.musician,
      artist: categories?.artist,
      network: categories?.network,
      nftStatus: categories?.nftStatus,
      page: page - 1,
    },
  });

  useEffect(() => {
    setLength(data?.nfts?.length);
  }, [data?.nfts?.length]);

  return (
    <div>
      {length === 0 && (
        <div className="">
          <h1>No NFT Available</h1>{" "}
        </div>
      )}
      <>
        {" "}
        <div className="row mb-30_reset card-grid ">
          {/* {slice(page.prev, page.next)} */}
          {console.log(filterNftData?.filterNfts,"filterNftData?.filterNfts")}{filterNftData?.filterNfts?.map(
            (val, i) =>
              !val.isAuction &&
              val.isMarketPlace &&
              val.isApproved && (
                <div className="" key={i}>
                  <div
                    className="card__item "
                    style={{ margin: "10px 0", maxHeight: "520px" }}
                  >
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
                            <p
                              className="avatars_name txt_xs"
                              style={{ margin: 0 }}
                            >
                              {truncateAddress(val.creatorAddress)}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="card_head">
                        <Link
                          to={
                            val.nftStatus === "minted"
                              ? `/minted/${val.network}/${val.collectionAddress}/${val._id}`
                              : `/assets/${val.network}/${val.collectionAddress}/${val.tokenId}`
                          }
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
                          {val.nftStatus === "notlisted" && (
                            <p className="txt_sm">
                              <span
                                className="color_red
                                                txt_sm"
                                style={{ fontWeight: "bold", textAlign: "end" }}
                              >
                                NOT LISTED
                              </span>
                            </p>
                          )}
                          {console.log(val.nftStatus,"val.nftStatus")}{(val.nftStatus === "polygon_sold" ||
                            val.nftStatus === "binance_sold" ||
                            val.nftStatus === "BBNB_sold") && (
                              <p className="txt_sm">
                                <span
                                  className="color_red
                                              txt_sm"
                                  style={{ fontWeight: "bold", textAlign: "end" }}
                                >
                                  SOLD
                                </span>
                              </p>
                            )}{" "}
                          {(val.nftStatus === "polygon" ||
                            val.nftStatus === "binance" ||
                            val.nftStatus === "BBNB") && (
                              <>
                                {val.lazyMint === "1" ? (
                                  <>
                                    <div className="">
                                      <Link
                                        to={`/assets/${val.network}/${val.collectionAddress}/${val.tokenId}`}
                                      >
                                        <button className="btn  btn-green">
                                          Buy
                                        </button>
                                      </Link>
                                    </div>
                                    <div>
                                      Price:{" "}
                                      <span
                                        className=" color_green
                                              txt_sm"
                                      >
                                        {" "}
                                        {parseInt(
                                          JSON.parse(val.lazyMintData)?.value
                                            .minPrice
                                        ) / Math.pow(10, 18)}
                                        {val.nftStatus == 'BBNB' ? val.nftStatus : ChainsInfo[val.chainId].CURRENCY_SYMBOL}
                                      </span>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div>

                                      <Link
                                        to={`/assets/${val.network}/${val.collectionAddress}/${val.tokenId}`}
                                      >
                                        <button className="btn  btn-green">
                                          Buy
                                        </button>
                                      </Link>
                                    </div>
                                    <div>
                                      Price:{" "}
                                      <span
                                        className="color_green
                                    txt_sm"
                                      >
                                        {" "}
                                        {val.price ? val.price : 0}{" "}
                                        {val.nftStatus == 'BBNB' ? val.nftStatus : ChainsInfo[val.chainId].CURRENCY_SYMBOL}
                                      </span>{" "}
                                    </div>
                                  </>
                                )}
                              </>
                            )}
                          {/* {(val.nftStatus === "BIDEXTOKEN") (
                            <>
                              {val.lazyMint === "1" ? (
                                <>
                                  <div className="">
                                    <Link
                                      to={`/assets/${val.network}/${val.collectionAddress}/${val.tokenId}`}
                                    >
                                      <button className="btn  btn-green">
                                        Buy
                                      </button>
                                    </Link>
                                  </div>
                                  <div>
                                    Price:{" "}
                                    <span
                                      className=" color_green
                                              txt_sm"
                                    >
                                      {" "}
                                      {parseInt(
                                        JSON.parse(val.lazyMintData)?.value
                                          .minPrice
                                      ) / Math.pow(10, 18)}
                                      "BIDEXTOKEN"
                                    </span>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div>
                                    <Link
                                      to={`/assets/${val.network}/${val.collectionAddress}/${val.tokenId}`}
                                    >
                                      <button className="btn  btn-green">
                                        Buy
                                      </button>
                                    </Link>
                                  </div>
                                  <div>
                                    Price:{" "}
                                    <span
                                      className="color_green
                                    txt_sm"
                                    >
                                      {" "}
                                      {val.price ? val.price : 0}{" "}
                                      "BIDEXTOKEN"
                                    </span>{" "}
                                  </div>
                                </>
                              )}
                            </>
                          )}  */}
                          {val.nftStatus === "minted" && (
                            <>
                              <Link
                                to={`/minted/${val.network}/${val.collectionAddress}/${val._id}`}
                              >
                                <p className="txt_sm ">
                                  {val.supply - val.mintedNft <= 0 ? (
                                    <>
                                      <span
                                        className="color_red
                                  txt_sm"
                                        style={{
                                          fontWeight: "bold",
                                          textAlign: "end",
                                        }}
                                      >
                                        NFTs ARE SOLD
                                      </span>
                                    </>
                                  ) : (
                                    <>
                                      <div className="">
                                        <Link
                                          to={`/assets/${val.network}/${val.collectionAddress}/${val.tokenId}`}
                                        >
                                          <button className="btn  btn-green">
                                            Collection
                                          </button>
                                        </Link>
                                        <span style={{ marginLeft: "20px" }}>
                                          Price:{" "}
                                          <span
                                            className=" color_green
                                              txt_sm"
                                          >
                                            {" "}
                                            {parseInt(
                                              JSON.parse(val.lazyMintData)
                                                ?.value.minPrice
                                            ) / Math.pow(10, 18)}{" "}
                                            {val.nftStatus == 'BBNB' ? val.nftStatus : ChainsInfo[val.chainId].CURRENCY_SYMBOL}

                                          </span>
                                        </span>
                                      </div>
                                    </>
                                  )}
                                </p>
                              </Link>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>{" "}
        <div
          style={{
            margin: "50px 0",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pagination
            pageSize={8}
            defaultCurrent={1}
            current={page}
            onChange={(e) => {
              console.log(e);
              setPage(e);
            }}
            total={length}
          />
        </div>
      </>
    </div>
  );
}

export default CardMarketplace;
