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

function EmployeeJobCard({ url, jobTitle, companyName, location, experience, salaries, jobTags ,id,jobType,area,organizationType,skillsRequired,skillsDeveloped ,experiencePrimary,experienceSecondary }) {
  let history=useHistory();
   var flag=false;
   const [user,changeUser]=useState([]);
   const [application,changeApplication]=useState({id:id,areaInterested:[],areaExperience:[]})
   const [defaultInterested,changeDefaultInterested]=useState([]);
   const [defaultExperienced,changeDefaultExperience]=useState([]);
   const [defaultFields,changeDefaultFields]=useState({});
   const [exp,changeExperience]=useState({id:id});
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
       if(res.data.success){
           flag=true;
          if(flag){
          changeUser(res.data.user);
          var appli=res.data.application;
          var copyDefaultFields=null,copyDefaultInterested=[],copyDefaultExperience=[];
          if(appli.length!=0){
            changeDefaultFields(appli[appli.length-1]);
            copyDefaultFields=appli[appli.length-1]
            options.forEach(option=>{
              if(appli[appli.length-1].areaInterested.indexOf(option.label)!==-1)
              {changeDefaultInterested(prev=> [...prev,option]);copyDefaultInterested.push(option)}
              if(appli[appli.length-1].areaExperience.indexOf(option.label)!==-1){
              changeDefaultExperience(prev=> [...prev,option]);
              copyDefaultExperience.push(option);
            }
            })
            changeApplication ({
              ...application,areaExperience: appli[appli.length-1].areaExperience,areaInterested: appli[appli.length-1].areaInterested,firstName: appli[appli.length-1].firstName,lastName: appli[appli.length-1].lastName,description: appli[appli.length-1].description
          });
          }
          mapOptions1(res.data.user.experience);
          mapOptions2(res.data.user.reference);
        }}
          else{
           console.log(res.data);
       }
     })
     .catch(function (error) {
 
        console.log(error);
 
     });
 
 
   },[]);
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  
  const [customStyle,changeCustomStyle]=useState({
    display:"none"
 })
 const [customStyleReference,changeCustomStyleReference]=useState({
  display:"none"
})
  function handleDisplay(){
    if(customStyle.display&&customStyle.display==="none")
    changeCustomStyle({});
    else
    changeCustomStyle({display:"none"});
  }
  function handleDisplayReference(){
    if(customStyleReference.display&&customStyleReference.display==="none")
    changeCustomStyleReference({});
    else
    changeCustomStyleReference({display:"none"});
  }
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
  const handleOnchange2 = (val) => {
    setvalue(val);
    var x=val;
    var y=[];
    x=x.split(",");
    y=(options1.filter(option=> x.indexOf(option.value)!==-1));
    y=y.map((option)=> {return option.id;});
    changeApplication ({
      ...application,experiences: y
  });
  };
  const handleOnchange3 = (val) => {
    setvalue(val);
    var x=val;
    var y=[];
    x=x.split(",");
    y=(options2.filter(option=> x.indexOf(option.value)!==-1));
    y=y.map((option)=> {return option.id;});
    changeApplication ({
      ...application,reference: y
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
  const [options1,changeOptions1]=useState([]);
  function mapOptions1(prevExperiences){
    prevExperiences.forEach((prev,ct)=>{
      changeOptions1(options1=> [...options1,{label:prev.jobTitle,id:prev._id,value:"option_"+ct}])
    })
  }
  const [options2,changeOptions2]=useState([]);
  function mapOptions2(prevOptions){
    prevOptions.forEach((prev,ct)=>{
      changeOptions2(options2=> [...options2,{label:prev.specialization,id:prev._id,value:"option_"+ct}])
    })
  }
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
            changeOptions1(options1=> [...options1,{label:res.data.experience.jobTitle,id:res.data.experience._id,value:"option_"+options1.length}])
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
  
  async function submitReference(event){
    event.preventDefault();
    let myForm=document.getElementById('myForm');
        var formData=new FormData(myForm);
    const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
      };
  await api.post("../addReference",formData,config)
  .then(function (res) {
      console.log(res.data);
      if(res.data.success){
          flag=true;
         if(flag){
          window.alert("Successfully added a reference");
          changeOptions2(options2=> [...options2,{label:res.data.reference.specialization,id:res.data.reference._id,value:"option_"+options2.length}])
            document.getElementById("myForm").reset();
  
       }
      }
      
      else{
        window.alert("Success false");
      }
    })
    .catch(function (error) {
  
       window.alert(error.message);
  
    });
  
  }
  return (
    <div className="employeeJobCard">
      <div className="jobCardContent">
        <h3>{jobTitle} </h3>
        <h4> {companyName} </h4>
        <div className="organizationDetails">
          <p className="aolpara"> <span>Area of law:</span>  {area.join()}</p>
          <p> <span>Job Type: </span> {jobType.join()}</p>
        </div>
        <div className="employeeJobCard-top">
          <p>
            <LocationOnOutlinedIcon className="location1" /> {location}
          </p>

          {/* <p>
            <WorkOutlineOutlinedIcon className="work1" /> {experience} Years
          </p> */}
          <p>
            <MoneyOutlinedIcon className="money1" /> {salaries} INR Per Annum
          </p>
        </div>
        {/* <div className="descriptionContent1">
          <p>{jobTags}</p>
        </div> */}
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
                <input type="text" placeholder="First Name" name="firstName" onChange={handleInput} defaultValue={defaultFields?defaultFields.firstName:""} />
                <input type="text" placeholder="Last Name" name="lastName" onChange={handleInput} defaultValue={defaultFields?defaultFields.lastName:""}/>
              </div>
              <label>Describe yourself</label>
              <textarea type="text" placeholder="Summary" name="description" onChange={handleInput} defaultValue={defaultFields?defaultFields.description:""}/>
              <div className="addskill">
                <p>Select the areas of law you have previous experience:</p>
                <MultiSelect onChange={handleOnchange} options={options} name="areaExperience" defaultValue={defaultExperienced}/>
              </div>
              <div className="addskill">
                <p>Select the areas of law you are interested in:</p>
                <MultiSelect onChange={handleOnchange1} options={options} name="areaInterested" defaultValue={defaultInterested}/>
              </div>
              <div className="addskill">
                <p>Select reference : OR <span style={{color:"blue",cursor:"pointer"}} onClick={handleDisplayReference}> Add new Reference </span></p>
                <MultiSelect onChange={handleOnchange3} options={options2} name="reference"/>
              </div>
              <div className="reference" style={customStyleReference}>
        <h3>Reference section</h3>
        <div className="experienceSheet">
          <p className="sheetTitle">Specialization Name</p>
          <div className="sheetDetails">
            <p>University/Employer name</p>
            <p>Topic Name</p>
            <p>Duration</p>
          </div>
          <div className="sheetDescp">
            <h4>Reference</h4>
            <img
              src="https://www.smartsheet.com/sites/default/files/IC-Employee-Referral-Form-Template.png"
              alt=""
            />
          </div>
        </div>
        <div className="referenceForm">
        <form className="formModal" id="myForm">
          <label for="university"> Add University/Employer </label>
          <input
            name="name"
            type="text"
            class="form-control"
            id="experience"
            placeholder="university/Employer name"
          />
          <label for="specialization"> Add Specialization </label>
          <input
            name="specialization"
            type="text"
            class="form-control"
            id="specialization"
            placeholder="Specialization name"
          />
          <label for="reference"> Add Reference </label>
          <input
            name="reference"
            type="file"
            class="form-control"
            id="reference"
            placeholder="Reference name"
          />
          <label for="duration"> Add Duration </label>
          <input
            name="duration"
            type="text"
            class="form-control"
            id="duration"
            placeholder="Duration"
          />
          <button onClick={submitReference}>Add Referal</button>
          </form>
        </div>
      </div>
              <div className="addskill">
                <p>Select previous experience :</p>
                <MultiSelect onChange={handleOnchange2} options={options1} name="experience"/>
              </div>
              
              <button className="newExpr" onClick={handleDisplay}>Add new Experience</button>
              <div className="addExperience"  style={customStyle}>
                <h2>Add Experience</h2>
                <div className="experienceSheet">
                  <p className="sheetTitle">Job Title</p>
                  <div className="sheetDetails">
                    <p>Company Name</p>
                    <p>Location</p>
                    <p>Duration</p>
                  </div>
                  
                  <div className="sheetDescp" >
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
                <div className="singleExp" >
                  <label for="jobtitle">Job Title</label>
                  <input type="text" name="jobTitle" id="jobTitle" placeholder="Job Title" onChange={getExperience}/>
                  <label for="comapanyname">Company name</label>
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
              <hr/>
              <button className="addexpe" onClick={handleSubmit}>Apply</button>
              
            </div>
            
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default EmployeeJobCard;
