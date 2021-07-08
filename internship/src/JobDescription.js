import React from "react";
import "./JobDescription.css";

function JobDescription({ url,jobTitle, companyName, location, experience, salaries, jobTags ,id,jobType,area,organizationType,skillsRequired,skillsDeveloped }) {
  function mapSkillsRequired(skill){
    return <p className="type color31">{skill}</p>
  }
  function mapSkillsDeveloped(skill){
    return <p className="type color41">{skill}</p>
  }
  function mapArea(are){
    return <p className="type color21">{are}</p>
  }
  function mapJobType(jt){
    return <p className="type color1">{jt}</p>
  }
  return (
    <div className="jobDescription">
      <div className="jobDetails-left">
        <div className="headerTitle">
          <img src={url} alt="" />
          <div className="headerTitle-main">
            <h1>{jobTitle}</h1>
            <p>{companyName}</p>
          </div>
        </div>

        <div className="decriptionofJob">
          <p>{jobTags}</p>
        </div>
        <div className="aboutCompany">
          <h2>About company</h2>
          <ul>
            <li>em, to coming up with solutions. If carried out properly, </li>
            <li>em, to coming up with solutions. If carried out properly, </li>
            <li>em, to coming up with solutions. If carried out properly, </li>
            <li>em, to coming up with solutions. If carried out properly, </li>
          </ul>
          <div className="clients">
            <h5>Our Clients:</h5>
            <p>Yahoo</p>
            <p>Asus</p>
            <p>Adobe</p>
          </div>
        </div>
      </div>
      <div className="jobDetails-right">
        <div className="containerRight">
          <h2>Type of Training</h2>
          <div className="containerRight-card">{jobType.map(jt => mapJobType(jt))}</div>

          <hr className="divisor" />
          <h2>Type of organization</h2>
          <div className="containerRight-card">
            <p className="type color1">{organizationType}</p>
          </div>
        </div>
        <div className="containerRight">
          <h2>Areas of Law</h2>
          <div className="containerRight-card">{area.map(are => mapArea(are))}</div>
        </div>
        <div className="containerRight">
          <h2>Skills</h2>
          <div className="containerRight-card">
            {skillsDeveloped.map(skill => mapSkillsDeveloped(skill))}
          </div>

          <hr className="divisor" />
          <h2>Skills that are required to apply</h2>
          <h3>Primary Skills</h3>
          <div className="containerRight-card">
            {skillsRequired.map(skill => mapSkillsRequired(skill))}
          </div>
          <h3>Secondary Skills</h3>
          <div className="containerRight-card">
            {skillsRequired.map(skill => mapSkillsRequired(skill))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDescription;
