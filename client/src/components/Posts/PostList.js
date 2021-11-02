import React from "react";
import { Paper, Button } from "@material-ui/core";
import useStyles from "./styles";
import DateFormatter from "../../utils/DateFormatter";
import { ThumbUpIcon, ThumbDownIcon, EyeIcon } from "@heroicons/react/solid";
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
            <p className={classes.postBody}>{el.description}</p>
            <time className={classes.postDate}>
              <DateFormatter date={el.createdAt} />
            </time>
          </div>

          <div className={classes.iconsCont}>
            <div className={classes.iconsDiv}>
              <ThumbUpIcon
                onClick={() => dispatch(toggleLikesAction({ postId: el._id }))}
                className={classes.icons}
              />
              <span>{el.likesCounter}</span>
            </div>
            <div className={classes.iconsDiv}>
              <ThumbDownIcon
                onClick={() =>
                  dispatch(toggleDislikesAction({ postId: el._id }))
                }
                className={classes.icons}
              />
              <span>{el.dislikesCounter}</span>
            </div>
          </div>
        </Paper>
      ))}
    </>
  );
};

export default PostList;
