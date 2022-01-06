import React from "react";
import "../styles/components/loading.scss";

const Loading = () => (
  <div className="loader">
    <div className="spinner">
      <div className="circle">
        <div className="inner"></div>
      </div>
      <div className="circle">
        <div className="inner"></div>
      </div>
      <div className="circle">
        <div className="inner"></div>
      </div>
      <div className="circle">
        <div className="inner"></div>
      </div>
      <div className="circle">
        <div className="inner"></div>
      </div>
    </div>
    <h1>
      GRE<span>COM</span>
    </h1>
  </div>
);

export default Loading;
