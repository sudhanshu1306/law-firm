import React from "react";

import "./Body.css";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import Lottie from "react-lottie";
import animationData from "./lotties/Work from home.json";

function Body() {
  AOS.init();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="body">
      <div className="bodyTop">
        <div className="bodyExtremeLeft"></div>
        <div className="bodyTop-Left"></div>
        <div className="bodyTop-Right">
          <div className="bodyTop-righttop">
            <h2 className="qwename">
              <span>Q</span>ualified
            </h2>
            <div className="rightBar"></div>
          </div>

          <h2 className="qwename">
            <span>w</span>ork
          </h2>
          <h2 className="qwename">
            <span>E</span>xperience
          </h2>
          <p>Your career in law starts here</p>
          <button>Join</button>
        </div>
      </div>
      <div className="bodyMiddle">
        <h2>Where can i get a work experience?</h2>
        <p>Explore jobs and courses on LawQWE</p>
        <button>Find a job</button>
      </div>
      <div className="bodyMiddle2">
        <div className="section">
          <div className="section1-image"></div>
          <p>Undergraduate degree</p>
        </div>
        <div className="section">
          <div className="section2-image"></div>
          <p>Qualifying Work Experience</p>
        </div>
        <div className="section">
          <div className="section3-image"></div>
          <p>Achieve your goals</p>
        </div>
      </div>
      <div className="bodyBottom">
        
      </div>
    </div>
  );
}

export default Body;
