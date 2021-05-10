import React,{useState,useEffect} from "react";
import "./Training.css";
import { useHistory } from "react-router-dom";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import Fade from "@material-ui/core/Fade";
import Card from "./Card";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";


const api=axios.create({
    withCredentials: true,
    baseURL:process.env.REACT_APP_ROUTE
  });

function Training() {
  const [open, setOpen] = React.useState(false);
  const [login,changeLogin]=useState();
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [courses,getCourses]=useState([]);
  const [url,changeUrl]=useState();
  useEffect(()=>{api.get("/getcourse")
  .then((res)=>{
    console.log(res.data);
    getCourses(res.data.courses);
    changeUrl(res.data.url);
  }).catch((err)=>{
    console.log(err);
  })
  api.get("../checkLogin")
.then((res)=>{
  changeLogin(res.data.success);
}).catch((err)=>{
  console.log(err);
})
},[]);
let history=useHistory();
var flag=false;

function createCourse(course){
  return (
    <Card
    key={course._id}
    image={url+course.image}
    company={url+course.author.profileImage}
    title={course.title}
    description={course.info}
    employer={course.author.name}
    number={course.registered.length}
    button2="Lessons"
    button="Register"
    id={course._id}
  />
)
}




async function handleSubmit(event) {
event.preventDefault();
let myForm=document.getElementById('myForm');
    var formData=new FormData(myForm);
const config = {
      headers: {
          'content-type': 'multipart/form-data'
      }
  };
await api.post("/postCourse",formData,config)
.then(function (res) {
    console.log(res.data);
    if(res.data.success){
        flag=true;
       if(flag){
        handleClose();
        window.alert("Successfully added a course");
       history.push('/training');

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


}
  return (
    <div className="training">
      <div className="jobsHeader-Search">
        <div className="search1">
          <SearchIcon className="jobIcon" />
          <input type="text" placeholder="search topic" />
        </div>

        <button>Find a match</button>
      </div>
      <div className="trainingHeader">
        <div className="trainingHeader-left">
          <h1>Trainings & courses</h1>
          <p>It will help you to achieve your goals.</p>
        </div>
        {login&&<div className="trainingHeader-right" onClick={handleOpen}>
          <p>Add Courses</p>
          <AddCircleOutlineIcon className="add" />
        </div>}
      </div>
      <div className="courses">
      {courses.map(course=> createCourse(course))}
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
              <h2>Add your Course</h2>

              <CloseIcon onClick={handleClose} className="close" />
            </div>
            <hr />
            {/*
            <p id="transition-modal-title">Course Title</p>
            <input type="text" placeholder="add title" />
            <p className="content" id="transition-modal-description">
              Course Description
            </p>
            <input type="text" placeholder="type your course description" />
            <p className="content" id="transition-modal-description">
              Add course files
            </p>
            <input className="inputfile" type="file" id="files" name="files" multiple />
            <button>Add Course</button>*/}
            <form className="formModal" id="myForm">
            <p id="transition-modal-title">Course Title</p>
            <input type="text" placeholder="add title" name="title"/>
            <p className="content" id="transition-modal-description">
              Course Description
            </p>
            <input type="text" placeholder="type your course description" name="info" />
            <p className="content" id="transition-modal-description">
              Add course cover
            </p>
            <input className="inputfile" type="file" id="files" name="pic" enctype="multipart/form-data"  />
            <button onClick={handleSubmit}>Add Course</button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default Training;
