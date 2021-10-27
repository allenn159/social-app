import React, { useState, useEffect } from "react";
import { Container, Grid, TextField, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { createPostAction } from "../../Redux/slices/posts/postSlices";
import { fetchCategoryAction } from "../../Redux/slices/categories/categoriesSlice";
import { useParams, Redirect } from "react-router-dom";

const CreatePost = () => {
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
  }, []);

  useEffect(() => {
    setPost({ ...post, category: category?.title });
  }, [category]);

  if (isSubmitted) return <Redirect to={`/category/${id}`} />;

  return (
    <Container maxWidth="md">
      <Grid style={{ marginTop: "200px" }} container>
        <Grid item xs={12}></Grid>
        <form onSubmit={onHandleSubmit}>
          <TextField
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            required
            variant="outlined"
            label="Title"
          />
          <TextField
            value={post.body}
            onChange={(e) => setPost({ ...post, description: e.target.value })}
            required
            style={{ width: "500px" }}
            variant="outlined"
            label="Body"
            multiline
            minRows={10}
          />
          <Button type="submit" variant="contained">
            Submit Post
          </Button>
        </form>
      </Grid>
    </Container>
  );
};

export default CreatePost;
