import React, { useEffect } from "react";
import { Paper } from "@material-ui/core";
import { useParams, Redirect, Link } from "react-router-dom";
import { fetchSinglePostAction } from "../../Redux/slices/posts/postSlices";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import DateFormatter from "../../utils/DateFormatter";
import { ThumbUpIcon, ThumbDownIcon } from "@heroicons/react/solid";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  toggleLikesAction,
  toggleDislikesAction,
  deletePostAction,
} from "../../Redux/slices/posts/postSlices";
import CreateComment from "../Comments/CreateComment";
import CommentList from "../Comments/CommentList";

const PostDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { postDetails, likes, disLikes } = useSelector((state) => state?.post);
  const { post } = useSelector((state) => state);
  const { comments } = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchSinglePostAction(id));
  }, [id, dispatch, likes, disLikes, comments]);

  // Check to see if logged in user matches the creator of the post.
  // Only the original author can delete the post.
  const user = useSelector((state) => state?.users);
  const { userAuth } = user;

  const isCreatedBy = postDetails?.user?._id === userAuth?._id;

  if (post?.isDeleted)
    return <Redirect to={`/category/${postDetails?.category}`} />;

  if (post?.appErr)
    return (
      <div className={classes.detailsCont}>
        <Paper
          className={classes.detailsPaper}
          style={{ textAlign: "center", fontSize: "30px" }}
        >
          Post does not exist!
        </Paper>
      </div>
    );

  return (
    <div className={classes.detailsCont}>
      <Paper className={classes.detailsPaper}>
        <Link
          to={`/profile/${postDetails?.user?._id}`}
          style={{ textDecoration: "none", color: "black" }}
        >
          <div className={classes.imgCont}>
            <img
              className={classes.img}
              src={postDetails?.user?.profilePicture}
              alt="profile picture"
            />
            <p>{postDetails?.user?.userName}</p>
          </div>
        </Link>
        <div className={classes.titleCont}>
          <h2 className={classes.postTitle}>{postDetails?.title}</h2>
          <div className={classes.detailsBody}>{postDetails?.description}</div>
          {!isCreatedBy ? null : (
            <DeleteIcon
              onClick={() => dispatch(deletePostAction(id))}
              style={{ cursor: "pointer" }}
            />
          )}
        </div>

        <div className={classes.lowerCont}>
          <time className={classes.postDate}>
            <DateFormatter date={postDetails?.createdAt} />
          </time>
          <div className={classes.iconsCont}>
            <div className={classes.upIconCont}>
              <span>{postDetails?.likesCounter}</span>
              <ThumbUpIcon
                onClick={() =>
                  dispatch(toggleLikesAction({ postId: postDetails?._id }))
                }
                className={
                  postDetails?.likesCounter > postDetails?.dislikesCounter
                    ? classes.positive
                    : classes.upIcon
                }
              />
            </div>

            <div className={classes.downIconCont}>
              <span>{postDetails?.dislikesCounter}</span>

              <ThumbDownIcon
                onClick={() =>
                  dispatch(toggleDislikesAction({ postId: postDetails?._id }))
                }
                className={
                  postDetails?.dislikesCounter > postDetails?.likesCounter
                    ? classes.negative
                    : classes.downIcon
                }
              />
            </div>
          </div>
        </div>
      </Paper>
      <CreateComment postId={postDetails?._id} />
      <CommentList comments={postDetails?.comments} />
    </div>
  );
};

export default PostDetails;
