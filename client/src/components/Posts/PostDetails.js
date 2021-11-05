import React, { useEffect } from "react";
import { Paper } from "@material-ui/core";
import { useParams } from "react-router";
import { fetchSinglePostAction } from "../../Redux/slices/posts/postSlices";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";
import DateFormatter from "../../utils/DateFormatter";
import { ThumbUpIcon, ThumbDownIcon } from "@heroicons/react/solid";
import {
  toggleLikesAction,
  toggleDislikesAction,
} from "../../Redux/slices/posts/postSlices";

const PostDetails = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { postDetails } = useSelector((state) => state?.post);

  useEffect(() => {
    dispatch(fetchSinglePostAction(id));
  }, [id, dispatch, toggleLikesAction(), toggleDislikesAction()]);

  return (
    <div className={classes.detailsCont}>
      <Paper className={classes.detailsPaper}>
        <div className={classes.titleCont}>
          <h2 className={classes.postTitle}>{postDetails?.title}</h2>
          <div className={classes.detailsBody}>{postDetails?.description}</div>
          <time className={classes.postDate}>
            <DateFormatter date={postDetails?.createdAt} />
          </time>
        </div>

        <div onClick={(e) => e.preventDefault()} className={classes.iconsCont}>
          <div className={classes.upDiv}>
            <span>{postDetails?.likesCounter}</span>

            <ThumbUpIcon
              onClick={() =>
                dispatch(toggleLikesAction({ postId: postDetails?._id }))
              }
              className={classes.upIcon}
            />
          </div>
          <div className={classes.downDiv}>
            <span>{postDetails?.dislikesCounter}</span>

            <ThumbDownIcon
              onClick={() =>
                dispatch(toggleDislikesAction({ postId: postDetails?._id }))
              }
              className={classes.downIcon}
            />
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default PostDetails;
