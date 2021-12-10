import React, { useEffect } from "react";
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

const CommentList = ({ postId }) => {
  const user = useSelector((state) => state.users);
  const { fetchedComments, comments } = useSelector((state) => state?.comments);
  const { userAuth } = user;
  const isLoginUser = userAuth?._id;
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchCommentsAction(postId));
  }, [comments]);

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

  return (
    <>
      {fetchedComments?.map((el) => (
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
    </>
  );
};

export default CommentList;
