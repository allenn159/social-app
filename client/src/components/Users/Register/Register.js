import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUserAction } from "../../../Redux/slices/users/usersSlices";
import { Redirect } from "react-router-dom";
import { Container, Grid, Paper, TextField, Button } from "@material-ui/core";
import useStyles from "./styles";

//Form schema
const formSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().required("Email address is required"),
  password: Yup.string().required("Password is required"),
});

const Register = () => {
  const classes = useStyles();
  //dispatch
  const dispatch = useDispatch();
  // Formik hook
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(registerUserAction(values));
      console.log(values);
    },
    validationSchema: formSchema,
  });

  // Retrieve state from store
  const storeData = useSelector((store) => store?.users);
  const { loading, appErr, serverErr, registered } = storeData;

  console.log(serverErr, appErr);
  //redirect to profile page after user has created account.
  if (registered) {
    return <Redirect to="profile" />;
  }

  return (
    <Container className={classes.container}>
      <h1 className={classes.titleOne}>uBlog</h1>
      <Paper elevation={3}>
        <div className={classes.contentCont}>
          <h1 className={classes.titleTwo}>Register Account</h1>
          {appErr || serverErr ? (
            <div>
              {serverErr.split(" ").slice(1).join("")} {appErr}
            </div>
          ) : null}
          <form className={classes.formCont} onSubmit={formik.handleSubmit}>
            <TextField
              value={formik.values.firstName}
              onChange={formik.handleChange("firstName")}
              placeholder="First Name"
              variant="outlined"
              required
              className={classes.inputField}
            />
            <TextField
              value={formik.values.lastName}
              onChange={formik.handleChange("lastName")}
              placeholder="Last Name"
              variant="outlined"
              required
              className={classes.inputField}
            />
            <TextField
              value={formik.values.email}
              onChange={formik.handleChange("email")}
              placeholder="Email"
              variant="outlined"
              required
              className={classes.inputField}
            />
            <TextField
              value={formik.values.password}
              onChange={formik.handleChange("password")}
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
