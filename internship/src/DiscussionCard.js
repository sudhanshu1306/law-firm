import React from "react";
import "./DiscussionCard.css";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import Fade from "@material-ui/core/Fade";
import Avatar from "@material-ui/core/Avatar";

function DiscussionCard({ topicName, author, content, likes, buttonName, questionimage }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="discussionCard">
      <div className="discussionCardHeader">
        <h3>{topicName}</h3>
        <p>By: {author}</p>
      </div>
      <img src={questionimage} alt="topicImage" />
      <div className="discussionCardContent">
        <p>{content}</p>
      </div>

      <a href="#aboutus" onClick={handleOpen} className="readMore">
        Read More +
      </a>

      <hr />
      <div className="discussionCardComments">
        <p>
          <FavoriteBorderOutlinedIcon className="heart" />
          {likes} likes
        </p>
        <div className="commentSection">
          <input type="text" placeholder="What you think about the article?" />
          <button>{buttonName}</button>
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
            <img src={questionimage} alt="topicImage" />
            <p className="content" id="transition-modal-description">
              {content}
            </p>

            <div className="discussionCardComments">
              <p>
                <FavoriteBorderOutlinedIcon className="heart" />
                {likes} likes
              </p>
              <div className="commentSection">
                <input type="text" placeholder="What you think about the article?" />
                <button>Comment</button>
              </div>
            </div>
            <h3>Other Comments</h3>
            <div className="modalComment-section">
              <div className="singleComment">
                <div className="singleComment-top">
                  <Avatar
                    className="avatar"
                    alt="Travis Howard"
                    src="/static/images/avatar/2.jpg"
                  />
                  <p>Here replies will add up.</p>
                </div>
                <div className="singleComment-bottom">
                  <p>
                    <FavoriteBorderOutlinedIcon className="heart" />
                    {likes} likes
                  </p>
                  <div className="commentSection">
                    <input type="text" placeholder="What you think about the article?" />
                    <button>Reply</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default DiscussionCard;
