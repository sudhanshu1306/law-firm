import React, { useState,useEffect} from "react";
import "./Header.css";
import Avatar from "@material-ui/core/Avatar";
import { NavLink, Link,useHistory } from "react-router-dom";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import axios from "axios";


const api=axios.create({
    withCredentials: true,
    baseURL:process.env.REACT_APP_ROUTE
  });

function Header() {
  const [header, setHeader] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [user,changeUser]=useState({});
  const [type,changeType]=useState(["Admin","Employer","Student","Tutor"]);
  const [url,changeUrl]=useState("");
  const [login,changeLogin]=useState();
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
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
       }}
         else{
          console.log(res.data);
        }
    })
    .catch(function (error) {
       console.log(error);
      //  window.alert("Please login");
      //  history.push('/login');

    });
    api.get("../checkLogin")
.then((res)=>{
  changeLogin(res.data.success);
}).catch((err)=>{
  console.log(err);
})


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
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }

  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setHeader(true);
    } else {
      setHeader(false);
    }
  };
  window.addEventListener("scroll", changeBackground);

  return (
    <div className={header ? "header active2" : "header"}>
      <div className="headerLeft">
        <Link className="link" to="/">
          <h2 className="logo">QWE</h2>
        </Link>
      </div>
      <div className="headerMiddle">
        <NavLink className="link1" to="jobs" activeClassName="active1">
          <h2 className="menuItems">Jobs</h2>
        </NavLink>
        <NavLink className="link1" to="training" activeClassName="active1">
          <h2 className="menuItems">Trainings & courses</h2>
        </NavLink>
        <NavLink className="link1" to="articles" activeClassName="active1">
          <h2 className="menuItems">Articles</h2>
        </NavLink>

        <NavLink className="link1" to="discussion" activeClassName="active1">
          <h2 className="menuItems">Discussion Forum</h2>
        </NavLink>
      </div>
      <div className="headerRight">
        {/*<Avatar
          className="avatar"
          alt="Cindy Baker"
          src="https://cdn.dribbble.com/users/936002/screenshots/12772391/media/68f3ed6324a30cb7047d0ec6485d6a6b.png?compress=1&resize=800x600"
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        />*/}
        {user.profileImage?<Avatar onClick={handleToggle} aria-haspopup="true" aria-controls={open ? "menu-list-grow" : undefined} ref={anchorRef} className="avatar" alt={user.name} src={url+user.profileImage}  />:<Avatar className="profilePic" onClick={handleToggle} aria-haspopup="true" aria-controls={open ? "menu-list-grow" : undefined} ref={anchorRef} className="avatar">{user.name&&user.name.charAt(0)}</Avatar>}
        <Popper
          className="dropdown"
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === "bottom" ? "center top" : "center bottom" }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                  {!login&&<><MenuItem className="link2" onClick={logout}>
                    Login
                  </MenuItem></>}
                  {login&&<><Link className="link" to={user.type==2?"dashboard":"employerAccount"}>
                    <MenuItem className="link2" onClick={handleClose}>
                      My Account
                    </MenuItem>
                  </Link>
                  {user.type==0&&<Link className="link" to="approve">
                    <MenuItem className="link2" onClick={handleClose}>
                      Approve
                    </MenuItem>
                  </Link> }
                  <MenuItem className="link2" onClick={logout}>
                    Logout
                  </MenuItem></>}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}

export default Header;
