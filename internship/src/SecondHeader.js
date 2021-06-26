import React, { useState } from "react";
import "./SecondHeader.css";
import Avatar from "@material-ui/core/Avatar";
import { NavLink, Link } from "react-router-dom";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import WorkOutlineIcon from "@material-ui/icons/WorkOutline";
import TrackChangesIcon from "@material-ui/icons/TrackChanges";
import DescriptionIcon from "@material-ui/icons/Description";
import ForumIcon from "@material-ui/icons/Forum";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import SearchIcon from "@material-ui/icons/Search";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";

function SecondHeader() {
  const [header, setHeader] = useState(false);
  const [open, setOpen] = React.useState(false);
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
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }
  return (
    <div className="secondHeader">
      <div className="headerLeft">
        <Link className="link" to="/">
          <h2 className="logo">QWE</h2>
        </Link>
      </div>
      <div className="searchOption">
        <input className="input1" type="text" placeholder="search your interest" />

        <input className="input1" type="text" placeholder="Experience" />

        <SearchIcon className="jobIcon1" />
      </div>
      <div className="secondHeaderMiddle">
        <NavLink className="link9" to="jobs" activeClassName="active1">
          <div className="headerOption">
            <WorkOutlineIcon className="jobIcon" />
            <p>Job</p>
          </div>
        </NavLink>
        <NavLink className="link9" to="training" activeClassName="active1">
          <div className="headerOption">
            <TrackChangesIcon className="jobIcon" />
            <p>Trainings</p>
          </div>
        </NavLink>
        <NavLink className="link9" to="articles" activeClassName="active1">
          <div className="headerOption">
            <DescriptionIcon className="jobIcon" />
            <p>Articles</p>
          </div>
        </NavLink>

        <NavLink className="link9" to="discussion" activeClassName="active1">
          <div className="headerOption">
            <ForumIcon className="jobIcon"/>
            <p>Forum</p>
          </div>
        </NavLink>
      </div>
      <div className="headerRight">
        <Avatar
          className="avatar"
          alt="Cindy Baker"
          src="https://cdn.dribbble.com/users/936002/screenshots/12772391/media/68f3ed6324a30cb7047d0ec6485d6a6b.png?compress=1&resize=800x600"
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        />
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
                    <Link className="link" to="dashboard">
                      <MenuItem className="NavLink2" onClick={handleClose}>
                        My Account
                      </MenuItem>
                    </Link>
                    <Link className="link" to="approve">
                      <MenuItem className="NavLink2" onClick={handleClose}>
                        Approve
                      </MenuItem>
                    </Link>

                    <MenuItem className="NavLink2" onClick={handleClose}>
                      Logout
                    </MenuItem>
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

export default SecondHeader;
