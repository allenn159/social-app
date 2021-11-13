import React, { useEffect } from "react";
import { Container, Grid, Paper, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfileAction } from "../../../Redux/slices/users/usersSlices";
import { useParams } from "react-router-dom";
import useStyles from "./styles";

const Profile = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state?.users);
  const { id } = useParams();
  const classes = useStyles();

  console.log(profile);

  useEffect(() => {
    dispatch(fetchProfileAction(id));
  }, []);

  return (
    <Container maxWidth="lg">
      <Paper className={classes.paper}>Sup</Paper>
    </Container>
  );
};

export default Profile;
