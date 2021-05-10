import React from "react";
import "./Education.css";
import { Link } from "react-router-dom";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";

function Education() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  const [open2, setOpen2] = React.useState(false);
  const handleOpen2 = () => {
    setOpen2(true);
  };
  const handleClose2 = () => {
    setOpen2(false);
  };
  return (
    <div className="education">
      <div className="educationHeader">
        <Link className="link6" to="/">
          <h1 className="link5">QWE</h1>
        </Link>
      </div>
      <div className="universityName">
        <div className="universityName-header">
          <h3>University/College</h3>
          <button onClick={handleOpen}>
            <AddOutlinedIcon />
            Add New
          </button>
        </div>
        <div className="universityDetails">
          <h4>AKTU</h4>
          <div className="universityDetails-container">
            <div className="universityDetails-left">
              <p>Graduation Status: Pursuing</p>
              <p>SESSION: 2018 to 2022</p>
            </div>
            <div className="universityDetails-right">
              <p>Degree: Bachelor of Technology</p>
              <p>Stream: C.S.E</p>
            </div>
          </div>
        </div>
      </div>
      <div className="universityName">
        <div className="universityName-header">
          <h3>Higher Secondary Education</h3>
          <button onClick={handleOpen1}>
            <AddOutlinedIcon />
            Add New
          </button>
        </div>
        <div className="universityDetails">
          <h4>Delhi Public School</h4>
          <div className="universityDetails-container">
            <div className="universityDetails-left">
              <p>Graduation Status: Pursuing</p>
              <p>SESSION: 2018 to 2022</p>
            </div>
            <div className="universityDetails-right">
              <p>Percentage: 80%</p>
              <p>Stream: Science</p>
            </div>
          </div>
        </div>
        <div className="universityDetails">
          <h4>Delhi Public School</h4>
          <div className="universityDetails-container">
            <div className="universityDetails-left">
              <p>Graduation Status: Pursuing</p>
              <p>SESSION: 2018 to 2022</p>
            </div>
            <div className="universityDetails-right">
              <p>Percentage: 80%</p>
              <p>Stream: Science</p>
            </div>
          </div>
        </div>
        <div className="universityDetails">
          <h4>Delhi Public School</h4>
          <div className="universityDetails-container">
            <div className="universityDetails-left">
              <p>Graduation Status: Pursuing</p>
              <p>SESSION: 2018 to 2022</p>
            </div>
            <div className="universityDetails-right">
              <p>Percentage: 80%</p>
              <p>Stream: Science</p>
            </div>
          </div>
        </div>
      </div>
      <div className="universityName">
        <div className="universityName-header">
          <h3>Higher Education</h3>
          <button onClick={handleOpen2}>
            <AddOutlinedIcon />
            Add New
          </button>
        </div>
        <div className="universityDetails">
          <h4>St. Peters School</h4>
          <div className="universityDetails-container">
            <div className="universityDetails-left">
              <p>Graduation Status: Pursuing</p>
              <p>SESSION: 2018 to 2022</p>
            </div>
            <div className="universityDetails-right">
              <p>Percentage: 80%</p>
            </div>
          </div>
        </div>
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
          <div className="educationModal">
            <div className="addEducation">
              <h2>Add University</h2>
              <CloseIcon onClick={handleClose} className="close" />
            </div>
            <hr />
            <div className="universityForm">
              <TextField
                className="university length"
                id="outlined-basic"
                label="University Name"
                variant="outlined"
              />
              <div className="graduation">
                <label>Graduation status</label>
                <div className="radiobuttons3">
                  <input
                    className="radio1"
                    type="radio"
                    id="pursuing"
                    name="status"
                    value="pursuing"
                  />
                  <label for="pursuing">Pursuing</label>
                  <br />
                </div>
                <div className="radiobuttons3">
                  <input
                    className="radio1"
                    type="radio"
                    id="completed"
                    name="status"
                    value="completed"
                  />
                  <label for="completed">Completed</label>
                  <br />
                </div>
              </div>

              <label>Session</label>
              <div className="session">
                <TextField
                  className="university start"
                  id="outlined-basic"
                  label="Start"
                  variant="outlined"
                />
                <TextField
                  className="university start"
                  id="outlined-basic"
                  label="End"
                  variant="outlined"
                />
              </div>
              <TextField
                className="university length"
                id="outlined-basic"
                label="Stream"
                variant="outlined"
              />
            </div>
            <button> Add</button>
          </div>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="modal"
        open={open1}
        onClose={handleClose1}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open1}>
          <div className="educationModal">
            <div className="addEducation">
              <h2>Add Higher Education</h2>
              <CloseIcon onClick={handleClose1} className="close" />
            </div>
            <hr />
            <div className="universityForm">
              <TextField
                className="university length"
                id="outlined-basic"
                label="School Name"
                variant="outlined"
              />
              <div className="graduation">
                <label>Graduation status</label>
                <div className="radiobuttons3">
                  <input
                    className="radio1"
                    type="radio"
                    id="pursuing"
                    name="status"
                    value="pursuing"
                  />
                  <label for="pursuing">Pursuing</label>
                  <br />
                </div>
                <div className="radiobuttons3">
                  <input
                    className="radio1"
                    type="radio"
                    id="completed"
                    name="status"
                    value="completed"
                  />
                  <label for="completed">Completed</label>
                  <br />
                </div>
              </div>

              <label>Session</label>
              <div className="session">
                <TextField
                  className="university start"
                  id="outlined-basic"
                  label="Start"
                  variant="outlined"
                />
                <TextField
                  className="university start"
                  id="outlined-basic"
                  label="End"
                  variant="outlined"
                />
              </div>
              <div className="session">
                <TextField
                  className="university start"
                  id="outlined-basic"
                  label="Percentage(%)"
                  variant="outlined"
                />
                <TextField
                  className="university start"
                  id="outlined-basic"
                  label="Stream"
                  variant="outlined"
                />
              </div>
            </div>
            <button> Add</button>
          </div>
        </Fade>
      </Modal>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className="modal"
        open={open2}
        onClose={handleClose2}
        closeAfterTransition
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open2}>
          <div className="educationModal">
            <div className="addEducation">
              <h2>Add higher education</h2>
              <CloseIcon onClick={handleClose2} className="close" />
            </div>
            <hr />
            <div className="universityForm">
              <TextField
                className="university length"
                id="outlined-basic"
                label="School Name"
                variant="outlined"
              />
              <label>Graduation status</label>
              <div className="radiobuttons3">
                <input
                  className="radio1"
                  type="radio"
                  id="pursuing"
                  name="status"
                  value="pursuing"
                />
                <label for="pursuing">Pursuing</label>
                <br />
              </div>
              <div className="radiobuttons3">
                <input
                  className="radio1"
                  type="radio"
                  id="completed"
                  name="status"
                  value="completed"
                />
                <label for="completed">Completed</label>
                <br />
              </div>
              <label>Session</label>
              <div className="session">
                <TextField
                  className="university start"
                  id="outlined-basic"
                  label="Start"
                  variant="outlined"
                />
                <TextField
                  className="university start"
                  id="outlined-basic"
                  label="End"
                  variant="outlined"
                />
              </div>
              <TextField
                className="university length"
                id="outlined-basic"
                label="Percentage(%)"
                variant="outlined"
              />
            </div>
            <button> Add</button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default Education;
