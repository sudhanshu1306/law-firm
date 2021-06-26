import React, { useState } from "react";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import "./AppliedJob.css";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import MoneyOutlinedIcon from "@material-ui/icons/MoneyOutlined";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import Fade from "@material-ui/core/Fade";
import JobDescription from "./JobDescription";
import CandidateDescription from "./CandidateDescription";

function AppliedJob({ jobTitle, companyName, location, experience, salaries, jobTags }) {
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleOpen1 = () => {
    setOpen1(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const [value, setvalue] = useState("");

  const handleOnchange = val => {
    setvalue(val);
  };
  const handleOnchange1 = val => {
    setvalue(val);
  };

  const options = [
    { label: "Business and commercial affairs", value: "option_1" },
    { label: "Dispute resolution / Civil litigation", value: "option_2" },
    { label: "Commercial property", value: "option_3" },
    { label: "Employment law", value: "option_4" },
    { label: "Probate, wills and trusts", value: "option_5" },
    { label: "Residential conveyancing", value: "option_6" },
    { label: "Criminal Law", value: "option_7" },
    { label: "Family Law", value: "option_8" },
    { label: "Personal injury / Accident / Medical negligence", value: "option_9" },
    { label: "Pensions / Insurance / Tax / financial ", value: "option_10" },
    { label: "Regulation / Compliance / Governance", value: "option_11" },
    { label: "Consumer Rights", value: "option_12" },
    { label: "Immigration", value: "option_13" },
    { label: "Welfare benefits and social security rights", value: "option_14" },
    { label: "Intellectual property", value: "option_15" },
    { label: "Public law ", value: "option_16" },
    { label: "Human rights and equality legislation", value: "option_17" },
    { label: "International Law", value: "option_18" },
    { label: "Environmental Law", value: "option_19" },
    { label: "Charity Law", value: "option_20" },
  ];
  return (
    <div className="appliedJob">
      <div className="jobCardContent">
        <h3>{jobTitle} </h3>

        <h4> {companyName} </h4>
        <div className="organizationDetails">
          <p>Area of law: Welfare benefits and social security rights</p>
          <p>Organization Type: Small or medium size law firm</p>
        </div>

        <div className="employeeJobCard-top">
          <p>
            <LocationOnOutlinedIcon className="location1" /> {location}
          </p>

          <p>
            <WorkOutlineOutlinedIcon className="work1" /> {experience} Years
          </p>
          <p>
            <MoneyOutlinedIcon className="money1" /> {salaries} INR Per Annum
          </p>
        </div>
        <div className="descriptionContent1">
          <p>{jobTags}</p>
        </div>
      </div>

      <div className="employeeJobCard-bottom">
        <button onClick={handleOpen}>Details</button>
        <button onClick={handleOpen1} className="viewApp">
          View Application
        </button>
      </div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="modal"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="jobDetailsPage">
            <CloseIcon onClick={handleClose} className="close1" />
            <JobDescription />
          </div>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="modal"
        open={open1}
        onClose={handleClose1}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open1}>
          <div className="jobDetailsPage">
            <CloseIcon onClick={handleClose1} className="close1" />
            <CandidateDescription />
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default AppliedJob;
