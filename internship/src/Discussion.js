import React,{useState,useEffect} from "react";
import "./Discussion.css";
import { useHistory } from "react-router-dom";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import Fade from "@material-ui/core/Fade";
import DiscussionCard from "./DiscussionCard";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import axios from "axios";


const api=axios.create({
    withCredentials: true,
    baseURL:process.env.REACT_APP_ROUTE
  });


function Discussion() {
  const [expanded, setExpanded] = React.useState(false);
  const [questions,getQuestions]=useState([]);
  const [url,setUrl]=useState();
    const [login,changeLogin]=useState();
  function mapQuestion(question){
    return (
      <DiscussionCard
        key={question._id}
        questionimage={url+question.pics[0]}
        topicName={question.title}
        author={question.author.name}
        content={question.content}
        likes={question.likes.length}
        buttonName="Answer"
        id={question._id}
      />
    )
  }
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  useEffect(()=>{api.get("/getQuestion")
  .then((res)=>{
    console.log(res.data);
    getQuestions(res.data.questions);
    setUrl(res.data.url);
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

  async function handleSubmit(event) {
  event.preventDefault();
  let myForm=document.getElementById('myForm');
      var formData=new FormData(myForm);
  const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    };
  await api.post("/postQuestion",formData,config)
  .then(function (res) {
      console.log(res.data);
      if(res.data.success){
          flag=true;
         if(flag){
          handleClose();
          window.alert("Successfully added a question");
         history.push('/discussion');

       }
         else{
          window.alert(res.data.message);
         history.push('/discussion');
       }
      }
    })
    .catch(function (error) {

       window.alert("Please login");
       history.push('/login');

    });


  }
  return (
    <div className="discussion">
      <div className="discussionSection-left">
        <h3>Filter your search</h3>

        <Accordion expanded={expanded === "panel1"} onChange={handleChange("panel1")}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography>Job Types</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="checkBox">
              <div className="checkItems">
                <input type="checkbox" />
                <label className="labels" htmlFor="">
                  Part-time training
                </label>
              </div>
              <div className="checkItems">
                <input type="checkbox" />
                <label className="labels" htmlFor="">
                  Full-time training
                </label>
              </div>
              <div className="checkItems">
                <input type="checkbox" />
                <label className="labels" htmlFor="">
                  Volunteering
                </label>
              </div>
              <div className="checkItems">
                <input type="checkbox" />
                <label className="labels" htmlFor="">
                  Temporary
                </label>
              </div>
              <div className="checkItems">
                <input type="checkbox" />
                <label className="labels" htmlFor="">
                  Degree placement
                </label>
              </div>
              <div className="checkItems">
                <input type="checkbox" />
                <label className="labels" htmlFor="">
                  Paralegal work
                </label>
              </div>
              <div className="checkItems">
                <input type="checkbox" />
                <label className="labels" htmlFor="">
                  Remote / online
                </label>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === "panel2"} onChange={handleChange("panel2")}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography>Organization type</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="checkBox">
              <div className="checkItems">
                <input type="checkbox" />
                <label className="labels" htmlFor="">
                  Corporate law firm
                </label>
              </div>
              <div className="checkItems">
                <input type="checkbox" />
                <label className="labels" htmlFor="">
                  Specialist law firm
                </label>
              </div>
              <div className="checkItems">
                <input type="checkbox" />
                <label className="labels" htmlFor="">
                  Small or medium size law firm
                </label>
              </div>
              <div className="checkItems">
                <input type="checkbox" />
                <label className="labels" htmlFor="">
                  Top UK Law firm
                </label>
              </div>
              <div className="checkItems">
                <input type="checkbox" />
                <label className="labels" htmlFor="">
                  Legal advice clinic
                </label>
              </div>
              <div className="checkItems">
                <input type="checkbox" />
                <label className="labels" htmlFor="">
                  Government
                </label>
              </div>
              <div className="checkItems">
                <input type="checkbox" />
                <label className="labels" htmlFor="">
                  Industry / In-house legal department
                </label>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === "panel4"} onChange={handleChange("panel4")}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel4bh-content"
            id="panel4bh-header"
          >
            <Typography>Areas of law</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="checkBox">
              <div className="checkItems">
                <input type="checkbox" />
                <label className="labels" htmlFor="">
                  Business and commercial affairs
                </label>
              </div>
              <div className="checkItems">
                <input type="checkbox" />
                <label className="labels" htmlFor="">
                  Dispute resolution/Civil litigation
                </label>
              </div>
              <div className="checkItems">
                <input type="checkbox" />
                <label className="labels" htmlFor="">
                  Commercial property
                </label>
              </div>
              <div className="checkItems">
                <input type="checkbox" />
                <label className="labels" htmlFor="">
                  Employment law
                </label>
              </div>
              <div className="checkItems">
                <input type="checkbox" />
                <label className="labels" htmlFor="">
                  Probate, wills and trusts
                </label>
              </div>
              <div className="checkItems">
                <input type="checkbox" />
                <label className="labels" htmlFor="">
                  Residential conveyancing
                </label>
              </div>
              <div className="checkItems">
                <input type="checkbox" />
                <label className="labels" htmlFor="">
                  Family law
                </label>
              </div>
              <div className="checkItems">
                <input type="checkbox" />
                <label className="labels" htmlFor="">
                  Personal injury, accident, medical negligence
                </label>
              </div>
              <div className="checkItems">
                <input type="checkbox" />
                <label className="labels" htmlFor="">
                  Pensions/insurance/tax/financial Regulation / compliance / governance
                </label>
              </div>
              <div className="checkItems">
                <input type="checkbox" />
                <label className="labels" htmlFor="">
                  Consumer problems / Consumer Rights
                </label>
              </div>
              <div className="checkItems">
                <input type="checkbox" />
                <label className="labels" htmlFor="">
                  Personal bankruptcy, personal insolvency
                </label>
              </div>
              <div className="checkItems">
                <input type="checkbox" />
                <label className="labels" htmlFor="">
                  Immigration
                </label>
              </div>
              <div className="checkItems">
                <input type="checkbox" />
                <label className="labels" htmlFor="">
                  Welfare benefits and social security rights
                </label>
              </div>
              <div className="checkItems">
                <input type="checkbox" />
                <label className="labels" htmlFor="">
                  Charity
                </label>
              </div>
              <div className="checkItems">
                <input type="checkbox" />
                <label className="labels" htmlFor="">
                  Intellectual property
                </label>
              </div>
              <div className="checkItems">
                <input type="checkbox" />
                <label className="labels" htmlFor="">
                  Procurement/contract law
                </label>
              </div>
              <div className="checkItems">
                <input type="checkbox" />
                <label className="labels" htmlFor="">
                  Public law
                </label>
              </div>
              <div className="checkItems">
                <input type="checkbox" />
                <label className="labels" htmlFor="">
                  Human rights and equality legislation
                </label>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="discussionSection-right">
        <div className="discussionHeader">
          <div className="discussionHeader-left">
            <h1>Discussion Forum</h1>
            <p>It will you to understand more.</p>
          </div>
          {login&&<div className="discussionHeader-right" onClick={handleOpen}>
            <p>Add post</p>
            <AddCircleOutlineIcon className="add" />
          </div>}
        </div>
        <div className="discussionCards">
        {questions.map((question)=> mapQuestion(question))}
          
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
          <div className="paperArticle">
            <div className="paperArticleHeader">
              <h2>Add Article</h2>

              <CloseIcon onClick={handleClose} className="close" />
            </div>
            <hr />
            <form className="formModal" id="myForm">
            <p id="transition-modal-title">Title</p>
            <input type="text" name="title" placeholder="add title" />

            <p className="content1" name="content" id="transition-modal-description">
              Content
            </p>
            <textarea placeholder="type your thoughts here" name="content" id="" cols="30" rows="10" />
            <p id="transition-modal-title">Tags</p>
            <input type="text" name="tags" placeholder="add tags" />
            <label for="picture">Topic Image</label>
            <input className="inputfile"  type="file" id="files" name="pics" enctype="multipart/form-data" multiple />
            <button onClick={handleSubmit}>Add Post</button>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default Discussion;
