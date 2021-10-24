import React, { useEffect } from "react";
import { Container, Grid, Paper, TextField, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryAction } from "../../Redux/slices/categories/categoriesSlice";
import { useParams } from "react-router-dom";

const Category = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchCategoryAction(id));
  }, []);

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
          {categories.loading ? <h1>Loading...</h1> : <h1>{category.title}</h1>}
          <Paper></Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Category;
