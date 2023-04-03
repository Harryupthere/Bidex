import React, { useEffect } from "react";
import Preview from "../views/Preview";

// All HOME PAGE ROUTES

import HomePage from "../views/homes/HomePage";

//  Account inner pages
import EditProfile from "../views/pages/account/EditProfile";
import Login from "../views/pages/account/Login";
import Profile from "../views/pages/account/Profile";
import Register from "../views/pages/account/Register";

//  Blog inner pages
import Blog from "../views/pages/blog/Blog";
import Article from "../views/pages/blog/Article";

//  item inner pages

import ItemDetails from "../views/pages/item/ItemDetails";
import NftUpload from "../views/pages/item/NftUpload";

// NftPages
import LiveAuctions from "../views/pages/NftPages/LiveAuctions";
import Marketplace from "../views/pages/NftPages/Marketplace";
import Ranking from "../views/pages/NftPages/Ranking";
import UpcomingProjects from "../views/pages/NftPages/UpcomingProjects";

// other pages
import Activity from "../views/pages/others/Activity";
import Newsletter from "../views/pages/others/Newsletter";
import NoResults from "../views/pages/others/NoResults";
import PrivacyPolicy from "../views/pages/others/PrivacyPolicy";
import NotFound from "../views/NotFound";
import Chat from "../views/pages/Support/Chat";
import SubmitRequest from "../views/pages/Support/SubmitRequest";
import Faq from "../views/pages/Support/Faq";
import Forum from "../views/pages/forum/Forum";
import PostDetails from "../views/pages/forum/PostDetails";
import Contact from "../views/pages/Support/Contact";

// Route Specific
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import HowItWorks from "../views/pages/HowItWorks/HowItWorks";
import useAuth from "../hooks/useAuth";
import { injected } from "../utils/connectors";
import Terms from "../views/pages/others/Terms";
import OwnerProfile from "../views/pages/account/OwnerProfile";
import AuctionPage from "../views/homes/AuctionPage";
import AuctionItemDetails from "../views/pages/item/AuctionItemDetails";
import MintedItem from "../views/pages/item/MintedItems";
const Routes = () => {
  const { login } = useAuth();
  // useEffect(() => {
  //   if (
  //     localStorage.getItem("walletConnect") != null &&
  //     JSON.parse(localStorage.getItem("walletConnect")).isConnect === true
  //   ) {
  //     let data = JSON.parse(localStorage.getItem("walletConnect"));
  //     console.log("walletConnect", data.isConnect);
  //     login(injected);
  //   }
  // }, []);
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/login" component={Login} />
          <Route path="/profile" component={Profile} />
          <Route path="/owner/:address" component={OwnerProfile} />
          <Route path="/edit-profile" component={EditProfile} />
          <Route path="/register" component={Register} />
          <Route path="/how-it-works" component={HowItWorks} />
          <Route path="/blog" component={Blog} />
          <Route path="/article" component={Article} />
          <Route
            path="/assets/:network/:address/:tokenid"
            component={ItemDetails}
          />
          <Route
            path="/auction/:network/:address/:tokenid"
            component={AuctionItemDetails}
          />
          <Route path="/minted/:network/:address/:id" component={MintedItem} />
          <Route path="/auction" component={AuctionPage} />
          <Route path="/upload" component={NftUpload} />
          <Route path="/live-auctions" component={LiveAuctions} />
          <Route path="/marketplace" component={Marketplace} />
          <Route path="/ranking" component={Ranking} />
          <Route path="/upcoming-projects" component={UpcomingProjects} />
          <Route path="/activity" component={Activity} />
          <Route path="/newsletter" component={Newsletter} />
          <Route path="/chat" component={Chat} />
          <Route path="/submit-request" component={SubmitRequest} />
          <Route path="/no-results" component={NoResults} />
          <Route path="/faq" component={Faq} />
          <Route path="/privacy" component={PrivacyPolicy} />
          <Route path="/terms" component={Terms} />
          <Route path="/forum" component={Forum} />
          <Route path="/post-details" component={PostDetails} />
          <Route path="/contact" component={Contact} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </>
  );
};

export default Routes;
