import React from "react";
import { Link,useHistory } from "react-router-dom";
import "./CourseApproveCard.css";

function CourseApproveCard({
  title,
  description,
  image,
  company,
  employer,
  number,
  site,
  button,
  button2,
}) {
  var history=useHistory();
  function handleView(){
    history.push("/lecture")
  }
  return (
    <div className="courseApproveCard">
      <div className="cardTop">
        <img src={image} alt="background" />
      </div>
      <div className="cardBottom">
        <div className="introBox">
          <img src={company} alt="companyLogo" />
        </div>
        <div className="cardContent">
          <h2>{title}</h2>
          <p>{description}</p>
          <h5>
            Author:- <span>{employer}</span>
          </h5>
          <h5>
            Registered:- <span>{number} </span> users
          </h5>
          <div className="buttonGroup-bottom">
          <Link className="lessonButton">
            <button>Reject</button>
            </Link>
            <Link className="lessonButton">
            <button onClick={handleView} style={{marginLeft:"5px",marginRight:"5px"}}> View </button>
            </Link>
            <button className="register">Approve</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseApproveCard;
