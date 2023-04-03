import React from "react";
import { Link } from "react-router-dom";

const LeftMenu = [
  {
    icon: "edit",
    title: "Create Profile",
    link: "/edit-profile",
  },

  {
    icon: "upload",
    title: "Create NFT",
    link: "/upload",
  },

  {
    icon: "customer-service-2",
    title: "Contact",
    link: "/contact",
  },
];
const RightMenu = [
  {
    icon: "file-text",
    title: "Privacy Policy",
    link: "/privacy",
  },
  {
    icon: "file-text",
    title: "Auction",
    link: "/live-auctions",
  },
];

function MegaMenu() {
  return (
    <div>
      <div className="row sub_menu_row">
        <div className="col-lg-6 space-y-10">
          {LeftMenu.map((val, i) => (
            <li key={i}>
              <Link to={val.link}>
                <i className={`ri-${val.icon}-line`} />
                {val.title}
              </Link>
            </li>
          ))}
        </div>
        <div className="col-lg-6 space-y-10">
          {RightMenu.map((val, i) => (
            <li key={i}>
              <Link to={val.link}>
                <i className={`ri-${val.icon}-line`} />
                {val.title}
              </Link>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MegaMenu;
