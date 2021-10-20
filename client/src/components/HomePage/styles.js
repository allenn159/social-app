import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  gridContainer: {
    marginTop: "20vh",
  },
  gridItemOne: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  gridItemTwo: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  text1: {
    fontSize: "80px",
    fontFamily: "Helvetica",
    fontWeight: 700,
    margin: 0,
    textAlign: "center",
    marginRight: "100px",
    [theme.breakpoints.down("md")]: {
      margin: 0,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "65px",
    },
  },
  text2: {
    fontSize: "100px",
    fontFamily: "Helvetica",
    fontWeight: 700,
    margin: 0,
    color: "#113CFC",
    textAlign: "center",
    marginLeft: "150px",
    [theme.breakpoints.down("md")]: {
      margin: 0,
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "80px",
    },
  },
  buttonContainer: {
    width: "100%",
    marginTop: "50px",
    display: "flex",
    justifyContent: "space-evenly",
  },
  signUpBtn: {
    width: "40%",
    background: "linear-gradient(45deg, #FFA400 30%, #ff8e53 90%)",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, 0.3)",
    fontFamily: "Mukta",
    fontSize: "20px",
    color: "black",
  },
  loginBtn: {
    width: "40%",
    background: "linear-gradient(45deg, #113CFC 30%, #1597E5 90%)",
    boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
    fontFamily: "Mukta",
    fontSize: "20px",
    color: "white",
  },
  image: {
    maxWidth: "75%",
    borderRadius: "10px",
    [theme.breakpoints.down("sm")]: {
      margin: "50px 0",
    },
  },
}));
