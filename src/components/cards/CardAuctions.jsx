import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FilterNfts, GetAllAuction } from "../../graphql/queries/nftQueries";
import { truncateAddress } from "../../utils/utility";

const CardAuctions = ({ categories }) => {
  const [length, setLength] = useState(0);
  const [page, setPage] = useState(1);
  const { data } = useQuery(GetAllAuction);

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
    setLength(data?.auctionFilterNft?.length);
  }, [data?.nfts?.length]);

  return (
    <>
      {length === 0 && (
        <div className="">
          <h1>No Auction NFT Available</h1>{" "}
        </div>
      )}
      <div className="row">
        {filterNftData?.filterNfts?.map((val, i) => (
          <>
            {val.isAuction && val.isApproved && (
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-6" key={i}>
                <div className="card__item four">
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
                        to={`/auction/${val.network}/${val.collectionAddress}/${val.tokenId}`}
                      >
                        <img src={val?.imageUrl} alt="nftimage" />
                      </Link>
                    </div>
                    {/* =============== */}
                    <h6 className="card_title">
                      <h6 className="card_title">{val.name}</h6>
                    </h6>
                    <div className="card_footer d-block space-y-10">
                      <div className="card_footer justify-content-between">
                        <div style={{ flex: 1 }}>
                          <div to="#">
                            {val.nftStatus === "notlisted" && (
                              <p className="txt_sm">
                                <span
                                  className="color_red
                                                txt_sm"
                                  style={{ fontWeight: "bold" }}
                                >
                                  NOT LISTED
                                </span>
                              </p>
                            )}
                            {(val.nftStatus === "polygon_sold" ||
                              val.nftStatus === "ethereum_sold" ||
                              val.nftStatus === "binance_sold") && (
                              <p className="txt_sm">
                                <span
                                  className="color_red
                                              txt_sm"
                                  style={{ fontWeight: "bold" }}
                                >
                                  SOLD
                                </span>
                              </p>
                            )}{" "}
                            {(val.nftStatus === "polygon" ||
                              val.nftStatus === "ethereum" ||
                              val.nftStatus === "binance") && (
                              <p className="txt_sm">
                                {val.lazyMint === "1" ? (
                                  <>
                                    <div
                                      className="d-flex"
                                      style={{
                                        alignItems: "center",
                                        gap: "60px",
                                      }}
                                    >
                                      <div className="">
                                        <Link
                                          to={`/auction/${val.network}/${val.collectionAddress}/${val.tokenId}`}
                                        >
                                          <button className="btn  btn-green">
                                            Place Bid
                                          </button>
                                        </Link>
                                      </div>
                                      {/* <div>
                                      Price:{" "}
                                      <span
                                        className="color_green
                                              txt_sm"
                                      >
                                        {" "}
                                        {parseInt(
                                          JSON.parse(val.lazyMintData).value
                                            .minPrice
                                        ) / Math.pow(10, 18)}
                                        {
                                          ChainsInfo[val.chainId]
                                            .CURRENCY_SYMBOL
                                        }
                                      </span>
                                    </div> */}
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="" style={{ flex: 1 }}>
                                      <div className="">
                                        <Link
                                          to={`/auction/${val.network}/${val.collectionAddress}/${val.tokenId}`}
                                        >
                                          <button className="btn w-full   btn-green">
                                            Place Bid
                                          </button>
                                        </Link>
                                      </div>
                                      {/* <div>
                                      Price:{" "}
                                      <span
                                        className="color_green
                                    txt_sm"
                                      >
                                        {" "}
                                        {val.price ? val.price : 0}{" "}
                                        {
                                          ChainsInfo[val.chainId]
                                            .CURRENCY_SYMBOL
                                        }
                                      </span>{" "}
                                    </div> */}
                                    </div>
                                  </>
                                )}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ))}
      </div>
    </>
  );
};

export default CardAuctions;
