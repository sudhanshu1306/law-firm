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
        <div className="bodyTop-Left">
          <Lottie options={defaultOptions} className="anime" />
        </div>
        <div
          className="bodyTop-Right"
          data-aos="zoom-in"
          data-aos-delay="50"
          data-aos-duration="2000"
          data-aos-easing="ease-in-out-cubic "
        >
          <h1>Join the best Platform to hunt for QWE..</h1>
          <p>Enroll to explore for exciting contents.</p>
          <div className="buttonGroup">
            <button className="join2">Explore</button>
            <Link to="login">
              <button className="join1">join</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="bodyBottom">
        <div className="theFlow">
          <div className="stepper">
            <div className="singleStepper">
              <div className="circle"></div>
              <h3
                data-aos="zoom-in"
                data-aos-delay="50"
                data-aos-duration="3000"
                data-aos-easing="ease-in-out-cubic "
              >
                Student
              </h3>
              <div className="verticalConatiner">
                <div className="imageContainer image0"></div>
              </div>
            </div>
            <div className="singleStepper">
              <div className="circle"></div>
              <h3
                data-aos="zoom-in"
                data-aos-delay="50"
                data-aos-duration="2000"
                data-aos-easing="ease-in-out-cubic "
              >
                Training
              </h3>
              <div className="verticalConatiner">
                <div className="verticalConatiner-left">
                  <div className="imageContainer image1"></div>
                </div>
                <div className="verticalLine"></div>
                <div className="verticalConatiner-right">
                  <p
                    data-aos="fade-left"
                    data-aos-delay="100"
                    data-aos-duration="4000"
                    data-aos-easing="ease-in-out-cubic "
                  >
                    We give proper training about the work to be done and what software to be used
                  </p>
                  <button
                    data-aos="zoom-in"
                    data-aos-delay="50"
                    data-aos-duration="2000"
                    data-aos-easing="ease-in-out-cubic "
                  >
                    Explore more
                  </button>
                </div>
              </div>
            </div>
            <div className="singleStepper">
              <div className="circle"></div>
              <h3
                data-aos="zoom-in"
                data-aos-delay="50"
                data-aos-duration="2000"
                data-aos-easing="ease-in-out-cubic "
              >
                Internship QWE
              </h3>
              <div className="verticalConatiner">
                <div className="verticalConatiner-left">
                  <p
                    data-aos="fade-right"
                    data-aos-delay="100"
                    data-aos-duration="4000"
                    data-aos-easing="ease-in-out-cubic "
                  >
                    We give internship to the students who had completed the training and work
                    further
                  </p>
                  <button
                    data-aos="zoom-in"
                    data-aos-delay="50"
                    data-aos-duration="3000"
                    data-aos-easing="ease-in-out-cubic "
                  >
                    Explore more
                  </button>
                </div>
                <div className="verticalLine"></div>
                <div className="verticalConatiner-right">
                  <div className="imageContainer image2"></div>
                </div>
              </div>
            </div>
            <div className="singleStepper">
              <div className="circle"></div>
              <h3
                data-aos="zoom-in"
                data-aos-delay="50"
                data-aos-duration="2000"
                data-aos-easing="ease-in-out-cubic "
              >
                Discussion Forum
              </h3>
              <div className="verticalConatiner">
                <div className="verticalConatiner-left">
                  <div className="imageContainer image3"></div>
                </div>
                <div className="verticalLine"></div>
                <div className="verticalConatiner-right">
                  <p
                    data-aos="fade-left"
                    data-aos-delay="100"
                    data-aos-duration="4000"
                    data-aos-easing="ease-in-out-cubic "
                  >
                    We discuss the work to be done step by step and work as team work and complete
                    the projects.
                  </p>
                  <button
                    data-aos="zoom-in"
                    data-aos-delay="50"
                    data-aos-duration="3000"
                    data-aos-easing="ease-in-out-cubic "
                  >
                    Explore more
                  </button>
                </div>
              </div>
            </div>
            <div className="singleStepper">
              <div className="circle"></div>
              <h3
                data-aos="zoom-in"
                data-aos-delay="50"
                data-aos-duration="2000"
                data-aos-easing="ease-in-out-cubic "
              >
                Q & A Sessions
              </h3>
              <div className="verticalConatiner">
                <div className="verticalConatiner-left">
                  <p
                    data-aos="fade-right"
                    data-aos-delay="100"
                    data-aos-duration="4000"
                    data-aos-easing="ease-in-out-cubic "
                  >
                    There will be some question ask about the job and work experience.
                  </p>
                  <button
                    data-aos="zoom-in"
                    data-aos-delay="50"
                    data-aos-duration="3000"
                    data-aos-easing="ease-in-out-cubic "
                  >
                    Explore more
                  </button>
                </div>
                <div className="verticalLine"></div>
                <div className="verticalConatiner-right">
                  <div className="imageContainer image4"></div>
                </div>
              </div>
            </div>
            <div className="singleStepper">
              <div className="circle"></div>
              <h3
                data-aos="zoom-in"
                data-aos-delay="50"
                data-aos-duration="2000"
                data-aos-easing="ease-in-out-cubic "
              >
                Job
              </h3>
              <div className="verticalConatiner">
                <div className="verticalConatiner-left">
                  <div className="imageContainer image5"></div>
                </div>
                <div className="verticalLine"></div>
                <div className="verticalConatiner-right">
                  <p
                    data-aos="fade-left"
                    data-aos-delay="100"
                    data-aos-duration="4000"
                    data-aos-easing="ease-in-out-cubic "
                  >
                    We give the permanent job after all the steps completed and work as team work.
                  </p>
                  <button
                    data-aos="zoom-in"
                    data-aos-delay="50"
                    data-aos-duration="3000"
                    data-aos-easing="ease-in-out-cubic "
                  >
                    Explore more
                  </button>
                </div>
              </div>
            </div>
            <div className="singleStepper">
              <div className="circle"></div>
              <h3>Solicitor</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
