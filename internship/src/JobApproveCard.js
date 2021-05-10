import React from "react";
import "./JobApproveCard.css";

function JobApproveCard({ title, companyname, years, venue, salary }) {
  return (
    <div className="jobApproveCard">
      <h2 className="jobTitle"> {title}</h2>
      <h4 className="companyName">
        Company: <span> {companyname} </span>
      </h4>
      <p>
        Experience: <span>{years} </span>years
      </p>
      <p>
        Salary: Rs <span>{salary}</span>
      </p>
      <p>
        Venue: <span>{venue} </span>
      </p>
      <div className="buttonGroup1">
        <button>Reject</button>
        <button>Approve</button>
      </div>
    </div>
  );
}

export default JobApproveCard;
