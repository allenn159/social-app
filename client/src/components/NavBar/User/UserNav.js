import React from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import useStyles from "./styles";

const UserNav = () => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <div className={classes.contentCont}>
          <h3 className={classes.title}>uBlog</h3>
          <div className={classes.buttonCont}>
            <Button className={classes.button}>Home</Button>
            <Button className={classes.button}>Create</Button>
            <Button className={classes.button}>Posts</Button>
            <Button className={classes.button}>Explore</Button>
            <Button variant="contained" className={classes.createPostBtn}>
              New Post
            </Button>
          </div>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default UserNav;
