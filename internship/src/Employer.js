import React,{useState,useEffect} from "react";
import MultiSelect from "react-multiple-select-dropdown-lite";
import "./Employer.css";
import SelectionCard from "./SelectionCard";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import SearchIcon from "@material-ui/icons/Search";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import Lottie from "react-lottie";
import animationData from "./lotties/Hiring isometric animation.json";
import { Link,useHistory } from "react-router-dom";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import Fade from "@material-ui/core/Fade";
import axios from "axios";


const api=axios.create({
    withCredentials: true,
    baseURL:process.env.REACT_APP_ROUTE+'/jobs',
    validateStatus: () => true
  });

function Employer() {
  const [open, setOpen] = React.useState(false);
  const [original,getOriginal]=useState([]);
  let [jobs,getJobs]=useState([]);
  const [add,changeAdd]=useState({});
  const [login,changeLogin]=useState(false);
  const [searchobj,changeSearch]=useState({});
  const [exp,changeExperience]=useState();
  function getExperience(event){
    changeExperience({
      ...exp,[event.target.name]:event.target.value
    });
  }
  const [customStyle,changeCustomStyle]=useState({
    display:"none"
 })
 function handleDisplay(){
  if(customStyle.display&&customStyle.display==="none")
  changeCustomStyle({});
  else
  changeCustomStyle({display:"none"});
}
const handleOnchange2 = (val) => {
  setvalue(val);
  var x=val;
  var y=[];
  x=x.split(",");
  y=(options1.filter(option=> x.indexOf(option.value)!==-1));
  y=y.map((option)=> {return option.id;});
  changeAdd ({
    ...add,experiencePrimary: y
});
};
const handleOnchange3 = (val) => {
  setvalue(val);
  var x=val;
  var y=[];
  x=x.split(",");
  y=(options1.filter(option=> x.indexOf(option.value)!==-1));
  y=y.map((option)=> {return option.id;});
  changeAdd ({
    ...add,experienceSecondary: y
});
};
  function handleChange (event) {
    changeAdd ({
        ...add,[event.target.name]: event.target.value
    });
  }
  function handleSearch (event) {
    changeSearch({
        ...searchobj,[event.target.name]: event.target.value
    });
  }
  const [value, setvalue] = useState("");

  const handleOnchange = val => {
    setvalue(val);
    var x=val;
    var y=[];
    x=x.split(",");
    y=(options.filter(option=> x.indexOf(option.value)!==-1));
    y=y.map((option)=> {return option.label;});
    changeAdd ({
      ...add,skillsDeveloped: y
  });
  };
  const handleOnchange1 = val => {
    setvalue(val);
    var x=val;
    var y=[];
    x=x.split(",");
    y=(options.filter(option=> x.indexOf(option.value)!==-1));
    y=y.map((option)=> {return option.label;});
    changeAdd ({
      ...add,skillsRequired: y
  });
  };
  const handleOnchange4 = val => {
    setvalue(val);
    var x=val;
    var y=[];
    x=x.split(",");
    y=(options2.filter(option=> x.indexOf(option.value)!==-1));
    y=y.map((option)=> {return option.label;});
    changeAdd ({
      ...add,jobType: y
  });
  };
  const handleOnchange5 = val => {
    setvalue(val);
    var x=val;
    var y=[];
    x=x.split(",");
    y=(options3.filter(option=> x.indexOf(option.value)!==-1));
    y=y.map((option)=> {return option.label;});
    changeAdd ({
      ...add,area: y
  });
  };

  const options = [
    { label: "Legal research skills", value: "option_1" },
    { label: "Factual research skills", value: "option_2" },
    { label: "Advising on options, strategies and solutions", value: "option_3" },
    { label: "Help drafting legally accurate and effective documents", value: "option_4" },
    { label: "Spoken and written advocacy", value: "option_5" },
    { label: "Attending client meetings", value: "option_6" },
    { label: "Negotiating solutions to client’s issues", value: "option_7" },
    { label: "Planning, managing and progressing legal matters and transactions", value: "option_8" },
    { label: "Interviewing skills", value: "option_9" },
    { label: "Attending interviews", value: "option_10" },
    { label: "Preparing for and attending court proceedings", value: "option_11" },
    { label: "Proofreading legal documents", value: "option_12" },
    { label: "Initiating and planning work activities and projects", value: "option_13" },
    { label: "Prioritising and managing work activities and projects", value: "option_14" },
    { label: "Keeping, using and maintaining accurate, complete and clear records", value: "option_15" },
    { label: "Applying good business practices ", value: "option_16" },
    { label: "Organisational/multi-tasking skills", value: "option_17" },
    { label: "Communication Sills: Communicating clearly and effectively, orally and in writing", value: "option_18" },
    { label: "Establishing and maintaining effective and professional relations with clients", value: "option_19" },
    { label: "Establishing and maintaining effective and professional relations with others", value: "option_20" },
    { label: "Team working skills", value: "option_21" }
  ];
  const [options1,changeOptions1]=useState([]);
  function mapOptions1(prevExperiences){
    prevExperiences.forEach((prev,ct)=>{
      changeOptions1(options1=> [...options1,{label:prev.jobTitle,id:prev._id,value:"option_"+ct}])
    })
  }
  const options2 = [
    { label: "Part-time training", value: "option_1" },
    { label: "Full-time training", value: "option_2" },
    { label: "Volunteering", value: "option_3" },
    { label: "Temporary", value: "option_4" },
    { label: "Degree placement", value: "option_5" },
    { label: "Paralegal work", value: "option_6" },
    { label: "Remote / online", value: "option_7" },
  ];
  const options3 = [
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
  let history=useHistory();
  var flag=false;
    async function handleSubmit(event) {
    event.preventDefault();
    console.log(add);
    await api.post("/",add)
    .then(function (res) {
        console.log(res.data);
        if(res.data.message==="Account is not a type of employer"){
          window.alert("You are not authorized");
          history.push('/employer');
        }
        else if(res.data.message==="No fields can be empty"){
          window.alert("No fields can be empty");
         history.push('/employer');
        }
        else if(res.data.message==="Not logined"){
         window.alert("Please login");
         history.push('/login');
         }
        if(res.data.success){
            flag=true;
           if(flag){
            handleClose();
            window.alert("Successfully added a job");
           history.push('/employer');

         }
           else{
            window.alert("You are not authorized");
           history.push('/employer');}
        }
      })
      .catch(function (error) {
        console.log("here")

      });


    }
    useEffect(()=>{api.post("../viewProfile",{})
    .then(function (res) {
        console.log(res.data);
        if(res.data.success){
            flag=true;
           if(flag){
           getJobs(res.data.user.jobs);
           getOriginal(res.data.user.jobs);
           mapOptions1(res.data.user.experience);
         }
      }})
      .catch(function (error) {
         window.alert("Please login");
         history.push('/login');

      });
    api.get("../checkLogin")
    .then((res)=>{
      changeLogin(res.data.success);
    }).catch((err)=>{
      console.log(err);
    })
  },[]);
  function mapJob(job){
      return(
      <SelectionCard
       key={job._id}
       title={job.title}
       companyname={job.company}
       years={job.experience}
       venue={job.venue}
       salary={job.salary}
       date={job.createdAt}
       info={job.info}
       applied={job.applied.length}
       id={job._id}
      />
      )
  }
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  async function handleExperience(event) {
    event.preventDefault();
    console.log(exp)
    await api.post("../addExperienceEmployer",exp)
    .then(function (res) {
        console.log(res.data);
        if(res.data.success){
            flag=true;
           if(flag){
            window.alert("You added an experience");
            changeOptions1(options1=> [...options1,{label:res.data.experience.jobTitle,id:res.data.experience._id,value:"option_"+options1.length}])
            changeExperience({});
            document.getElementById("jobTitle").value="";
            document.getElementById("description").value="";
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
    <div className="employer">
      <div className="employerheader">
        <div className="employerheader-left">
          <h1>
            Join,
            <br /> to hunt for the best Candidate for you...
          </h1>
          <p>Enroll to explore for exciting contents.</p>
          <div className="buttonGroup">
            <button>Explore</button>
            <Link to="login">
              <button className="join">join</button>
            </Link>
          </div>
        </div>
        <div className="employerheader-right">
          <Lottie options={defaultOptions} className="anime" />
        </div>
      </div>
      <div className="candidateSearch">
        <div className="search">
          <SearchIcon className="jobIcon" />{" "}
          <input type="text" placeholder="search for efficient candidate" />
        </div>
        <div className="location">
          <MyLocationIcon className="jobIcon" /> <input type="text" placeholder=" Location" />
        </div>
        <div className="experience">
          <CalendarTodayIcon className="jobIcon" /> <input type="text" placeholder="Experience" />
        </div>

        <button>Find a match</button>
      </div>
      <div className="selectionCards">
        <div className="left">
          <div className="leftHeader">
            <h4>Filter</h4>
            <input type="text" placeholder="search by skills" />
            <h4>Specialities</h4>
            <div className="checkBox">
              <div className="checkItems">
                <input type="checkbox" />
                <label htmlFor="">Internships</label>
              </div>
              <div className="checkItems">
                <input type="checkbox" />
                <label htmlFor="">Full-Time</label>
              </div>
              <div className="checkItems">
                <input type="checkbox" />
                <label htmlFor="">Part-Time</label>
              </div>
              <div className="checkItems">
                <input type="checkbox" />
                <label htmlFor="">Freelance</label>
              </div>
            </div>
          </div>
          <div className="leftBottom">
            <button onClick={handleOpen}>
              {" "}
              <AddCircleOutlineIcon /> Add new Job
            </button>
          </div>
        </div>
        <div className="right">
        {jobs.map(job=> mapJob(job))}
        </div>
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
              <h2>Add Job</h2>

              <CloseIcon onClick={handleClose} className="close" />
            </div>
            <hr />
            <div className="form" style={{width:"-webkit-fill-available"}}>
              <label for="jobTitle">Job Title</label>
              <input
                name="title"
                type="text"
                class="form-control"
                id="jobTitle"
                placeholder="Job Title"
                onChange={handleChange}
              />
              <label for="company">Company Name</label>
              <input
                name="company"
                type="text"
                class="form-control"
                id="company"
                placeholder="company"
                onChange={handleChange}
              />
              <label for="jobtype">Job type</label>
                <MultiSelect className="multiselectWidth1" onChange={handleOnchange4} options={options2} />
              

                <label for="areaoflaw">Area of Law</label>
                <MultiSelect className="multiselectWidth1" onChange={handleOnchange5} options={options3} />
                
              {/* <h3>Experience candidate must have</h3>
              <hr />
              <div className="expuwant">
                <div className="colmn">
                  <label for="experience">Experience </label>
                  <input
                    name="experience"
                    type="text"
                    class="form-control"
                    id="experience"
                    placeholder="experience needed"
                  />
                </div>
                <div className="colmn">
                  <label for="experience">Duration </label>
                  <input
                    name="experience"
                    type="text"
                    class="form-control"
                    id="experience"
                    placeholder="time period needed"
                  />
                </div>
              </div>
              <h3>Secondary experience</h3>
              <hr />
              <div className="expuwant">
                <div className="colmn">
                  <label for="experience">Experience </label>
                  <input
                    name="experience"
                    type="text"
                    class="form-control"
                    id="experience"
                    placeholder="experience needed"
                  />
                </div>
                <div className="colmn">
                  <label for="experience">Duration </label>
                  <input
                    name="experience"
                    type="text"
                    class="form-control"
                    id="experience"
                    placeholder="time period needed"
                  />
                </div>
              </div> */}
              {/* <label for="job_type">Job Type</label>
              <input
                name="jobType"
                type="text"
                class="form-control"
                id="jobType"
                placeholder="job type"
                onChange={handleChange}
              />
              <label for="area">Area of Law</label>
              <input
                name="area"
                type="text"
                class="form-control"
                id="area"
                placeholder="area of law"
                onChange={handleChange}
              /> */}
              <label for="experience">Experience nedeed: <span style={{color:"blue",cursor:"pointer"}} onClick={handleDisplay}>Add new Experience </span></label>
              <MultiSelect className="multiselectWidth1" onChange={handleOnchange2} options={options1} name="experiencePrimary"/>
              <label for="experience">Secondary Experience(Nice to have experience)</label>
              <MultiSelect className="multiselectWidth1"  onChange={handleOnchange3} options={options1} name="experienceSecondary"/>
              <div className="addExperience"  style={customStyle}>
                <h2>Add Experience</h2>
                <div className="experienceSheet">
                  <p className="sheetTitle">Experience Title</p>
                  {/* <div className="sheetDetails">
                    <p>Duration(From-To)</p>
                  </div> */}
                  
                  <div className="sheetDescp" >
                    <h4>Experience Description</h4>
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
                  <label for="jobtitle">Experience Title</label>
                  <input type="text" name="jobTitle" id="jobTitle" placeholder="Experience Title" onChange={getExperience}/>
                  {/* <label for="timeperiod">Duration</label>
                  <input type="text" name="duration" id="duration" placeholder="Duration" onChange={getExperience} /> */}
                  <label for="Job_description">Experience description(optional)</label>
                  <textarea
                    placeholder="type your experience description here"
                    name="description"
                    id="description"
                    cols="30"
                    rows="5"
                    onChange={getExperience}
                  />
                </div>
                <button className="addexpe" onClick={handleExperience}> Add Experience</button>
              </div>
              <label for="experience">Experience(in Years)</label>
              <input name="experience" type="text" onChange={handleChange} class="form-control" id="experience" placeholder="experience" />
              
              <label for="venue">Venue</label>
              <input name="venue" type="text" onChange={handleChange} class="form-control" id="venue" placeholder="Venue" />
              <label for="salary">Salary</label>
              <input
                name="salary"
                type="text"
                class="form-control"
                id="salary"
                placeholder="salary"
                onChange={handleChange}
              />
              <div className="addskill">
                <p>Skills that will be developed on the job:</p>
                <MultiSelect className="multiselectWidth1" onChange={handleOnchange} options={options} name="skillsDeveloped" />
              </div>
              <div className="addskill">
                <p>Skills that are required to apply:</p>
                <MultiSelect className="multiselectWidth1"  onChange={handleOnchange1} options={options} name="skillsRequired" />
              </div>

              <label for="jobTags">About job</label>
              <textarea
                placeholder="type your requirements here"
                name="info"
                id="jobTags"
                cols="30"
                rows="10"
                onChange={handleChange}
              />
              <button onClick={handleSubmit}>Add Post</button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default Employer;
