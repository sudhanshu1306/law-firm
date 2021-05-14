import React,{useState,useEffect} from "react";
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
            <div className="form">
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
              <label for="job_type">Job Type</label>
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
              />
              <label for="experience">Experience nedeed</label>
              <input
                name="experience"
                type="text"
                class="form-control"
                id="experience"
                placeholder="experience needed"
                onChange={handleChange}
              />
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
