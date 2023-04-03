import React, { useEffect, useState } from "react";
import CardProfile from "../../../components/cards/CardProfile";
import Footer from "../../../components/footer/Footer";
import Header from "../../../components/header/Header";
import HeroProfile from "../../../components/hero/HeroProfile";
import SidebarProfile from "../../../components/sidebars/SidebarProfile";
import CollectionProfile from "../../../components/collection/CollectionProfile";
import useDocumentTitle from "../../../components/useDocumentTitle";
import { Link } from "react-router-dom";
import { useWeb3React } from "@web3-react/core";
import { useQuery } from "@apollo/client";
import { UserInfo } from "../../../graphql/queries/userQueries";
import CardMarketplace from "../../../components/cards/CardMarketplace";
import UserCardMarketplace from "../../../components/cards/UserCardMarketplace";
import { Button } from "antd";
import useAuth from "../../../hooks/useAuth";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import UserCardAuction from "../../../components/cards/UserCardAuction";
import UserCardNftSupply from "../../../components/cards/UserCardNftSupply";
const Profile = () => {
  const { account, active } = useWeb3React();
  const { login } = useAuth();
  useDocumentTitle("Profile ");

  const { data: userInfo } = useQuery(UserInfo, {
    skip: !active,
    variables: {
      walletAddress: account,
    },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Header />
      {!active ? (
        <>
          <div
            style={{
              maxWidth: "1000px",
              width: "100%",
              margin: "0 auto",
              height: "30vh",
              display: "flex",
              justifyContent: "center",
              paddingTop: "100px",
              gap: "20px",
            }}
          >
            <div>
              <h3>Please connect wallet </h3>
            </div>
            <span>
              {" "}
              <Button
                onClick={login}
                to="item-details"
                className="btn btn-grad
					btn_create"
              >
                Connect Wallet
              </Button>
            </span>
          </div>
        </>
      ) : (
        <>
          <HeroProfile account={account} userInfo={userInfo} />
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-3 col-md-7 order-md-0 order-1">
                <SidebarProfile userInfo={userInfo} />
              </div>
              <div className="col-lg-9 col-md-12 order-md-1 order-0">
                <Tabs>
                  <TabList>
                    <Tab>Minted</Tab>
                    <Tab>Auction</Tab>
                    <Tab>Supply</Tab>
                  </TabList>
                  <div className="profile__content">
                    <div className="d-flex justify-content-between">
                      <TabPanel>
                        <div className="d-flex justify-content-between"></div>
                        <div className="tab-content">
                          <UserCardMarketplace />
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <div className="d-flex justify-content-between"></div>
                        <div className="tab-content">
                          <UserCardAuction />
                        </div>
                      </TabPanel>
                      <TabPanel>
                        <div className="d-flex justify-content-between"></div>
                        <div className="tab-content">
                          <UserCardNftSupply />
                        </div>
                      </TabPanel>
                    </div>
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default Profile;
