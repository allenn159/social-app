import React, { useEffect } from "react";
import PostList from "../Posts/PostList";
import { ThumbUpIcon, ThumbDownIcon, EyeIcon } from "@heroicons/react/solid";
import { Container, Grid, Paper, TextField, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryAction } from "../../Redux/slices/categories/categoriesSlice";
import { fetchPostsAction } from "../../Redux/slices/posts/postSlices";
import { useParams, Link } from "react-router-dom";
import useStyles from "./styles";

const Category = () => {
  const classes = useStyles();
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchCategoryAction(id));
    dispatch(fetchPostsAction(id));
  }, [dispatch]);

  const { categories } = state;
  const category = categories?.category;
  const { postList } = state?.post;

  console.log(postList);

  return (
    <Container maxWidth="lg">
      <Grid className={classes.categoryCont} container>
        <Grid className={classes.categoryGrid} item xs={12}>
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
        </Grid>
        <Grid className={classes.postListCont} item xs={12}>
          <PostList postList={postList} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Category;
