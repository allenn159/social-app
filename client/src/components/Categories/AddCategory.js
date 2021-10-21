import React, { useState } from "react";
import { Container, Grid, TextField, Button } from "@material-ui/core";
import Alert from "@mui/material/Alert";
import useStyles from "./styles";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { createCategoryAction } from "../../Redux/slices/categories/categoriesSlice";

const AddCategory = () => {
  const [category, setCategory] = useState({
    title: "",
  });
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const classes = useStyles();

  const onHandleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    dispatch(createCategoryAction(category));
    setCategory({ ...category, title: "" });
  };

  const state = useSelector((state) => state?.categories);

  const { submitSuccessful } = state;

  return (
    <Container className={classes.container}>
      <Grid container>
        <Grid item xs={12}>
          <div className={classes.contentCont}>
            <h1 className={classes.title}>New Category</h1>
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
            {success && submitSuccessful ? (
              <Alert className={classes.successMsg} severity="success">
                Category was successfully created!
              </Alert>
            ) : null}
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddCategory;
