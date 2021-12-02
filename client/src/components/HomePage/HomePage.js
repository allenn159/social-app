import React from "react";
import { Grid, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import useStyles from "./styles";
import img from "../../img/people.jpg";

const HomePage = () => {
  const classes = useStyles();
  const { userAuth } = useSelector((state) => state?.users);

  return (
    <div>
      <Grid className={classes.gridContainer} container>
        <Grid className={classes.gridItemOne} item xs={12} md={6}>
          <div>
            <h1 className={classes.text1} variant="h2">
              Welcome to
            </h1>
            <h1 className={classes.text2} variant="h2">
              uBlog
            </h1>
            {userAuth ? null : (
              <div className={classes.buttonContainer}>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  className={classes.signUpBtn}
                >
                  Sign Up
                </Button>
                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  className={classes.loginBtn}
                >
                  Login
                </Button>
              </div>
            )}
          </div>
        </Grid>
        <Grid className={classes.gridItemTwo} item xs={12} md={6}>
          <img className={classes.image} src={img} alt="blog" />
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePage;
