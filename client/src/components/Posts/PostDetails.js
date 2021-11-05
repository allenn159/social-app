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
  }, [id, dispatch, postDetails]);

  return (
    <div className={classes.detailsCont}>
      <Paper className={classes.detailsPaper}>
        <div className={classes.titleCont}>
          <h2 className={classes.postTitle}>{postDetails?.title}</h2>
          <div className={classes.detailsBody}>{postDetails?.description}</div>
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
    </div>
  );
};

export default PostDetails;
