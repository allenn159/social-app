import React from "react";
import { Paper } from "@material-ui/core";
import useStyles from "./styles";
import Moment from "react-moment";
import { deleteCommentAction } from "../../Redux/slices/comments/commentSlices";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CommentList = ({ comments }) => {
  const user = useSelector((state) => state.users);
  const { userAuth } = user;
  const isLoginUser = userAuth?._id;
  const dispatch = useDispatch();
  const classes = useStyles();

  if (!comments) return <div>Loading...</div>;

  const items = [...comments];
  items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
      {items?.map((el) => (
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
              <p>{el.user.userName}</p>
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
