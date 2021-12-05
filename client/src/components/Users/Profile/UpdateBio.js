import React, { useState } from "react";
import { Container, Paper, Grid, TextField, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import useStyles from "./styles";
import { updateBioAction } from "../../../Redux/slices/users/usersSlices";

const UpdateBio = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isSubmitted, userAuth } = useSelector((state) => state?.users);
  const [post, setPost] = useState({
    biography: "",
  });

  const onHandleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateBioAction(post));
  };

  if (isSubmitted) return <Redirect to={`/profile/${userAuth?._id}`} />;

  return (
    <Container maxWidth="md">
      <Paper className={classes.formPaper}>
        <Grid container>
          <Grid className={classes.gridCont} item xs={12}>
            <h1 className={classes.formHeader}>Update Bio</h1>
            <form className={classes.formCont} onSubmit={onHandleSubmit}>
              <TextField
                className={classes.formBody}
                value={post.biography}
                onChange={(e) => setPost({ biography: e.target.value })}
                required
                variant="outlined"
                label="Body"
                multiline
                minRows={15}
              />
              <Button
                className={classes.formBtn}
                type="submit"
                variant="contained"
              >
                Update
              </Button>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default UpdateBio;
