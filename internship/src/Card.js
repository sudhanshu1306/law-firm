import React,{useState} from "react";
import "./Card.css";
import { Link,useHistory } from "react-router-dom";
import axios from "axios";


const api=axios.create({
    withCredentials: true,
    baseURL:process.env.REACT_APP_ROUTE,
    validateStatus: () => true
  });

function Card({ title, description, image,company,employer, number, site, button, button2,id }) {
  const [registered,changeRegistered]=useState(number);
  let history=useHistory();
  var flag=false;
  async function handleRegister(event) {
  event.preventDefault();
  const data={
    id:id
  }
  await api.post("/registerForCourse",data)
  .then(function (res) {
      console.log(res.data);
      if(res.data.success){
          flag=true;
         if(flag){
          window.alert("Successfully registered for course");
          changeRegistered(registered+1);
       }
       else{
         window.alert(res.data.message);
       }
      }
    })
    .catch(function (error) {
       console.log(error);
    });
  }
  function handleLesson(){
    history.push("/lessons",{state:{id:id,title:title,employer:employer}})
  }
  return (
    <div className="card">
      <div className="cardTop">
        <img src={image} alt="background" />
      </div>
      <div className="cardBottom">
        <div className="introBox">
          <img src={company} alt="companyLogo" />
        </div>
        <div className="cardContent">
          <h2>{title}</h2>
          <p>{description}</p>
          <h5>
            Author:- <span>{employer}</span>
          </h5>
          <h5>
            Registered:- <span>{number} </span> users
          </h5>
          <div className="buttonGroup-bottom">
            <Link className="lessonButton" to={{pathname:"/lessons",state:{id:id,title:title,employer:employer}}}>
              <button  >{button2}</button>
            </Link>
            <button className="register" onClick={handleRegister}>{button}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
