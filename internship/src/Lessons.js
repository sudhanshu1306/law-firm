import React,{useState,useEffect} from "react";
import "./Lessons.css";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import { Link ,useHistory } from "react-router-dom";
import axios from "axios";


const api=axios.create({
    withCredentials: true,
    baseURL:process.env.REACT_APP_ROUTE,
    validateStatus: () => true
  });


function Lessons() {
  const [lessons,changeLessons]=useState([]);

  var flag=false;
  function mapVideo(video){
    console.log(video);
    return (
      <>
      <div className="lectures">
      <PlayCircleOutlineIcon className="play" />
      <h4>{video.title}</h4>
      <Link className="link4" to="lecture">
      <button>Resume</button>
      </Link>
    </div>
    </>
  )
  }

 let history=useHistory();

  useEffect(async ()=>{
    console.log(history.location);
    await api.post("/getLessons",history.location?history.location.state:{})
  .then((res)=>{
    console.log(res.data);
    changeLessons(res.data.lessons);
  }).catch((err)=>{
    console.log(err);
  })},[]);
  return (
    <div className="lessons">
      <div className="lessonsHeader">
        <h3>{history.location&&history.location.state.title}</h3>
        <p>By: {history.location&&history.location.state.employer}</p>
      </div>
      <div className="leasonsContent">
      {lessons&&lessons.map(lesson=> lesson.videos&&lesson.videos.map(video=> mapVideo(video)))}
      </div>
    </div>
  );
}

export default Lessons;
