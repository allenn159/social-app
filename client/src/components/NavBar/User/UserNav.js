import React from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import useStyles from "./styles";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { logoutUserAction } from "../../../Redux/slices/users/usersSlices";
import { Link } from "react-router-dom";

const UserNav = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <div className={classes.contentCont}>
          <h3 className={classes.title}>uBlog</h3>
          <div className={classes.buttonCont}>
            <Button className={classes.button}>Home</Button>
            <Button className={classes.button}>Explore</Button>
            <Button
              component={Link}
              to="/add-category"
              className={classes.button}
            >
              Categories
            </Button>
            <Button variant="contained" className={classes.createPostBtn}>
              New Post
              <AddIcon className={classes.plusIcon} />
            </Button>
          </div>
        </div>
        <div className={classes.contentCont}>
          <Button
            onClick={() => dispatch(logoutUserAction())}
            className={classes.button}
          >
            Logout
          </Button>
          <p>Pic</p>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default UserNav;
