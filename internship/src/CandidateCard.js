import React from "react";
import "./CandidateCard.css";
import { useHistory } from "react-router-dom";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import Fade from "@material-ui/core/Fade";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";


const api=axios.create({
  withCredentials: true,
  baseURL:process.env.REACT_APP_ROUTE,
  validateStatus: () => true
});

function CandidateCard(props) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function handleAccept(event){
    event.preventDefault();
    api.post("/acceptApplied",{id:props.jobId,user:props.id,btn:1})
    .then((res)=>{
      if(res.data.success){
        window.alert("Successfull accepted candidate");
        window.location.reload();
      }
    })
    .catch(err=>{
      window.alert("Some error occured");
      window.location.reload();
    })
   }
   function handleReject(event){
    event.preventDefault();
    api.post("/acceptApplied",{id:props.jobId,user:props.id,btn:0})
    .then((res)=>{
      if(res.data.success){
        window.alert("Successfull rejected candidate");
        window.location.reload();
      }
    })
    .catch(err=>{
      window.alert("Some error occured");
      window.location.reload();
    })
   }
  return (
    <div className="candidateCard">
      <div className="candidateCard-left">
        <h3>
        <Avatar className="avatar" alt={props.name} src={props.image} />
        {props.name}
        </h3>
        <p>
          <span>Applied for:</span>{props.title}
        </p>
        <p>
          <span>Occupation:</span> Student
        </p>
      </div>
      <div className="candidateCard-middle">
        <ul>
          <li>
            Functioning knowledge <span>2/3</span>
          </li>
          <li>
            Standard of work<span>2/3</span>
          </li>
          <li>
            Autonomy<span>2/3</span>
          </li>
          <li>
            Complexity<span>2/3</span>
          </li>
          <li>
            Perception of context<span>2/3</span>
          </li>
          <li>
            Innovation and originality<span>2/3</span>
          </li>
        </ul>
      </div>
      <div className="candidateCard-right">
        <button onClick={handleReject}>Reject</button>
        <button onClick={handleOpen}>View details</button>
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
          <div className="paper">
            <div className="paperHeader">
              <h2 id="transition-modal-title">{props.name}</h2>

              <CloseIcon onClick={handleClose} className="close" />
            </div>
            <hr />
            <div className="detailsContent">
              <div className="detailsContent-left">
                <h3>
                  <span>Occupation:</span> Student
                </h3>
                <div className="qualifications">
                  <h3>Educational Qualifications</h3>
                  <ul>
                    <li>
                      Secondary Educations: DPS <span>%:87</span>
                    </li>
                    <li>
                      Higher Secondary: DPS<span>%:87</span>
                    </li>
                    <li>
                      Graduation: B.Tech <span>%:87</span>
                    </li>
                  </ul>
                </div>
                <h5>
                  <span>Experience:</span> 5 years
                </h5>
                <div className="certificates">
                  <h3>Certificates</h3>
                  <ul>
                  <li> <a style={{textDecoration:"none",color:"black"}} href="https://www.braincert.com/images/easyblog_articles/204/certificate-2018-08-19-09-28-05_pdf.jpg" target="_blank">Certificate 1</a> </li>
                    <li> <a style={{textDecoration:"none",color:"black"}} href="https://www.braincert.com/images/easyblog_articles/204/certificate-2018-08-19-09-28-05_pdf.jpg" target="_blank">Certificate 2</a></li>
                    <li> <a style={{textDecoration:"none",color:"black"}} href="https://www.braincert.com/images/easyblog_articles/204/certificate-2018-08-19-09-28-05_pdf.jpg" target="_blank">Certificate 3</a></li>
                    <li> <a style={{textDecoration:"none",color:"black"}} href="https://www.braincert.com/images/easyblog_articles/204/certificate-2018-08-19-09-28-05_pdf.jpg" target="_blank">Certificate 4</a></li>
                  </ul>
                </div>
              </div>
              <div className="detailsContent-right">
                <div className="area">
                  <h3>
                    <span>Location:</span>xyz
                  </h3>
                </div>
                <h3>Skills</h3>
                <ul>
                  <li>
                    Functioning knowledge <span>2/3</span>
                  </li>
                  <li>
                    Standard of work<span>2/3</span>
                  </li>
                  <li>
                    Autonomy<span>2/3</span>
                  </li>
                  <li>
                    Complexity<span>2/3</span>
                  </li>
                  <li>
                    Perception of context<span>2/3</span>
                  </li>
                  <li>
                    Innovation and originality<span>2/3</span>
                  </li>
                </ul>
              </div>
            </div>

            <button onClick={handleAccept}>Accept Candidate</button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default CandidateCard;
