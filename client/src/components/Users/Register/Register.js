import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../../../Redux/slices/users/usersSlices";
import { Redirect, Link } from "react-router-dom";
import { Container, Paper, TextField, Button } from "@material-ui/core";
import useStyles from "./styles";

const Register = () => {
  const [error, setError] = useState(false);
  const [formInfo, setFormInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const classes = useStyles();
  //dispatch
  const dispatch = useDispatch();

  const onFormSubmit = (e) => {
    e.preventDefault();
    setError(true);
    dispatch(registerUserAction(formInfo));
  };

  // Retrieve state from store
  const storeData = useSelector((store) => store?.users);
  const { appErr, registered } = storeData;

  //redirect to profile page after user has created account.
  if (registered) {
    return <Redirect to="profile" />;
  }

  return (
    <Container className={classes.container}>
      <Link className={classes.link} to="/">
        <h1 className={classes.titleOne}>uBlog</h1>
      </Link>
      <Paper className={classes.paper} elevation={3}>
        <div className={classes.contentCont}>
          <h1 className={classes.titleTwo}>Register Account</h1>
          {error && appErr ? (
            <p className={classes.errorMessage}>{appErr}</p>
          ) : null}
          <form className={classes.formCont} onSubmit={onFormSubmit}>
            <TextField
              value={formInfo.firstName}
              onChange={(e) =>
                setFormInfo({ ...formInfo, firstName: e.target.value })
              }
              placeholder="First Name"
              variant="outlined"
              required
              className={classes.inputField}
            />
            <TextField
              value={formInfo.lastName}
              onChange={(e) =>
                setFormInfo({ ...formInfo, lastName: e.target.value })
              }
              placeholder="Last Name"
              variant="outlined"
              required
              className={classes.inputField}
            />
            <TextField
              value={formInfo.email}
              onChange={(e) =>
                setFormInfo({ ...formInfo, email: e.target.value })
              }
              onFocus={() => setError(false)}
              placeholder="Email"
              variant="outlined"
              required
              className={classes.inputField}
            />
            <TextField
              value={formInfo.password}
              onChange={(e) =>
                setFormInfo({ ...formInfo, password: e.target.value })
              }
              placeholder="Password"
              type="password"
              autoComplete="on"
              variant="outlined"
              required
              className={classes.inputField}
            />
            <Button
              className={classes.button}
              variant="contained"
              type="submit"
            >
              Register
            </Button>
          </form>
        </div>
      </Paper>
    </Container>
  );
};

export default Register;
