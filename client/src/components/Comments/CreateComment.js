import React, { useState, useEffect } from "react";
import { Paper, TextField, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles";

const CreateComment = ({ postId }) => {
  const classes = useStyles();
  const [comment, setComment] = useState({
    postId: postId,
    description: "",
  });

  useEffect(() => {
    setComment({ ...comment, postId: postId });
  }, [postId]);

  return (
    <Paper className={classes.paper}>
      <TextField
        value={comment.description}
        onChange={(e) =>
          setComment({ ...comment, description: e.target.value })
        }
        className={classes.inputField}
        variant="outlined"
        minRows={6}
        multiline
        placeholder="Comment..."
      />
      <Button className={classes.button} variant="contained">
        Submit Comment
      </Button>
    </Paper>
  );
};

export default CreateComment;
