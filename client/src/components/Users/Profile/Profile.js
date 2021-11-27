import React, { useEffect, useRef } from "react";
import { Container, Paper, Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProfileAction,
  updateProfilePictureAction,
} from "../../../Redux/slices/users/usersSlices";
import { useParams } from "react-router-dom";
import useStyles from "./styles";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const { profile, userAuth } = useSelector((state) => state?.users);
  const { id } = useParams();
  const classes = useStyles();
  const inputFile = useRef(null);

  const uploadImage = async (files) => {
    const image = { image: files[0] };
    dispatch(updateProfilePictureAction(image));
  };

  const isUser = profile?._id === userAuth?._id;

  console.log(isUser);

  useEffect(() => {
    dispatch(fetchProfileAction(id));
  }, []);

  return (
    <Container className={classes.cont} maxWidth="lg">
      <Paper className={classes.paper}>
        <div className={classes.imgCont}>
          <img
            onClick={isUser ? () => inputFile.current.click() : null}
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
          <h2 className={classes.bioTitle}>Bio</h2>
          <p>
            {profile?.biography}
            {isUser ? (
              <Link to={"/update-bio"}>
                <EditIcon
                  style={{
                    fontSize: "20px",
                    textDecoration: "none",
                    color: "black",
                    marginLeft: "10px",
                  }}
                />
              </Link>
            ) : null}
          </p>
        </div>
        <div>
          <p>Followers: {profile?.followers?.length} </p>
          <p>Following: {profile?.following?.length} </p>
          {isUser ? null : (
            <Button className={classes.btn} variant="contained">
              Follow
            </Button>
          )}
        </div>
      </Paper>
    </Container>
  );
};

export default Profile;
