import React, { useState, useEffect } from "react";
import { Paper, TextField, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import useStyles from "./styles";
import { createCommentAction } from "../../Redux/slices/comments/commentSlices";

const CreateComment = ({ postId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [comment, setComment] = useState({
    postId: postId,
    description: "",
  });

  useEffect(() => {
    setComment({ ...comment, postId: postId });
  }, [postId]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(createCommentAction(comment));
    setComment({ ...comment, description: "" });
  };

  return (
    <Paper className={classes.paper}>
      <form>
        <TextField
          value={comment.description}
          onChange={(e) =>
            setComment({ ...comment, description: e.target.value })
          }
          className={classes.inputField}
          variant="outlined"
          minRows={4}
          multiline
          placeholder="Comment..."
          required
        />
        <Button
          onClick={onSubmit}
          type="submit"
          className={classes.button}
          variant="contained"
        >
          Submit Comment
        </Button>
      </form>
    </Paper>
  );
};

export default CreateComment;
