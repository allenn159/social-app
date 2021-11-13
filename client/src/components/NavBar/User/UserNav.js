import React, { useState } from "react";
import { AppBar, Toolbar, Button, Drawer, Box, List } from "@material-ui/core";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { logoutUserAction } from "../../../Redux/slices/users/usersSlices";
import { Link } from "react-router-dom";
import Hamburger from "hamburger-react";

const UserNav = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userAuth } = useSelector((state) => state?.users);

  const onHandleDrawer = () => {
    setOpenDrawer((openDrawer) => !openDrawer);
  };

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <div className={classes.menuIcon}>
          <Hamburger toggled={openDrawer} toggle={onHandleDrawer} />
        </div>
        <div className={classes.contentCont}>
          <h3 className={classes.title}>uBlog</h3>
          <div className={classes.buttonCont}>
            <Button
              component={Link}
              to={`/profile/${userAuth?._id}`}
              className={classes.button}
            >
              Profile
            </Button>
            <Button
              component={Link}
              to="/add-category"
              className={classes.exploreBtn}
            >
              Explore
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
        </div>
      </Toolbar>
      <Drawer anchor="left" open={openDrawer} onClose={onHandleDrawer}>
        <Box className={classes.drawerBox}>
          <List className={classes.drawerList}>
            <h2 className={classes.drawerTitle}>uBlog</h2>
            <Button variant="contained" className={classes.drawerBtn}>
              Profile
            </Button>
            <Button
              variant="contained"
              component={Link}
              to="/add-category"
              className={classes.drawerBtn}
              onClick={onHandleDrawer}
            >
              Explore
            </Button>
            <Button
              variant="contained"
              onClick={() => dispatch(logoutUserAction())}
              className={classes.drawerBtn}
            >
              Logout
            </Button>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
};

export default UserNav;
