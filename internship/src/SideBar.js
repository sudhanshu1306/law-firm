import React,{useState,useEffect} from "react";
import "./SideBar.css";
import Avatar from "@material-ui/core/Avatar";
import DashboardOutlinedIcon from "@material-ui/icons/DashboardOutlined";
import SchoolOutlinedIcon from "@material-ui/icons/SchoolOutlined";
import MenuBookOutlinedIcon from "@material-ui/icons/MenuBookOutlined";
import LibraryBooksOutlinedIcon from "@material-ui/icons/LibraryBooksOutlined";
import StyleOutlinedIcon from "@material-ui/icons/StyleOutlined";
import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import { NavLink,useHistory } from "react-router-dom";
import axios from "axios";


const api=axios.create({
    withCredentials: true,
    baseURL:process.env.REACT_APP_ROUTE
  });

function SideBar() {
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
   async function logout(){
    await api.post("/logout",{})
    .then(function (res) {
        console.log(res.data);
        if(res.data.success){
            history.push('/login');
      }})
      .catch(function (error) {
         history.push('/login');
      });
    }
  return (
    <div className="sideBar">
      <div className="topProfile">
      {user.profileImage?<Avatar alt={user.name} src={url+user.profileImage} className="profilePic" />:<Avatar className="profilePic">{user.name&&user.name.charAt(0)}</Avatar>}
          <div className="StudentInfo">
          <h3>{user.name}</h3>
          <p>Occupation</p>
          <p>Working at Qualyval</p>
          <p>Profile Type: Student</p>
        </div>
      </div>
      <div className="accountOptions">
        <NavLink className="anchor" to="/dashboard" activeClassName="active">
          <button className="sideMenu">
            <DashboardOutlinedIcon className="dash" />
            Dashboard
          </button>
        </NavLink>

        <NavLink className="anchor" to="/education" activeClassName="active">
          <button className="sideMenu">
            <SchoolOutlinedIcon className="dash" />
            Education
          </button>
        </NavLink>

        <NavLink className="anchor" to="/registeredCourse" activeClassName="active">
          <button className="sideMenu">
            <MenuBookOutlinedIcon className="dash" />
            Registered Courses
          </button>
        </NavLink>

        <NavLink className="anchor" to="/myArticles" activeClassName="active">
          <button className="sideMenu">
            <LibraryBooksOutlinedIcon className="dash" />
            Articles by you
          </button>
        </NavLink>
        <NavLink className="anchor" to="/skills" activeClassName="active">
          <button className="sideMenu">
            <StyleOutlinedIcon className="dash" />
            My Skills
          </button>
        </NavLink>
        <NavLink className="anchor" to="/myJobs" activeClassName="active">
          <button className="sideMenu">
            <WorkOutlineOutlinedIcon className="dash" />
            Applied Jobs
          </button>
        </NavLink>
      </div>

      <div className="editProfile">
        <button onClick={logout}>LogOut</button>
      </div>
    </div>
  );
}

export default SideBar;
