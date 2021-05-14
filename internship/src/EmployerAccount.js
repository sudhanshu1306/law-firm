import React,{useState,useEffect} from "react";
import "./EmployerAccount.css";
import Avatar from "@material-ui/core/Avatar";
import { Link,useHistory } from "react-router-dom";
import CandidateCard from "./CandidateCard";
import SelectionCard from "./SelectionCard";
import axios from "axios";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import Fade from "@material-ui/core/Fade";


const api=axios.create({
    withCredentials: true,
    baseURL:process.env.REACT_APP_ROUTE+'/jobs',
    validateStatus: () => true
  });

function EmployerAccount() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [original,getOriginal]=useState([]);
  let [jobs,getJobs]=useState([]);
  const [user,changeUser]=useState({});
  const [url,changeUrl]=useState("");
  const [login,changeLogin]=useState(false);
  const [searchobj,changeSearch]=useState({});
  function handleSearch (event) {
    changeSearch({
        ...searchobj,[event.target.name]: event.target.value
    });
  }
  let history=useHistory();
  var flag=false;
  async function handleSubmit(event) {
    event.preventDefault();
    let myForm=document.getElementById('myForm');
        var formData=new FormData(myForm);
    const config = {
          headers: {
              'content-type': 'multipart/form-data'
          }
      };
    await api.post("../editEmployer",formData,config)
    .then(function (res) {
        console.log(res.data);
        if(res.data.success){
            flag=true;
           if(flag){
            handleClose();
            window.alert("Successfully updated profile");
           history.push('/employerAccount');
           window.location.reload();
         }}
           else{
            window.alert(res.data.message);
           history.push('/employerAccount');
         }
      })
      .catch(function (error) {
  
         window.alert("Some error occured");
         history.push('/employerAccount');
  
      });
  
  
    }
  useEffect(()=>{api.post("../viewProfile",{})
    .then(function (res) {
        console.log(res.data);
        if(res.data.user.type!==1){
          window.alert("You are not authorized to view this page");
          history.push('/login');
        }
        if(res.data.success){
            flag=true;
            
           if(flag){
           getJobs(res.data.user.jobs);
           getOriginal(res.data.user.jobs);
           changeUser(res.data.user);
         changeUrl(res.data.url);
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
  return (
    <div className="employerAccount">
      <div className="employerAccount-Header">
        <div className="employerAccount-HeaderLeft">
          {/*<Avatar
            className="profileImage1"
            alt="Cindy Baker"
            src="https://cdn.dribbble.com/users/936002/screenshots/12772391/media/68f3ed6324a30cb7047d0ec6485d6a6b.png?compress=1&resize=800x600"
          />*/}
          {user.profileImage?<Avatar className="profileImage1" alt={user.name} src={url+user.profileImage}  />:<Avatar  className="profileImage1">{user.name&&user.name.charAt(0)}</Avatar>}
          <button onClick={handleOpen}>Edit Profile</button>
        </div>
        <div className="numbers">
          <div className="count">
            <h4>0</h4>
            <p>Hired</p>
          </div>
          <div className="count">
            <h4>{jobs.length}</h4>
            <p>Job Post</p>
          </div>
        </div>
        <div className="employerAccount-HeaderRight">
          <h3>{user.name}</h3>
          <p>Organization Type: Small or medium size law firm. </p>
          <p>Area of law: Welfare benefits and social security rights. </p>
          <p>Profile Type: Employer</p>
        </div>
      </div>

      <div className="employerAccount-bottom">
        <div className="hiredCandidates">
          <h3>Hired Candidates</h3>
          <CandidateCard />
          <CandidateCard />
          <CandidateCard />
          <CandidateCard />
          <CandidateCard />
        </div>
        <div className="jobPosts">
          <h3>Job Posts</h3>
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
            <form className="formModal" id="myForm">
              <label for="companyname">Company Name</label>
              <input
                name="name"
                type="text"
                class="form-control"
                id="companyname"
                placeholder="company name"
                defaultValue={user.name}
              />
              <label for="organizationType">Organization Type</label>
              <input
                name="organizationType"
                type="text"
                class="form-control"
                id="organization_type"
                placeholder="organization type"
                defaultValue={user.organizationType}
              />
              <label for="profilePhoto">Profile Photo</label>
              <input
                name="pic"
                type="file"
                class="form-control"
                id="profilePhoto"
                placeholder="profile photo"
              />

              <button className="save" onClick={handleSubmit}>Save Changes</button>
              </form>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default EmployerAccount;
