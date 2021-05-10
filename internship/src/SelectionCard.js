import React from "react";
import "./SelectionCard.css";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import MoneyOutlinedIcon from "@material-ui/icons/MoneyOutlined";
import { Link,useHistory } from "react-router-dom";

function SelectionCard(props) {
  var history=useHistory();
  function handleApplicants(){
    history.push('/applications',{id:props.id,title:props.title});
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
        <button className="view">Delete Job</button>
          <button className="view" onClick={handleApplicants}>View Applications</button>
      </div>
    </div>
  );
}

export default SelectionCard;
