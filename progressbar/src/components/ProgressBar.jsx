import React, { useEffect, useState } from "react";
//cannot read the properties of undefied(reading tofixed)we have to pass value another alternative is assign default value to param
import "./ProgressBar.css";
import { MAX, MIN } from "../constants/constants";
const ProgressBar = ({ value = 0, onComplete = () => {} }) => {
  const [percent, setPercent] = useState(value);
  useEffect(() => {
    setPercent(Math.min(MAX, Math.max(value, MIN)));
    if (value >= MAX) {
      onComplete();
    }
  }, [value]);
  return (
    <div className="progress">
      <span
        style={{ color: percent > 49 ? "white" : "black" }}
        role="progressbar"
        aria-valuemax={MAX}
        aria-valuemin={MIN}
        aria-valuenow={percent.toFixed()}
      >
        {percent.toFixed()}%
      </span>
      <div
        //   style={{ width: `${percent}%` }}
        style={{
          transform: `scaleX(${percent / MAX})`,
          transformOrigin: "left",
        }}
      />
    </div>
  );
};

export default ProgressBar;
