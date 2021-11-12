import React, { useEffect } from "react";
import { Paper } from "@material-ui/core";
import useStyles from "./styles";
import Moment from "react-moment";

const CommentList = ({ comments }) => {
  const classes = useStyles();
  return (
    <>
      {comments?.map((el) => (
        <Paper className={classes.commentPaper} key={el._id}>
          <div className={classes.imgCont}>
            <img className={classes.img} src={el.user.profilePicture} />
            <p>{el.user.firstName}</p>
          </div>
          <p>{el.description}</p>
          <div className={classes.timeStampCont}>
            <Moment className={classes.timeStamp} fromNow ago>
              {el.createdAt}
            </Moment>
            <p>ago</p>
          </div>
          {console.log(el)}
        </Paper>
      ))}
    </>
  );
};

export default CommentList;
