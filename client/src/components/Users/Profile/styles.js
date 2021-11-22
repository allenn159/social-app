import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  cont: {
    display: "flex",
    justifyContent: "center",
  },
  paper: {
    marginTop: "100px",
    width: "80%",
    fontFamily: "mukta",
    padding: "25px",
  },
  contentCont: {
    display: "flex",
    justifyContent: "space-between",
  },
  imgCont: {
    display: "flex",
    alignItems: "center",
  },
  img: {
    height: "150px",
    width: "150px",
    marginRight: "25px",
    borderRadius: "25%",
    cursor: "pointer",
  },
  userName: {
    fontSize: "25px",
  },
  bioCont: {
    display: "flex",
    alignItems: "center",
    marginTop: "10px",
  },
  btn: {
    background: "linear-gradient(45deg, #77D970 30%, #57CC99 90%)",
    boxShadow: "0 1px 3px 1px rgba(255, 105, 135, 0.3)",
    fontFamily: "mukta",
  },
  // Update Bio
  formPaper: {
    marginTop: "10vh",
    [theme.breakpoints.down("sm")]: {
      marginTop: "12vh",
    },
  },
  gridCont: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Mukta",
  },
  formCont: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  formHeader: {
    fontSize: "50px",
    marginBottom: "10px",
  },
  formBody: {
    width: "75%",
    marginBottom: "20px",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
  formBtn: {
    background: "linear-gradient(45deg, #113CFC 30%, #1597E5 90%)",
    boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
    fontFamily: "Mukta",
    fontSize: "20px",
    color: "#fff",
    width: "25%",
    marginBottom: "20px",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
  },
}));
