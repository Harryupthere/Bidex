import React from "react";
import Lottie from "react-lottie";
import animationData from "./loading.json";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function Loading() {
  return (
    <div>
      {" "}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "center",
        }}
      >
        {" "}
        <Lottie options={defaultOptions} width={150} height={150} />
      </div>
    </div>
  );
}

export default Loading;
