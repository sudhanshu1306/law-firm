import React from "react";
import "./ArticleApproveCard.css";
import Modal from "@material-ui/core/Modal";
import CloseIcon from "@material-ui/icons/Close";
import Fade from "@material-ui/core/Fade";

function ArticleApproveCard({ topicName, author, content, likes }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="articleApproveCard">
      <div className="articleHeader">
        <h3>{topicName}</h3>
        <p>By: {author}</p>
      </div>
      <div className="articleContent">
        <p>{content}</p>
      </div>

      <a href="#aboutus" onClick={handleOpen} className="readMore">
        Read More +
      </a>

      <hr />
      <div className="articleComments">
        <button>Reject</button>

        <button>Approve</button>
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
          </div>
        </Fade>
      </Modal>
    </div>
  );
}

export default ArticleApproveCard;
