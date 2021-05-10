import React,{useState,useEffect} from "react";
import EmployeeJobCard from "./EmployeeJobCard";
import "./MyJobs.css";
import { Link,useHistory } from "react-router-dom";
import axios from "axios";


const api=axios.create({
    withCredentials: true,
    baseURL:process.env.REACT_APP_ROUTE
  });

function MyJobs() {
  const [user,changeUser]=useState({});
  const [type,changeType]=useState(["Admin","Employer","Student","Tutor"]);
   const [url,changeUrl]=useState("");
   function createJob(job){
    return (
      <EmployeeJobCard
      key={job._id}
      jobTitle={job.title}
      companyName={job.company}
      location={job.venue}
      experience={job.experience}
      salaries={job.salary}
      jobTags={job.info}
      id={job._id}
    />
  )
  }
  let history=useHistory();
  var flag=false;

  useEffect(async()=>{await api.post("/viewProfile",{})
  .then(function (res) {
      console.log(res.data);
      if(res.data.success){
          flag=true;
         if(flag){
         changeUser(res.data.user);
         changeUrl(res.data.url);
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
  return (
    <div className="myJobs">
      <div className="educationHeader">
        <Link className="link6" to="/">
          <h1 className="link5">QWE</h1>
        </Link>
      </div>
      <h1>My applied jobs</h1>
      <div className="registeredCourses">
      {user.jobs&&user.jobs.map(job=> createJob(job) )}
      </div>
    </div>
  );
}

export default MyJobs;
