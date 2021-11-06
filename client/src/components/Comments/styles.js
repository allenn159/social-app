import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    marginTop: "20px",
    width: "60%",
    padding: "20px",
    [theme.breakpoints.down("sm")]: {
      width: "95%",
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
  },
}));
