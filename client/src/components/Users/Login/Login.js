import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUserAction } from "../../../Redux/slices/users/usersSlices";
import { Link, Redirect } from "react-router-dom";
import { Container, Paper, TextField, Button } from "@material-ui/core";
import useStyles from "./styles";

const Login = () => {
  const [error, setError] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    userName: "",
    password: "",
  });
  const classes = useStyles();
  const dispatch = useDispatch();

  const onHandleSubmit = (e) => {
    e.preventDefault();
    setError(true);
    dispatch(loginUserAction(loginInfo));
  };

  //redirect after login
  const storeData = useSelector((state) => state?.users);
  const { appErr, userAuth } = storeData;

  if (userAuth) return <Redirect to={`/profile/${userAuth?._id}`} />;

  return (
    <Container className={classes.container}>
      <Link className={classes.link} to="/">
        <h1 className={classes.titleOne}>uBlog</h1>
      </Link>
      <Paper elevation={3}>
        <div className={classes.contentCont}>
          <h1 className={classes.titleTwo}>Welcome</h1>
          {error && appErr ? (
            <p className={classes.errorMessage}>{appErr}</p>
          ) : null}
          <form className={classes.formCont} onSubmit={onHandleSubmit}>
            <TextField
              value={loginInfo.userName}
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, userName: e.target.value })
              }
              placeholder="Username"
              variant="outlined"
              required
              className={classes.inputField}
            />
            <TextField
              value={loginInfo.password}
              onChange={(e) =>
                setLoginInfo({ ...loginInfo, password: e.target.value })
              }
              placeholder="Password"
              variant="outlined"
              required
              className={classes.inputField}
              type="password"
              autoComplete="on"
            />

            <Button
              className={classes.button}
              variant="contained"
              type="submit"
            >
              Login
            </Button>
          </form>
        </div>
      </Paper>
    </Container>
  );
};

export default Login;
