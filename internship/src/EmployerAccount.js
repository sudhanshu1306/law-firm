import React,{useState,useEffect} from "react";
import "./EmployerAccount.css";
import Avatar from "@material-ui/core/Avatar";
import { Link,useHistory } from "react-router-dom";
import CandidateCard from "./CandidateCard";
import SelectionCard from "./SelectionCard";
import axios from "axios";


const api=axios.create({
    withCredentials: true,
    baseURL:process.env.REACT_APP_ROUTE+'/jobs',
    validateStatus: () => true
  });

function EmployerAccount() {
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
          <p>Scope</p>
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
    </div>
  );
}

export default EmployerAccount;
