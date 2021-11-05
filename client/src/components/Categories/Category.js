import React, { useEffect } from "react";
import PostList from "../Posts/PostList";
import { Container, Grid, Button } from "@material-ui/core";
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
  const { categories } = state;
  const category = categories?.category;
  const { postList, likes, disLikes } = state?.post;

  useEffect(() => {
    dispatch(fetchCategoryAction(id));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(fetchPostsAction(id));
  }, [likes, disLikes, dispatch, id]);

  return (
    <Container maxWidth="lg">
      {categories.loading ? (
        <h1 className={classes.loadingTitle}>Loading...</h1>
      ) : (
        <Grid className={classes.categoryCont} container>
          <Grid className={classes.categoryGrid} item xs={12}>
            <div className={classes.titleCont}>
              <h1 className={classes.categoryTitle}>{category?.title}</h1>
              <Button
                className={classes.btn}
                variant="contained"
                component={Link}
                to={`/create-post/${category?._id}`}
              >
                New Post
              </Button>
            </div>
          </Grid>
          <Grid className={classes.postListCont} item xs={12}>
            <PostList postList={postList} />
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default Category;
