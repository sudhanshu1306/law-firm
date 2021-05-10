import React,{useState,useEffect} from "react";
import ArticleCard from "./ArticleCard";
import "./Articles.css";
import { useHistory } from "react-router-dom";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import Fade from "@material-ui/core/Fade";
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

function Articles() {
  const [expanded, setExpanded] = React.useState(false);

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
  const [articles,getArticles]=useState([]);
  const [add,changeAdd]=useState({});
  const [login,changeLogin]=useState();
  function handleInput (event) {
    changeAdd ({
        ...add,[event.target.name]: event.target.value
    });
}
let history=useHistory();
var flag=false;


async function handleSubmit(event) {
event.preventDefault();

console.log(add);
await api.post("/article", add)
.then(function (res) {
    console.log(res.data);
    if(res.data.success){
        flag=true;
       if(flag){
        handleClose();
        window.alert("Successfully added an article");
       history.push('/articles');

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

  function mapArticle(article){
    return (
      <ArticleCard
        key={article._id}
        topicName={article.title}
        author={article.author.name}
        content={article.content}
        likes={article.likes.length}
        id={article._id}
      />
    )
  }

  useEffect(()=>{api.get("/articles")
  .then((res)=>{
    console.log(res.data);
    getArticles(res.data.articles);
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
  return (
    <div className="articles">
      <div className="articleSection-left">
        <h3>Filter your search</h3>
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
      </div>
      <div className="articleSection-right">
        <div className="articlesHeader">
          <div className="articlesHeader-left">
            <h1>Articles</h1>
            <p>It will you to understand more.</p>
          </div>
          {login&&<div className="articlesHeader-right" onClick={handleOpen}>
            <p>Add article</p>
            <AddCircleOutlineIcon className="add" />
          </div>}
        </div>
        <div className="ArticleCards">
        {articles.map((article)=> mapArticle(article))}

          {/*<ArticleCard
            topicName="React Js"
            author="Reactjs.org"
            content="React makes it painless to create interactive UIs. Design simple views for each state
              in your application, and React will efficiently update and render just the right
              components when your data changes. Declarative views make your code more predictable
              and easier to debug. Component-Based. Build encapsulated components that manage their
              own state, then compose them to make complex UIs."
            likes="5"
            buttonName="Comment"
          />
          <ArticleCard
            topicName="React Js"
            author="Reactjs.org"
            content="React makes it painless to create interactive UIs. Design simple views for each state
              in your application, and React will efficiently update and render just the right
              components when your data changes. Declarative views make your code more predictable
              and easier to debug. Component-Based. Build encapsulated components that manage their
              own state, then compose them to make complex UIs."
            likes="5"
            buttonName="Comment"
          />
          <ArticleCard
            topicName="React Js"
            author="Reactjs.org"
            content="Practical Tutorial
If you prefer to learn by doing, check out our practical tutorial. In this tutorial, we build a tic-tac-toe game in React. You might be tempted to skip it because you’re not into building games — but give it a chance. The techniques you’ll learn in the tutorial are fundamental to building any React apps, and mastering it will give you a much deeper understanding.

Step-by-Step Guide
If you prefer to learn concepts step by step, our guide to main concepts is the best place to start. Every next chapter in it builds on the knowledge introduced in the previous chapters so you won’t miss anything as you go along.

Thinking in React
Many React users credit reading Thinking in React as the moment React finally “clicked” for them. It’s probably the oldest React walkthrough but it’s still just as relevant.

Recommended Courses
Sometimes people find third-party books and video courses more helpful than the official documentation. We maintain a list of commonly recommended resources, some of which are free.

Advanced Concepts
Once you’re comfortable with the main concepts and played with React a little bit, you might be interested in more advanced topics. This section will introduce you to the powerful, but less commonly used React features like context and refs.

API Reference
This documentation section is useful when you want to learn more details about a particular React API. For example, React.Component API reference can provide you with details on how setState() works, and what different lifecycle methods are useful for.

Glossary and FAQ
The glossary contains an overview of the most common terms you’ll see in the React documentation. There is also a FAQ section dedicated to short questions and answers about common topics, including making AJAX requests, component state, and file structure.

Staying Informed
The React blog is the official source for the updates from the React team. Anything important, including release notes or deprecation notices, will be posted there first.

You can also follow the @reactjs account on Twitter, but you won’t miss anything essential if you only read the blog.

Not every React release deserves its own blog post, but you can find a detailed changelog for every release in the CHANGELOG.md file in the React repository, as well as on the Releases page.

Versioned Documentation
This documentation always reflects the latest stable version of React. Since React 16, you can find older versions of the documentation on a separate page. Note that documentation for past versions is snapshotted at the time of the release, and isn’t being continuously updated.

Something Missing?
If something is missing in the documentation or if you found some part confusing, please file an issue for the documentation repository with your suggestions for improvement, or tweet at the @reactjs account. We love hearing from you!"
            likes="5"
            buttonName="Comment"
          />*/}
        </div>
      </div>

      <div className="articleCards"></div>
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
            <p id="transition-modal-title">Title</p>
            <input type="text" placeholder="add title" name="title" onChange={handleInput} />

            <p className="content" id="transition-modal-description">
              Content
            </p>
            <textarea placeholder="type your thoughts here" name="content" id="" cols="30" rows="10" onChange={handleInput} />
            <button onClick={handleSubmit}>Add Post</button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default Articles;
