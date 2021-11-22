import React, { useState, useEffect } from "react";
import { Container, Paper, Grid, TextField, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import useStyles from "./styles";


const UpdateBio = () => {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isSubmitted } = useSelector((state) => state.post);
  const { category } = useSelector((state) => state.categories);
  const [post, setPost] = useState({
    biography: "",
  });

  if (isSubmitted) return <Redirect to={`/category/${id}`} />;

  return (
    <Container maxWidth="md">
      <Paper className={classes.formPaper}>
        <Grid container>
          <Grid className={classes.gridCont} item xs={12}>
            <h1 className={classes.formHeader}>Update Bio</h1>
            <form className={classes.formCont} onSubmit={""}>
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
                Submit Post
              </Button>
            </form>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default UpdateBio;
