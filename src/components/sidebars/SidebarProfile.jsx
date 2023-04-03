import React from "react";

const SidebarProfile = ({ userInfo }) => {
  console.log(userInfo);
  return (
    <div className="profile__sidebar">
      <div className="space-y-40">
        <div className="space-y-10">
          <h5>About me</h5>
          <div className="box space-y-20">
            <p>{userInfo?.user?.user?.about_details}</p>
            {/* s */}
          </div>
        </div>
        <div className="space-y-10">
          <h5>Follow me</h5>
          <div className="box">
            <ul className="social_profile space-y-10 overflow-hidden">
              {userInfo?.user?.user?.facebookUrl &&
                userInfo?.user?.user?.facebookUrl.trim() !== "" && (
                  <li>
                    <a
                      href={userInfo?.user?.user?.facebookUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <i className="ri-facebook-line" />
                      <span className="color_text">facebook</span>
                    </a>
                  </li>
                )}
              {userInfo?.user?.user?.twitterUrl &&
                userInfo?.user?.user?.twitterUrl.trim() !== "" && (
                  <li>
                    <a
                      href={userInfo?.user?.user?.twitterUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <i className="ri-twitter-line" />
                      <span className="color_text"> Twitter</span>
                    </a>
                  </li>
                )}{" "}
              {userInfo?.user?.user?.instagramUrl &&
                userInfo?.user?.user?.instagramUrl.trim() !== "" && (
                  <li>
                    <a
                      href={userInfo?.user?.user?.instagramUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <i className="ri-instagram-line" />
                      <span className="color_text"> Instagram</span>
                    </a>
                  </li>
                )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SidebarProfile;
