import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";
import useStyles from "./styles";
import img from "../../img/people.jpg";

const HomePage = () => {
  const classes = useStyles();
  return (
    <div>
      <Grid className={classes.gridContainer} container>
        <Grid className={classes.gridItemOne} item xs={12} sm={6}>
          <div>
            <p className={classes.text1} variant="h2">
              Welcome to
            </p>
            <p className={classes.text2} variant="h2">
              uBlog
            </p>
            <div className={classes.buttonContainer}>
              <Button variant="contained" className={classes.signUpBtn}>
                Sign Up
              </Button>
              <Button variant="contained" className={classes.loginBtn}>
                Login
              </Button>
            </div>
          </div>
        </Grid>
        <Grid className={classes.gridItemTwo} item xs={12} sm={6}>
          <img style={{ width: "700px" }} src={img} />
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
