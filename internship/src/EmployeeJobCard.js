import React from "react";
import "./EmployeeJobCard.css";
import { Link,useHistory } from "react-router-dom";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import MoneyOutlinedIcon from "@material-ui/icons/MoneyOutlined";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import Fade from "@material-ui/core/Fade";
import axios from "axios";


const api=axios.create({
    withCredentials: true,
    baseURL:process.env.REACT_APP_ROUTE+'/applyJobs'
  });

function EmployeeJobCard({ jobTitle, companyName, location, experience, salaries, jobTags ,id,jobType,area }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let history=useHistory();
  var flag=false;
  
    var job={
      id:id
    }
  async function handleSubmit(event) {
    event.preventDefault();
  
    console.log(job);
    await api.post("/", job)
    .then(function (res) {
        console.log(res.data);
        if(res.data.success){
            flag=true;
           if(flag){
            window.alert("You applied for job");
           history.push('/jobs');}
           else{
            window.alert("Please login");
           history.push('/login');}
        }
        else{
          window.alert("Please login");
         history.push('/login');
        }
      })
      .catch(function (error) {
  
         window.alert("Please login");
         history.push('/login');
  
      });
  
  
  }
  
  return (
    <div className="employeeJobCard">
      <div className="jobCardContent">
        <h3>{jobTitle} </h3>
        <h4> {companyName} </h4>
        <div className="organizationDetails">
          <p>Area of law: {area}</p>
          <p>Job Type: {jobType}</p>
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
        <div className="descriptionContent">
          <p>{jobTags}</p>
        </div>
      </div>

      <div className="employeeJobCard-bottom">
        <button onClick={handleOpen}>Details</button>
        <button onClick={handleSubmit}>Apply</button>
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
          <div className="paperArticle">
            <div className="paperArticleHeader">
              <h2>Job Description</h2>

              <CloseIcon onClick={handleClose} className="close" />
            </div>
            <hr />
            <div className="jobCardContent1">
              <h3>{jobTitle} </h3>
              <h4> {companyName} </h4>
              <div className="employeeJobCard-top">
                <p>
                  <LocationOnOutlinedIcon /> {location}
                </p>

                <p>
                  <WorkOutlineOutlinedIcon /> {experience} Years
                </p>
                <p>
                  <MoneyOutlinedIcon /> {salaries} INR Per Annum
                </p>
              </div>
              <div className="descriptionContent1">
                <p>{jobTags}</p>
              </div>
            </div>
            <div className="jobRequirement">
              <p>What we are looking for?</p>
              <ul>
                <li>Ability to communicate design decisions to team members.</li>
                <li> Adept to fast-paced working environments</li>
                <li>
                  Strong understanding of typography, color and visual layout to ensure code
                  consistency with the design
                </li>
                <li> Ability to code interactive components and elements</li>
                <li>Solid foundations of web principles and best practices</li>
              </ul>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default EmployeeJobCard;
