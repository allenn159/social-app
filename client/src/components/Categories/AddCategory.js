import React, { useState, useEffect } from "react";
import { Container, Grid, TextField, Button } from "@material-ui/core";
import Alert from "@mui/material/Alert";
import useStyles from "./styles";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategoryAction,
  fetchCategoriesAction,
} from "../../Redux/slices/categories/categoriesSlice";
import { Link } from "react-router-dom";

const AddCategory = () => {
  const [category, setCategory] = useState({
    title: "",
  });
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();
  const colors = [
    "#A2D2FF",
    "#CDF2CA",
    "#FC92E3",
    "#CAB8FF",
    "#00EAD3",
    "#7DEDFF",
    "#B8DFD8",
    "#FFEDA3",
  ];

  const onHandleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    dispatch(createCategoryAction(category));
    dispatch(fetchCategoriesAction());
    setCategory({ ...category, title: "" });
  };

  useEffect(() => {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  const state = useSelector((state) => state?.categories);
  const { submitSuccessful, categoryList } = state;

  console.log(categoryList);

  return (
    <Container className={classes.container}>
      <Grid container>
        <Grid item xs={12}>
          <div className={classes.contentCont}>
            <h1 className={classes.title}>Categories</h1>
            <form onSubmit={onHandleSubmit} className={classes.form}>
              <TextField
                value={category.title}
                onChange={(e) =>
                  setCategory({ ...category, title: e.target.value })
                }
                onFocus={() => setSuccess(false)}
                className={classes.textField}
                variant="outlined"
                placeholder="New Category"
                required
              />
              <Button
                type="submit"
                className={classes.button}
                variant="contained"
              >
                Add New Category <AddIcon className={classes.addIcon} />
              </Button>
            </form>
            <div className={classes.successMsgCont}>
              {success && submitSuccessful ? (
                <Alert className={classes.successMsg} severity="success">
                  Category was successfully created!
                </Alert>
              ) : null}
            </div>
          </div>
        </Grid>
        <Grid item xs={12}>
          <div className={classes.categoriesCont}>
            {categoryList?.map((el) => (
              <Button
                style={{
                  background: `${
                    colors[Math.floor(Math.random() * colors.length)]
                  }`,
                }}
                variant="contained"
                className={classes.categoriesItem}
                key={el._id}
                component={Link}
                to={`/category/${el._id}`}
              >
                {el.title}
              </Button>
            ))}
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddCategory;
