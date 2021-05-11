import React,{useState,useEffect} from "react";
import "./ArticleCard.css";
import { Link,useHistory } from "react-router-dom";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import Fade from "@material-ui/core/Fade";
import Avatar from "@material-ui/core/Avatar";
import axios from "axios";


const api=axios.create({
    withCredentials: true,
    baseURL:process.env.REACT_APP_ROUTE
  });

function ArticleCard({ topicName, author, content, likes, buttonName,id }) {
  const [open, setOpen] = React.useState(false);
  const [like,changeLike]= useState(likes);
  const [currArticle,changeCurrArticle]=useState([]);
  const [articleLike,changeArticleLike]=useState([]);
  const [comments,changeComments]=useState([]);
  const [url,changeUrl]=useState([]);
  const [add,changeAdd]=useState({articleId: id});
  function handleChange (event) {
    changeAdd ({
        ...add,[event.target.name]: event.target.value
    });
  }
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  let history=useHistory();
var flag=false;

  var article={
    articleId:id
  }
  async function likeArticle(event) {
    event.preventDefault();

    await api.post("/likeArticle", article)
    .then(function (res) {
        console.log(res.data);
        if(res.data.success){
            flag=true;
           if(flag){
            window.alert("You liked this article");
            changeLike(like+1);
           history.push('/articles');}
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
  async function commentArticle(event){

    //console.log(add);
    await api.post("/postComment", add)
    .then(function (res) {
        console.log(res.data);
        if(res.data.success){
            flag=true;
            changeAdd({});
           if(flag){
            window.alert("You commented on this article");
           window.location.reload()}
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
  function mapComment(comment){
    console.log(comment.content)
    return (
      <>
      <div className="modalComment-section">
        <div className="singleComment">
          <div className="singleComment-top">
            <Avatar
              className="avatar"
              alt={comment.author&&comment.author.name}
              src={comment.author&& (url+comment.author.profileImage)}
            />
            <p>{comment.content}</p>
          </div>
          <div className="singleComment-bottom">
            <p>
              <FavoriteBorderOutlinedIcon className="heart" />
              {comment.likes&&comment.likes.length} likes
            </p>
            <div className="commentSection">
              <input type="text" placeholder="What you think about the article?" />
              <button>Reply</button>
            </div>
          </div>
        </div>
      </div>
      </>
    )
  }
  async function getComment() {


    await api.post("/getComment", article)
    .then(function (res) {
        console.log(res.data);
        if(res.data.success){
            flag=true;
           if(flag){
            changeCurrArticle(res.data.article);
            changeArticleLike(res.data.articleLike);
            changeComments(res.data.comments);
            changeUrl(res.data.url);
           history.push('/articles');}
           else{
            window.alert("Some error occured");
           history.push('/articles');}
        }
      })
      .catch(function (error) {

         window.alert("Some error occured");
         history.push('/article');
      });


  }
 useEffect(getComment,[]);
  return (
    <div className="articleCard">
      <div className="articleHeader">
        <h3>{topicName}</h3>
        <p>By: {author}</p>
      </div>
      <div className="articleContent">
        <p>{content}</p>
      </div>

      <a onClick={handleOpen} className="readMore">
        Read More +
      </a>

      <hr />
      <div className="articleComments">
      <p>
          <FavoriteBorderOutlinedIcon onClick={likeArticle} className="heart" />
          {like} likes
        </p>
        <div className="commentSection">
          <input type="text"  name="content" onChange={handleChange}  placeholder="What you think about the article?" />
          <button onClick={commentArticle}>Comment</button>
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
          <div className="paper">
            <div className="paperHeader">
              <h2 id="transition-modal-title">{topicName}</h2>
              <p>By: {author}</p>
              <CloseIcon onClick={handleClose} className="close" />
            </div>
            <hr />
            <p className="content" id="transition-modal-description">
              {content}
            </p>

            <div className="articleComments">
            <p>
          <FavoriteBorderOutlinedIcon onClick={likeArticle} className="heart" />
          {like} likes
             </p>
              <div className="commentSection">
                <input type="text"  name="content" onChange={handleChange}  placeholder="What you think about the article?" />
                <button onClick={commentArticle}>Comment</button>
              </div>
            </div>
            <h3>Other Comments</h3>
            {comments.map(comment=> mapComment(comment))}
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default ArticleCard;
