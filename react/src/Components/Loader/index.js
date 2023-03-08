import React from "react";
import { Oval } from "react-loader-spinner";
import "./loader.css";

function LoadingState({ Width, Height }) {
  return (
    <Oval
      height={Height}
      width={Width}
      color="#4fa94d"
      wrapperStyle={{}}
      wrapperClass="loader"
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#4fa94d"
      strokeWidth={10}
      strokeWidthSecondary={2}
      s
    />
  );
}

export default LoadingState;
