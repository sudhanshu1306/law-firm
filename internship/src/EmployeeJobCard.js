import React,{useState,useEffect} from "react";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "react-multiple-select-dropdown-lite/dist/index.css";
import "./EmployeeJobCard.css";
import { Link,useHistory } from "react-router-dom";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import MoneyOutlinedIcon from "@material-ui/icons/MoneyOutlined";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import Fade from "@material-ui/core/Fade";
import axios from "axios";
import JobDescription from "./JobDescription"


const api=axios.create({
    withCredentials: true,
    baseURL:process.env.REACT_APP_ROUTE+'/applyJobs'
  });

function EmployeeJobCard({ url, jobTitle, companyName, location, experience, salaries, jobTags ,id,jobType,area,organizationType,skillsRequired,skillsDeveloped }) {
  let history=useHistory();
   var flag=false;
   const [user,changeUser]=useState([]);
   const [application,changeApplication]=useState({id:id,areaInterested:[],areaExperience:[]})
   const [exp,changeExperience]=useState({});
   function handleInput (event) {
    changeApplication ({
        ...application,[event.target.name]: event.target.value
    });
}
  function getExperience(event){
    changeExperience({
      ...exp,[event.target.name]:event.target.value
    });
  }
   useEffect(()=>{ api.post("../viewProfile",{})
   .then(function (res) {
       console.log(res.data);
       if(res.data.success){
           flag=true;
          if(flag){
          changeUser(res.data.user);
        }
          else{
           window.alert("Please login");
          history.push('/login');}
       }
     })
     .catch(function (error) {
 
        window.alert("Please login");
        history.push('/login');
 
     });
 
 
   },[]);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
    const [value, setvalue] = useState("");

  const handleOnchange = (val) => {
    setvalue(val);
    var x=val;
    var y=[];
    x=x.split(",");
    y=(options.filter(option=> x.indexOf(option.value)!==-1));
    y=y.map((option)=> {return option.label;});
    changeApplication ({
      ...application,areaExperience: y
  });
  };
  const handleOnchange1 = (val) => {
    setvalue(val);
    var x=val;
    var y=[];
    x=x.split(",");
    y=(options.filter(option=> x.indexOf(option.value)!==-1));
    y=y.map((option)=> {return option.label;});
    changeApplication ({
      ...application,areaInterested: y
  });
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
  async function handleSubmit(event) {
    event.preventDefault();
    console.log(application)
    await api.post("/",application)
    .then(function (res) {
        console.log(res.data);
        if(res.data.success){
            flag=true;
           if(flag){
            window.alert("You applied for job");
            window.location.reload();
           history.push('/jobs');}
        }
        else{
          window.alert("please fill all the fields");
        }
      })
      .catch(function (error) {
  
         window.alert("No fields can be empty");
  
      });
  
  
  }
  async function handleExperience(event) {
    event.preventDefault();
    console.log(exp)
    await api.post("../addExperience",exp)
    .then(function (res) {
        console.log(res.data);
        if(res.data.success){
            flag=true;
           if(flag){
            window.alert("You added an experience");
            changeExperience({});
            document.getElementById("jobTitle").value="";
            document.getElementById("companyName").value="";
            document.getElementById("description").value="";
            document.getElementById("duration").value="";
            document.getElementById("location").value="";
            }
        }
        else{
          window.alert("please fill all the fields");
        }
      })
      .catch(function (error) {
  
         window.alert("No fields can be empty");
  
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
        <div className="descriptionContent1">
          <p>{jobTags}</p>
        </div>
      </div>

      <div className="employeeJobCard-bottom">
        <button onClick={handleOpen}>Details</button>
        <button onClick={handleOpen1} className="apply">
          Apply
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
          {/* <div className="paperArticle">
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
          </div> */}
          <div className="jobDetailsPage">
            <CloseIcon  onClick={handleClose} className="close1" />
            <JobDescription 
              key={id}
              jobTitle={jobTitle}
              companyName={companyName}
              location={location}
              experience={experience}
              salaries={salaries}
              jobTags={jobTags}
              organizationType={organizationType}
              jobType={jobType}
              area={area}
              url={url}
              skillsDeveloped={skillsDeveloped}
              skillsRequired={skillsRequired}
              id={id}
            />
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
          <div className="paperArticle">
            <div className="paperArticleHeader ">
              <h2>Job Description</h2>

              <CloseIcon onClick={handleClose1} className="close" />
            </div>
            <hr />
            
            <div className="jobCardContent1">
            {/* <form className="formModal" id="myForm"> */}
               {/* <input type="text" name="id" value={id} hidden /> */}
              <label for="Full name">Full Name</label>
              <div className="name">
                <input type="text" placeholder="First Name" name="firstName" onChange={handleInput} />
                <input type="text" placeholder="Last Name" name="lastName" onChange={handleInput} />
              </div>
              <label>Describe yourself</label>
              <textarea type="text" placeholder="Summary" name="description" onChange={handleInput}/>
              <div className="addskill">
                <p>Select the areas of law you have previous experience:</p>
                <MultiSelect onChange={handleOnchange} options={options} name="areaExperience"/>
              </div>
              <div className="addskill">
                <p>Select the areas of law you are interested in:</p>
                <MultiSelect onChange={handleOnchange1} options={options} name="areaInterested"/>
              </div>
              <div className="addExperience">
                <h2>Add Experience</h2>
                <div className="experienceSheet">
                  <p className="sheetTitle">Job Title</p>
                  <div className="sheetDetails">
                    <p>Company Name</p>
                    <p>Location</p>
                    <p>Duration</p>
                  </div>
                  <div className="sheetDescp">
                    <h4>Job Description</h4>
                    <p>
                      {" "}
                      Some of these ideas will go on to be potential solutions to your design
                      challenge; some will end up on the reject pile. At this stage, the focus is on
                      quantity of ideas rather than quality. The main aim of an ideation session is
                      to uncover and explore new angles and avenues—to think outside the box. For
                      the sake of innovation and creativity, it is essential that the ideation phase
                      be a “judgement-free zone”.
                    </p>
                  </div>
                </div>

                <div className="singleExp">
                  <label for="jobtitle">Job Title</label>
                  <input type="text" name="jobTitle" id="jobTitle" placeholder="Job Title" onChange={getExperience}/>
                  <label for="comapanyname">Comapany name</label>
                  <input
                    type="text"
                    name="companyName"
                    id="companyName"
                    placeholder="Comapany name"
                    onChange={getExperience}
                  />

                  <label for="location">Location</label>
                  <input type="text" name="location" id="location" placeholder="Location" onChange={getExperience} />
                  <label for="timeperiod">Duration</label>
                  <input type="text" name="duration" id="duration" placeholder="Duration" onChange={getExperience} />
                  <label for="Job_description">Job description</label>
                  <textarea
                    placeholder="type your job description here"
                    name="description"
                    id="description"
                    cols="30"
                    rows="5"
                    onChange={getExperience}
                  />
                </div>
                <button className="addexpe" onClick={handleExperience}> Add Experience</button>
              </div>
              <ul>
                <p>Follow the following Competences:</p>
                <li>
                  Act honestly and with integrity, in accordance with legal and regulatory
                  requirements and the SRA Standards and Regulations
                </li>
                <li>
                  Maintain the level of competence and legal knowledge needed to practise
                  effectively, taking into account changes in their role and/or practice context and
                  developments in the law
                </li>
                <li>
                  Work within the limits of their competence and the supervision which they need
                </li>
                <li>
                  Draw on a sufficient detailed knowledge and understanding of their field(s) of
                  work and role in order to practise effectively
                </li>
                <li>Apply understanding, critical thinking and analysis to solve problems</li>
              </ul>

              <label for="ans1">Have I had experience?</label>
              <textarea
                placeholder="type your answer here"
                name="que1"
                id="ans1"
                cols="30"
                rows="1"
                onChange={handleInput}
              />
              <label for="ans2">What was it/what did I do?</label>
              <textarea
                placeholder="type your answer here"
                name="que2"
                id="ans2"
                cols="30"
                rows="5"
                onChange={handleInput}
              />
              <label for="ans3">How can I evidence my experience?</label>
              <textarea
                placeholder="type your answer here"
                name="que3"
                id="ans3"
                cols="30"
                rows="5"
                onChange={handleInput}
              />
              <label for="ans4">What did I learn?</label>
              <textarea
                placeholder="type your answer here"
                name="que4"
                id="ans4"
                cols="30"
                rows="5"
                onChange={handleInput}
              />
              <label for="ans5">Do I need more experience?</label>
              <textarea
                placeholder="type your answer here"
                name="que5"
                id="ans5"
                cols="30"
                rows="5"
                onChange={handleInput}
              />
              <button className="addexpe" onClick={handleSubmit}>Apply</button>
              {/* </form> */}
            </div>
            
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default EmployeeJobCard;
