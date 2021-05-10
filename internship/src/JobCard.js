import React from "react";
import "./JobCard.css";
import AOS from "aos";
import "aos/dist/aos.css";

function JobCard({ title, companyname, years, venue, salary, button }) {
  AOS.init();
  return (
    <div
      className="jobCard"
      data-aos="fade-down"
      data-aos-delay="50"
      data-aos-duration="2000"
      data-aos-easing="ease-in-out-cubic "
    >
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
      <button> Apply</button>
    </div>
  );
}

export default JobCard;
