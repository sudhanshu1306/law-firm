import React,{useState,useEffect} from "react";
import "./EmployerHeader.css";
import Avatar from "@material-ui/core/Avatar";
import { Link,useHistory } from "react-router-dom";
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

function EmployerHeader() {
  const [open, setOpen] = React.useState(false);
  const [user,changeUser]=useState({});
  const [url,changeUrl]=useState("");
  const [login,changeLogin]=useState();
  const anchorRef = React.useRef(null);
  let history=useHistory();
  var flag=false;

  useEffect(async()=>{await api.post("/viewProfile",{})
  .then(function (res) {
      console.log(res.data);
      if(res.data.success){
          flag=true;
          if(res.data.user.type!==1){
            window.alert("You are not authorized to view this page");
            history.push('/login');
          }
         if(flag){
         changeUser(res.data.user);
         changeUrl(res.data.url);
       }
      }
    })
    .catch(function (error) {

       window.alert("Please login");
       history.push('/login');

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

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
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

  return (
    <div className="employerHeader">
      <div className="employerHeaderLeft">
        <Link className="brandName" to="/employer">
          <h2>QWE</h2>
        </Link>
      </div>

      <div className="employerHeaderRight">
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
                  {login&&<><Link className="link" to="employerAccount">
                    <MenuItem className="link2" onClick={handleClose}>
                      My Account
                    </MenuItem>
                  </Link>


                  <MenuItem className="link2" onClick={logout}>
                    Logout
                  </MenuItem> </>}
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

export default EmployerHeader;
