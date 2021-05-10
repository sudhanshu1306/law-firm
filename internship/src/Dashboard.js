import React,{useState,useEffect} from "react";
import "./Dashboard.css";
import { Link,useHistory } from "react-router-dom";
import axios from "axios";


const api=axios.create({
    withCredentials: true,
    baseURL:process.env.REACT_APP_ROUTE
  });

function Dashboard() {
  const [user,changeUser]=useState({});
  const [type,changeType]=useState(["Admin","Employer","Student","Tutor"]);
   const [url,changeUrl]=useState("");
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
    <div className="dashboard">
      <div className="dashboardHeader">
        <Link className="link6" to="/">
          <h1 className="link5">QWE</h1>
        </Link>
      </div>
      <div className="dashboardMiddle">
        <div className="numberCount">
          <h1>{user.jobs?user.jobs.length:"0"}</h1>
          <p>Jobs Applied</p>
        </div>
        <div className="numberCount color2">
          <h1>{user.courses?user.courses.length:"0"}</h1>
          <p>Courses </p>
        </div>
        <div className="numberCount color3">
          <h1>{user.articles?user.articles.length:"0"}</h1>
          <p>Articles</p>
        </div>
      </div>
      <div className="dashboardBottom">
        <h2>{user.name}</h2>
        <h2>Experience: 3 years</h2>
        <h2>Location: XYZ</h2>
        <h3>Interested field</h3>
        <div className="interested">
          <div className="radiobuttons">
            <input className="radio1" type="radio" id="pursuing" name="status" value="pursuing" />
            <label for="pursuing">Part-time training</label>
            <br />
          </div>
          <div className="radiobuttons">
            <input className="radio1" type="radio" id="completed" name="status" value="completed" />
            <label for="completed">Full-time training</label>
            <br />
          </div>
          <div className="radiobuttons">
            <input className="radio1" type="radio" id="pursuing" name="status" value="pursuing" />
            <label for="pursuing">Volunteering</label>
            <br />
          </div>
          <div className="radiobuttons">
            <input className="radio1" type="radio" id="completed" name="status" value="completed" />
            <label for="completed">Temporary</label>
            <br />
          </div>
          <div className="radiobuttons">
            <input className="radio1" type="radio" id="pursuing" name="status" value="pursuing" />
            <label for="pursuing"> Degree placement</label>
            <br />
          </div>
          <div className="radiobuttons">
            <input className="radio1" type="radio" id="completed" name="status" value="completed" />
            <label for="completed">Paralegal work</label>
            <br />
          </div>
          <div className="radiobuttons">
            <input className="radio1" type="radio" id="pursuing" name="status" value="pursuing" />
            <label for="pursuing">Remote / online</label>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
