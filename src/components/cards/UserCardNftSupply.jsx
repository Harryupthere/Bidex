import { useQuery } from "@apollo/client";
import { useWeb3React } from "@web3-react/core";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import { ChainsInfo } from "../../config/config-chains";
import { GetOwnerNFT, GetUserNFT } from "../../graphql/queries/userQueries";
import { truncateAddress } from "../../utils/utility";

function UserCardNftSupply() {
  const ref = useRef();
  const closeTooltip = () => ref.current.close();
  const { account } = useWeb3React();
  const { data, loading, error } = useQuery(GetOwnerNFT, {
    variables: {
      ownerAddress: account,
    },
  });

  console.log(data);

  return (
    <div>
      <div
        className="row mb-30_reset profile-card-grid"
        // style={{ gridTemplateColumns: "repeat(3, 1fr)", display: "grid" }}
      >
        {data?.getNftsOfOwner.map(
          (val, i) =>
            val.nftStatus === "minted" && (
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
                        to={`/minted/${val.network}/${val.collectionAddress}/${val._id}`}
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
                          {val.nftStatus !== "minted" ? (
                            val.ownerAddress === account ? (
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
                            )
                          ) : (
                            <p className="txt_sm">
                              <span
                                className="color_green
                                            txt_sm"
                              >
                                NFT SUPPLY
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
}

export default UserCardNftSupply;
