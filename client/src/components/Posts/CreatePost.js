import React, { useState, useEffect } from "react";
import { Container, Grid, TextField, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createPostAction } from "../../Redux/slices/posts/postSlices";
import { fetchCategoryAction } from "../../Redux/slices/categories/categoriesSlice";
import { useParams, Redirect } from "react-router-dom";
import useStyles from "./styles";

const CreatePost = () => {
  const classes = useStyles();
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isSubmitted } = useSelector((state) => state.post);
  const { category } = useSelector((state) => state.categories);
  const [post, setPost] = useState({
    title: "",
    description: "",
    category: "",
  });

  const onHandleSubmit = (e) => {
    e.preventDefault();
    dispatch(createPostAction(post));
  };

  useEffect(() => {
    dispatch(fetchCategoryAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    setPost({ ...post, category: category?.title });
  }, [category]);

  if (isSubmitted) return <Redirect to={`/category/${id}`} />;

  console.log(post);

  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid className={classes.gridCont} item xs={12}>
          <h1 className={classes.formHeader}>{category?.title}</h1>
          <form className={classes.formCont} onSubmit={onHandleSubmit}>
            <TextField
              className={classes.formTitle}
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
              required
              variant="outlined"
              label="Title"
            />
            <TextField
              className={classes.formBody}
              value={post.description}
              onChange={(e) =>
                setPost({ ...post, description: e.target.value })
              }
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
    </Container>
  );
};

export default CreatePost;
