import React,{useState,useEffect} from "react";
import "./RegisteredCourse.css";
import Card from "./Card";
import "./RegisteredCourse";
import { Link,useHistory } from "react-router-dom";
import axios from "axios";


const api=axios.create({
    withCredentials: true,
    baseURL:process.env.REACT_APP_ROUTE
  });

function RegisteredCourse() {
  const [user,changeUser]=useState({});
  const [type,changeType]=useState(["Admin","Employer","Student","Tutor"]);
   const [url,changeUrl]=useState("");
   function createCourse(course){
    return (
      <Card
      image={url+course.image}
      company={url+course.author.profileImage}
      title={course.title}
      description={course.info}
      employer={course.author.name}
      number={course.registered.length}
      button2="Lessons"
      button="Register"
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
    <div className="registeredCourse">
      <div className="educationHeader">
        <Link to="/">
          <h1 className="link5">QWE</h1>
        </Link>
      </div>
      <div className="registeredCourses">
      {user.courses&& user.courses.map(course=> createCourse(course))}
      </div>
    </div>
  );
}

export default RegisteredCourse;
