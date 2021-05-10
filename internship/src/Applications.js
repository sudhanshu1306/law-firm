import React,{useState,useEffect} from "react";
import "./Applications.css";
import { Link ,useHistory } from "react-router-dom";
import CandidateCard from "./CandidateCard";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import SearchIcon from "@material-ui/icons/Search";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import axios from "axios";


const api=axios.create({
  withCredentials: true,
  baseURL:process.env.REACT_APP_ROUTE,
  validateStatus: () => true
});

function Applications() {
  var history=useHistory();
  const [users,getUsers]=useState([]);
  const [url,changeUrl]=useState();
  var flag=false;
  function mapUser(user){
    return(
      <CandidateCard
       key={user._id}
       name={user.name}
       title={history.location.state.title}
       image={url+user.profileImage}
       user={user}
       id={user._id}
      />
    )
  }
  useEffect(()=>{
    console.log(history.location);
     api.post("/jobApplicant",history.location.state?{id:history.location.state.id}:{})
  .then((res)=>{
    console.log(res.data);
    getUsers(res.data.applicant);
    changeUrl(res.data.url)
  }).catch((err)=>{
    console.log(err);
  })},[]);
  return (
    <div className="applications">
      <div className="candidateSearch1">
        <div className="search">
          <SearchIcon className="jobIcon" />
          <input type="text" placeholder="search by skills" />
        </div>
        <div className="location">
          <MyLocationIcon className="jobIcon" /> <input type="text" placeholder=" Location" />
        </div>
        <div className="experience">
          <CalendarTodayIcon className="jobIcon" /> <input type="text" placeholder="Experience" />
        </div>

        <button>Find a match</button>
      </div>
      <div className="applicationsHeader">
        <h1>Applications of Candidate</h1>
      </div>
      <div className="applicationsbottom">
        <div className="applicationsbottom-left">
          <div className="leftHeader">
            <h4>Filter</h4>
            <input type="text" placeholder="search by skills" />
            <h4>Specialities</h4>
            <div className="checkBox">
              <div className="checkItems white">
                <input type="checkbox" />
                <label htmlFor="">Functioning knowledge</label>
              </div>
              <div className="checkItems white">
                <input type="checkbox" />
                <label htmlFor="">Standard of work</label>
              </div>
              <div className="checkItems white">
                <input type="checkbox" />
                <label htmlFor="">Autonomy</label>
              </div>
              <div className="checkItems white">
                <input type="checkbox" />
                <label htmlFor="">Complexity</label>
              </div>
              <div className="checkItems white">
                <input type="checkbox" />
                <label htmlFor="">Perception of context</label>
              </div>
              <div className="checkItems white">
                <input type="checkbox" />
                <label htmlFor="">Innovation and originality</label>
              </div>
            </div>
          </div>
        </div>

        <div className="applicationsbottom-right">
        {users.map(user=> mapUser(user))}
        </div>
      </div>
    </div>
  );
}

export default Applications;
