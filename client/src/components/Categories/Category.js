import React, { useEffect } from "react";
import PostList from "../Posts/PostsList";
import { ThumbUpIcon, ThumbDownIcon, EyeIcon } from "@heroicons/react/solid";
import { Container, Grid, Paper, TextField, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryAction } from "../../Redux/slices/categories/categoriesSlice";
import { fetchPostsAction } from "../../Redux/slices/posts/postSlices";
import { useParams, Link } from "react-router-dom";

const Category = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchCategoryAction(id));
    dispatch(fetchPostsAction(id));
  }, [dispatch]);

  const { categories } = state;
  const category = categories?.category;
  console.log(state);
  console.log(categories.loading);

  return (
    <Container maxWidth="lg">
      <Grid style={{ marginTop: "100px" }} container>
        <Grid
          style={{ display: "flex", justifyContent: "center" }}
          item
          xs={12}
        >
          {categories.loading ? (
            <h1>Loading...</h1>
          ) : (
            <div>
              <h1>{category?.title}</h1>
              <Button
                color="primary"
                variant="contained"
                component={Link}
                to={`/create-post/${category?._id}`}
              >
                New Post
              </Button>
            </div>
          )}
          <Paper></Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Category;
