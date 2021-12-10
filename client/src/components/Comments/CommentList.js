import React, { useState, useEffect } from "react";
import { Paper } from "@material-ui/core";
import useStyles from "./styles";
import Moment from "react-moment";
import {
  fetchCommentsAction,
  deleteCommentAction,
  reset,
} from "../../Redux/slices/comments/commentSlices";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

const CommentList = ({ postId }) => {
  const [offSet, setOffSet] = useState(0);
  const [commentsList, setCommentsList] = useState([]);
  const user = useSelector((state) => state.users);
  const { fetchedComments, comments, commentDeleted } = useSelector(
    (state) => state?.comments
  );
  const { userAuth } = user;
  const isLoginUser = userAuth?._id;
  const dispatch = useDispatch();
  const classes = useStyles();
  const commentsData = fetchedComments?.docs;

  const payload = {
    postId: postId,
    offSet: offSet,
  };

  const handleUpdateComments = () => setOffSet((prev) => prev + 10);

  useEffect(() => {
    dispatch(fetchCommentsAction(payload));
  }, [comments, commentDeleted]);

  useEffect(() => {
    if (commentsData) {
      setCommentsList((prev) => [...prev, ...commentsData]);
    }
    return () => {
      setCommentsList([]);
    };
  }, [commentsData]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

  return (
    <InfiniteScroll
      className={classes.outerCont}
      dataLength={commentsList.length}
    >
      {commentsList.map((el) => (
        <Paper className={classes.commentPaper} key={el._id}>
          <Link
            to={`/profile/${el.user._id}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <div className={classes.imgCont}>
              <img
                className={classes.img}
                src={el.user.profilePicture}
                alt="profile"
              />
              <p className={classes.userName}>{el.user.userName}</p>
            </div>
          </Link>
          <p style={{ whiteSpace: "pre-line" }}>{el.description}</p>
          {isLoginUser === el.user._id ? (
            <DeleteIcon
              className={classes.deleteIcon}
              onClick={() => dispatch(deleteCommentAction(el._id))}
            />
          ) : null}

          <div className={classes.timeStampCont}>
            <Moment className={classes.timeStamp} fromNow ago>
              {el.createdAt}
            </Moment>
            <p>ago</p>
          </div>
        </Paper>
      ))}
    </InfiniteScroll>
  );
};

export default CommentList;
