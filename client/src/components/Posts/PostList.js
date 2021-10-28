import React from "react";
import { Paper } from "@material-ui/core";
import useStyles from "./styles";
import DateFormatter from "../../utils/DateFormatter";

const PostList = ({ postList }) => {
  const classes = useStyles();

  if (!postList) return <div>Loading...</div>;

  const items = [...postList];

  console.log(
    items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  );
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
        </Paper>
      ))}
    </>
  );
};

export default PostList;
