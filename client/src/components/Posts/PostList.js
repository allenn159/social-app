import React, { useState, useEffect } from "react";
import { Paper } from "@material-ui/core";
import useStyles from "./styles";
import DateFormatter from "../../utils/DateFormatter";
import { ThumbUpIcon, ThumbDownIcon, EyeIcon } from "@heroicons/react/solid";
import {
  toggleLikesAction,
  toggleDislikesAction,
} from "../../Redux/slices/posts/postSlices";
import { useDispatch } from "react-redux";

const PostList = ({ postList }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  if (!postList) return <div>Loading...</div>;

  const items = [...postList];
  items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
      {items?.map((el) => (
        <Paper key={el._id} className={classes.paper}>
          <div className={classes.postCont}>
            <h2>{el.title}</h2>
            <p>{el.description}</p>
            <time>
              <DateFormatter date={el.createdAt} />
            </time>
          </div>
          <ThumbUpIcon
            onClick={() => dispatch(toggleLikesAction({ postId: el._id }))}
            style={{ width: "25px", cursor: "pointer" }}
          />
          <p>{el.likesCounter}</p>
          <ThumbDownIcon
            onClick={() => dispatch(toggleDislikesAction({ postId: el._id }))}
            style={{ width: "25px", cursor: "pointer" }}
          />
          <p>{el.dislikesCounter}</p>
        </Paper>
      ))}
    </>
  );
};

export default PostList;
