import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/footer/Footer";
import Header from "../components/header/Header";
import useDocumentTitle from "../components/useDocumentTitle";

const NotFound = () => {
  useDocumentTitle(" Page Not Found ");
  return (
    <div>
      <Header />
      <div className="not__found">
        <div className="container">
          <div className="row justify-content-center align-items-center pt-100">
            <div className="col-lg-6">
              <div className="space-y-30 content">
                <div
                  className="space-y-20 d-flex flex-column
                        justify-content-center align-items-center"
                >
                  <img
                    className="img"
                    src={process.env.PUBLIC_URL + "/assets/svg/404.svg"}
                    alt="404"
                    width={300}
                  />
                  <h2 className="text-center">whooops 🥺!Page not Found</h2>
                  <p className="text-center">
                    Maybe bigfoot has broken this page. Come back to the
                    Homepage
                  </p>
                  <div>
                    <Link to="/" className="btn btn-grad">
                      Go Back
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
