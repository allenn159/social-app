import React from "react";
import { Paper } from "@material-ui/core";
import useStyles from "./styles";
import DateFormatter from "../../utils/DateFormatter";
import { ThumbUpIcon, ThumbDownIcon } from "@heroicons/react/solid";
import {
  toggleLikesAction,
  toggleDislikesAction,
} from "../../Redux/slices/posts/postSlices";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const PostList = ({ postList }) => {
  const dispatch = useDispatch();
  const classes = useStyles();

  if (!postList) return <div>Loading...</div>;

  const items = [...postList];
  items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <>
      {items?.map((el) => (
        <Paper
          component={Link}
          to={`/posts/${el._id}`}
          key={el._id}
          className={classes.paper}
        >
          <div className={classes.titleCont}>
            <h2 className={classes.postTitle}>{el.title}</h2>
            <div className={classes.postBody}>{el.description}</div>
          </div>

          <div
            onClick={(e) => e.preventDefault()}
            className={classes.lowerCont}
          >
            <time className={classes.postDate}>
              <DateFormatter date={el.createdAt} />
            </time>
            <div className={classes.iconsCont}>
              <div className={classes.upIconCont}>
                <span>{el.likesCounter}</span>
                <ThumbUpIcon
                  onClick={() =>
                    dispatch(toggleLikesAction({ postId: el._id }))
                  }
                  className={
                    el.likesCounter > el.dislikesCounter
                      ? classes.positive
                      : classes.upIcon
                  }
                />
              </div>

              <div className={classes.downIconCont}>
                <span>{el.dislikesCounter}</span>

                <ThumbDownIcon
                  onClick={() =>
                    dispatch(toggleDislikesAction({ postId: el._id }))
                  }
                  className={
                    el.dislikesCounter > el.likesCounter
                      ? classes.negative
                      : classes.downIcon
                  }
                />
              </div>
            </div>
          </div>
        </Paper>
      ))}
    </>
  );
};

export default PostList;
