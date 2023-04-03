import React from "react";

function HeroMarketplace() {
  return (
    <div>
      <div>
        <div
          className="hero_marketplace bg_white"
          style={{
            background: "transprent",
            backgroundImage:
              "url('https://images.unsplash.com/photo-1593265023836-502b46fd1bda?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80')",
          }}
        >
          <div className="container">
            <h1 className="text-center" style={{ color: "white" }}>
              NFT Marketplace
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroMarketplace;
