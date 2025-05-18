import React from "react";
import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center align-items-center spinner-wrapper">
      <div className="loader"></div>
    </div>
  );
};

export default Spinner;
