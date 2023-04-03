import React from "react";
import { Link } from "react-router-dom";
const CollectionItems = [
  {
    img1: "9",
    img2: "10",
    img3: "11",
    img4: "12",
    title: "Creative Art collection",
    likes: "2.1",
    stock: "5",
    avatar_img: "2",
    avatar_name: "william_jamy",
  },
  {
    img1: "13",
    img2: "14",
    img3: "15",
    img4: "16",
    title: "Colorful Abstract Painting",
    likes: "3.5",
    stock: "7",
    avatar_img: "3",
    avatar_name: "alexis_fenn",
  },
  {
    img1: "17",
    img2: "18",
    img3: "19",
    img4: "20",
    title: "Modern Art collection",
    likes: "7.2",
    stock: "2",
    avatar_img: "1",
    avatar_name: "Joshua_Bren",
  },
];
const Collection1 = () => {
  return (
    <div>
      <div className="section mt-100">
        <div className="container">
          <div className="section__head">
            <div className="d-flex justify-content-between align-items-center">
              <h2 className="section__title"> Collections</h2>
              <Link to="collections" className="btn btn-dark btn-sm">
                View All
              </Link>
            </div>
          </div>
          <div className="row justify-content-center mb-30_reset">
            {CollectionItems.map((val, i) => (
              <div className="col-lg-4 col-md-6 col-sm-8" key={i}>
                <div className="collections space-y-10 mb-30">
                  <Link to="item-details">
                    <div className="collections_item">
                      <div className="images-box space-y-10">
                        <div className="top_imgs">
                          <img
                            src={`https://i.seadn.io/gcs/files/eb5643356664835ddce7005fbf322c6e.jpg?auto=format&h=400`}
                            alt="prv"
                          />
                          <img
                            src={`https://i.seadn.io/gcs/files/5f02c181f3896eb2cd11441595590142.png?auto=format&h=400`}
                            alt="prv"
                          />
                          <img
                            src={`https://i.seadn.io/gae/FBO6vfVx1DsBER60kO0vL-r7fouTI--iQkFMKLf3E8Vqa5SIksIvFg9_vHGM1iY6IAoKgYrxuwgB8AePWonriD02oi_ri3ZbVRuRi9I?auto=format&h=400`}
                            alt="prv"
                          />
                        </div>
                        <img
                          src={`https://i.seadn.io/gcs/files/cf67d4774b27c1e8106c64a2c95425d2.png?auto=format&h=400`}
                          alt="prv"
                        />
                      </div>
                    </div>
                  </Link>
                  <div className="collections_footer justify-content-between">
                    <h5 className="collection_title">
                      <Link to="profile">{val.title}</Link>
                    </h5>
                    <Link to="#" className="likes space-x-3">
                      <i className="ri-heart-3-fill" />
                      <span className="txt_md">{val.likes}k</span>
                    </Link>
                  </div>
                  <div className="creators space-x-10">
                    <span className="color_text txt_md">
                      {val.stock} items · Created by
                    </span>
                    <div className="avatars space-x-5">
                      <Link to="profile">
                        <img
                          src={`https://i.seadn.io/gcs/files/cf67d4774b27c1e8106c64a2c95425d2.png?auto=format&h=400`}
                          alt="Avatar"
                          className="avatar avatar-sm"
                        />
                      </Link>
                    </div>
                    <Link to="profile">
                      <p className="avatars_name txt_sm">
                        @{val.avatar_name}..
                      </p>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection1;
