import React from "react";
import "./Lecture.css";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import { ReactVideo } from "reactjs-media";

function Lecture() {
  return (
    <div className="lecture">
      <div className="lectureTop">
        <Breadcrumbs aria-label="breadcrumb">
          <Link className="link3" to="lessons">
            Lessons
          </Link>

          <Typography className="link5">Law 1</Typography>
        </Breadcrumbs>
      </div>
      <div className="lectureBottom">
        <div className="lectureLeft">
          <h1>Video Title</h1>
          <ReactVideo
            className="player"
            src="http://localhost:5000/uploads/1616852917473.mp4"
            poster="https://www.example.com/poster.png"
            primaryColor="red"
            // other props
          />
        </div>
        <div className="lectureRight">
          <h3>Video Description</h3>
          <div className="descImg"></div>
          <p>
          This is a sample law course video.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Lecture;
