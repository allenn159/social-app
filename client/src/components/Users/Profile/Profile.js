import React, { useEffect, useRef } from "react";
import { Container, Paper, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfileAction,
  updateProfilePictureAction,
} from "../../../Redux/slices/users/usersSlices";
import { useParams } from "react-router-dom";
import useStyles from "./styles";

const Profile = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state?.users);
  const { id } = useParams();
  const classes = useStyles();
  const inputFile = useRef(null);

  const uploadImage = async (files) => {
    const image = { image: files[0] };
    dispatch(updateProfilePictureAction(image));
  };

  console.log(profile);

  useEffect(() => {
    dispatch(fetchProfileAction(id));
  }, []);

  return (
    <Container className={classes.cont} maxWidth="lg">
      <Paper className={classes.paper}>
        <div className={classes.imgCont}>
          <img
            onClick={() => inputFile.current.click()}
            className={classes.img}
            src={profile?.profilePicture}
          />
          <input
            onChange={(event) => uploadImage(event.target.files)}
            type="file"
            ref={inputFile}
            style={{ display: "none" }}
          />
          <p className={classes.userName}>{profile?.userName}</p>
        </div>
        <div className={classes.bioCont}>
          <p>
            This defines the alignment along the main axis. It helps distribute
            extra free space leftover when either all the flex items on a line
            are inflexible, or are flexible but have reached their maximum size.
            It also exerts some control over the alignment of items when they
            overflow the line.{" "}
          </p>
        </div>
        <div>
          <p>Followers: </p>
          <p>Following: </p>
          <Button className={classes.btn} variant="contained">
            Follow
          </Button>
        </div>
      </Paper>
    </Container>
  );
};

export default Profile;
