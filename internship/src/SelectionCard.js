import React from "react";
import "./SelectionCard.css";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import MoneyOutlinedIcon from "@material-ui/icons/MoneyOutlined";
import { Link,useHistory } from "react-router-dom";
import axios from "axios";


const api=axios.create({
    withCredentials: true,
    baseURL:process.env.REACT_APP_ROUTE,
    validateStatus: () => true
  });

function SelectionCard(props) {
  var history=useHistory();
  function handleDelete(){
    if(window.confirm("Are you sure you want to delete?")){
    api.post("/deleteJob",{id:props.id})
    .then((res)=>{
      if(res.data.success){
        window.alert("Successfull deleted job");
        window.location.reload();
      }
    })
    .catch(err=>{
      window.alert("Some error occured");
      window.location.reload();
    })}
    else
    window.alert("You cancelled delete request");
  }
  return (
    <div className="selectionCard">
      <div className="selectionCard-header">
        <div className="selectionCard-headerLeft">
          <h3>
            {props.title} <span>Posted on {props.date.substring(0,10)}</span>
          </h3>
          <p>{props.info}</p>
        </div>
        <div className="selectionCard-headerRight">
          <p>
            <MoneyOutlinedIcon className="selects" /> Salary:{props.salary}
          </p>
          <p>
            <LocationOnOutlinedIcon className="selects" /> {props.venue}
          </p>
        </div>
      </div>
      <div className="list">
        <p>No. of applications: {props.applied}</p>
      </div>
      <div className="selectionCard-bottom">
        <button className="view" onClick={handleDelete}>Delete Job</button>
          <Link to={{pathname:"/applications",state:{id:props.id,title:props.title}}}>
          <button className="view" >View Applications</button>
          </Link>
      </div>
    </div>
  );
}

export default SelectionCard;
