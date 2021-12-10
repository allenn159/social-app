import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  // Create Comment
  outerCont: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
    width: "60%",
    padding: "20px",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  inputField: {
    width: "100%",
  },
  button: {
    marginTop: "20px",
    fontFamily: "Mukta",
    fontSize: "15px",
    color: "#fff",
    background: "linear-gradient(45deg, #113CFC 30%, #1597E5 90%)",
    boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
    width: "100%",
  },
  // Comment List
  commentPaper: {
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
    width: "60%",
    padding: "20px",
    fontFamily: "Mukta",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  imgCont: {
    display: "flex",
    alignItems: "center",
  },
  img: {
    height: "40px",
    width: "40px",
    borderRadius: "50%",
    marginRight: "10px",
  },
  userName: {
    "&:hover": {
      textDecoration: "underline",
    },
  },
  timeStampCont: {
    display: "flex",
    alignItems: "center",
    fontSize: "12px",
  },
  timeStamp: {
    marginRight: "3px",
  },
  deleteIcon: {
    cursor: "pointer",
  },
}));
