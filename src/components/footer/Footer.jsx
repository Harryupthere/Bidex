import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <footer className="footer__1">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 space-y-20">
              <div className="footer__logo">
                <Link to="/">
                  {/* <img src={`img/logos/Logo.svg`} alt="logo" id="logo_js_f" /> */}
                </Link>
              </div>
              <p className="footer__text">
                Explore your favourite NFTs & unlock exclusive benefits with
                Bidex NFT.
              </p>
              <div>
                <ul className="footer__social space-x-10 mb-40">
                  <li>
                    <a
                      href="https://www.facebook.com/"
                      rel="noreferrer"
                      target="_blank">
                      <i className="ri-facebook-line" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.messenger.com/"
                      rel="noreferrer"
                      target="_blank">
                      <i className="ri-messenger-line" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://whatsapp.com"
                      target="_blank"
                      rel="noreferrer">
                      <i className="ri-whatsapp-line" />
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noreferrer">
                      <i className="ri-youtube-line" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-2 col-6">
              <h6 className="footer__title">Bidex NFT</h6>
              <ul className="footer__list">
                <li>
                  <Link to="/"> Home </Link>
                </li>
                <li>
                  <Link to="/terms"> Terms and Conditions</Link>
                </li>
                <li>
                  <Link to="/privacy">Privacy and Policy </Link>
                </li>

                <li>
                  <Link to="/marketplace"> Marketplace</Link>
                </li>
              </ul>
            </div>
          </div>
          <p className="copyright text-center">Copyright © 2021 by Bidex NFT</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
