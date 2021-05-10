import React from "react";
import "./Skills.css";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import AddOutlinedIcon from "@material-ui/icons/AddOutlined";
import { Link } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
function Skills() {
  const ratings = [
    {
      value: "0",
      label: "0",
    },
    {
      value: "1",
      label: "1",
    },
    {
      value: "2",
      label: "2",
    },
    {
      value: "3",
      label: "3",
    },
  ];
  const skillNames = [
    {
      value: " ",
      label: " ",
    },
    {
      value: "Functioning knowledge",
      label: "Functioning knowledge",
    },
    {
      value: "Standard of work",
      label: "Standard of work",
    },
    {
      value: "Autonomy",
      label: "Autonomy",
    },
    {
      value: "Complexity",
      label: "Complexity",
    },
    {
      value: "Perception of context",
      label: "Perception of context",
    },
    {
      value: "Innovation and originality",
      label: "Innovation and originality",
    },
  ];
  const [rating, setRating] = React.useState("EUR");
  const [skillName, setskillName] = React.useState("EUR");
  const handleChange = event => {
    setRating(event.target.value);
  };
  const handleChange1 = event => {
    setskillName(event.target.value);
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="skills">
      <div className="educationHeader">
        <Link className="link6" to="/">
          <h1 className="link5">QWE</h1>
        </Link>
      </div>
      <div className="skillsHeader">
        <h1>Skills</h1>
        <button onClick={handleOpen}>
          <AddOutlinedIcon />
          Add Skill
        </button>
      </div>

      <div className="allSkills">
        <div className="skillCard">
          <div className="skillCard-header">
            <h1>Functioning knowledge</h1>
            <DeleteOutlineOutlinedIcon className="deletes" />
          </div>

          <div className="skillCard-details">
            <div className="skillSection-CardLeft">
              <p className="ptag">Experience: 2 years</p>
            </div>
            <div className="skillSection-CardRight">
              <p className="ptag">Rating:3/5</p>
            </div>
          </div>
          <button>View Certificate</button>
        </div>
        <div className="skillCard">
          <div className="skillCard-header">
            <h1>Autonomy</h1>
            <DeleteOutlineOutlinedIcon className="deletes" />
          </div>

          <div className="skillCard-details">
            <div className="skillSection-CardLeft">
              <p className="ptag">Experience: 2 years</p>
            </div>
            <div className="skillSection-CardRight">
              <p className="ptag">Rating:3/5</p>
            </div>
          </div>
          <button>View Certificate</button>
        </div>
        <div className="skillCard">
          <div className="skillCard-header">
            <h1>Skill Name</h1>
            <DeleteOutlineOutlinedIcon className="deletes" />
          </div>

          <div className="skillCard-details">
            <div className="skillSection-CardLeft">
              <p className="ptag">Experience: 2 years</p>
            </div>
            <div className="skillSection-CardRight">
              <p className="ptag">Rating:3/5</p>
            </div>
          </div>
          <button>View Certificate</button>
        </div>
        <div className="skillCard">
          <div className="skillCard-header">
            <h1>Perception of context</h1>
            <DeleteOutlineOutlinedIcon className="deletes" />
          </div>

          <div className="skillCard-details">
            <div className="skillSection-CardLeft">
              <p className="ptag">Experience: 2 years</p>
            </div>
            <div className="skillSection-CardRight">
              <p className="ptag">Rating:3/5</p>
            </div>
          </div>
          <button>View Certificate</button>
        </div>
        <div className="skillCard">
          <div className="skillCard-header">
            <h1>Innovation and originality</h1>
            <DeleteOutlineOutlinedIcon className="deletes" />
          </div>

          <div className="skillCard-details">
            <div className="skillSection-CardLeft">
              <p className="ptag">Experience: 2 years</p>
            </div>
            <div className="skillSection-CardRight">
              <p className="ptag">Rating:3/5</p>
            </div>
          </div>
          <button>View Certificate</button>
        </div>
        <div className="skillCard">
          <div className="skillCard-header">
            <h1>Complexity</h1>
            <DeleteOutlineOutlinedIcon className="deletes" />
          </div>

          <div className="skillCard-details">
            <div className="skillSection-CardLeft">
              <p className="ptag">Experience: 2 years</p>
            </div>
            <div className="skillSection-CardRight">
              <p className="ptag">Rating:3/5</p>
            </div>
          </div>
          <button>View Certificate</button>
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
          <div className="paperSkills">
            <div className="paperSkillsHeader">
              <h2>Add Skills</h2>

              <CloseIcon onClick={handleClose} className="close" />
            </div>
            <hr />
            <div className="skillDetails">
              <TextField
                className="university length"
                id="outlined-basic"
                variant="outlined"
                select
                label="Add skill"
                value={skillName}
                onChange={handleChange1}
                SelectProps={{
                  native: true,
                }}
              >
                {skillNames.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
              <TextField
                className="university length"
                id="outlined-basic"
                label="Experience in years "
                variant="outlined"
              />

              <TextField
                className="university length"
                id="outlined-basic"
                label=" "
                variant="outlined"
                type="file"
              />
              <TextField
                className="university length"
                id="outlined-basic"
                variant="outlined"
                select
                label="Rate your skill"
                value={rating}
                onChange={handleChange}
                SelectProps={{
                  native: true,
                }}
              >
                {ratings.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </div>

            <button>Add skill</button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default Skills;
