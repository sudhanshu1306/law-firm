import React from "react";
import "./CandidateDescription.css";

function CandidateDescription({name,title,image,url,user,application,jobId,id}) {
  function areaExperience(exp){
    return <p className="type color21">{exp}</p>
  }
  function areaInterested(intr){
    return <p className="type color31">Corporate Firm</p>
  }
  function mapReferences(refe){
    return <>
    <li>
    {refe.name}: <a href={url+refe.document} target="_blank" style={{textDecoration:"none"}}> <button >  View </button> </a>
  </li>
  </>
  }
  function mapExperience(exp){
    return <> <div className="experienceDetails">
    <h2>{exp.jobTitle}</h2>
    <div className="moreDetails">
      <p>{exp.companyName}</p>
      <p>{exp.location}</p>
      <p>{exp.duration}</p>
    </div>
    <p className="expSummary">
      {exp.description}
    </p>
    <ul>
      <li>List acomlishments, skills</li>
      <li>Concentrate on really selling yourself</li>
    </ul>
  </div>  </>
  }
  return (
    <div className="candidateDescription">
      <div className="candidateDescription-left">
        <div className="headerTitle">
          <div className="headerTitle-main">
            <h1>{name}</h1>
            <p>{application.user.info}</p>
          </div>
        </div>
        <hr className="divisor" />
        <h2>Summary</h2>
        <div className="decriptionofJob">
          <p>
            {application.description}
          </p>
        </div>
        <hr className="divisor" />
        <h2>Experience</h2>
        <div className="myexperience">
          {(application.experiences.length==0&& <h2>No prior experience</h2>)}
          {(application.experiences.length>0&&application.experiences.map(exp=> mapExperience(exp)) )}
          {/* {(application.user.experience.length>1&& <> <div className="experienceDetails">
            <h2>{application.user.experience[application.user.experience.length-1].jobTitle}</h2>
            <div className="moreDetails">
              <p>{application.user.experience[application.user.experience.length-1].companyName}</p>
              <p>{application.user.experience[application.user.experience.length-1].location}</p>
              <p>{application.user.experience[application.user.experience.length-1].duration}</p>
            </div>
            <p className="expSummary">
              {application.user.experience[application.user.experience.length-1].description}
            </p>
            <ul>
              <li>List acomlishments, skills</li>
              <li>Concentrate on really selling yourself</li>
            </ul>
          </div>  
          <div className="experienceDetails">
            <h2>{application.user.experience[application.user.experience.length-2].jobTitle}</h2>
            <div className="moreDetails">
              <p>{application.user.experience[application.user.experience.length-2].companyName}</p>
              <p>{application.user.experience[application.user.experience.length-2].location}</p>
              <p>{application.user.experience[application.user.experience.length-2].duration}</p>
            </div>
            <p className="expSummary">
              {application.user.experience[application.user.experience.length-2].description}
            </p>
            <ul>
              <li>List acomlishments, skills</li>
              <li>Concentrate on really selling yourself</li>
            </ul>
          </div>
          </>)} */}
        </div>
        <div className="candidateReferal">
          <h3>Referrals</h3>
          <ul>
            {application.references.map(refe=>mapReferences(refe))}
            {/* <li>
              Company 2: <button>View</button>
            </li>
            <li>
              Company 3: <button>View</button>
            </li>
            <li>
              Company 4: <button>View</button>
            </li> */}
          </ul>
        </div>
      </div>
      <div className="candidateDescription-right">
        <h2>OPEN TO</h2>
        <div className="containerRight">
          <h2>Type of Training</h2>
          <div className="containerRight-card">
            <p className="type color1">Part-Time</p>
            <p className="type color1">Remote</p>
          </div>

          <hr className="divisor" />
          <h2>Type of organization</h2>
          <div className="containerRight-card">
            <p className="type color1">Corporate Firm</p>
          </div>
        </div>
        <h2>AREAS OF LAW</h2>
        <div className="containerRight">
          <h2>Have Experience</h2>
          <div className="containerRight-card">
           {application.areaExperience.map(exp=> areaExperience(exp))}
            
            
          </div>
          <hr className="divisor" />
          <h2>Interested in</h2>
          <div className="containerRight-card">
            {application.areaInterested.map(intr=> areaInterested(intr))}
          </div>
        </div>
        <h2>SKILLS</h2>
        <div className="containerRight">
          <h2>Have experience</h2>
          <div className="containerRight-card">
            <p className="type color21">Team Working</p>
            <p className="type color21">Attending meetings</p>
            <p className="type color21">Interviewing</p>
          </div>

          <hr className="divisor" />
          <h2>Interested in</h2>
          <div className="containerRight-card">
            <p className="type color31">Legal research</p>
            <p className="type color31">Factual research</p>
            <p className="type color31">Interviewing</p>
            <p className="type color31">Team working</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CandidateDescription;
