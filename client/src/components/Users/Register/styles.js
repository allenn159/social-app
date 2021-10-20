import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "15vh",
    [theme.breakpoints.down("sm")]: {
      marginTop: "12vh",
    },
  },
  contentCont: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "400px",
    [theme.breakpoints.down("sm")]: {
      width: "300px",
    },
  },
  formCont: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
  },
  titleOne: {
    fontFamily: "Mukta",
    color: "#113CFC",
    fontSize: "30px",
    margin: "0 0 20px 0",
    textDecoration: "none",
  },
  titleTwo: {
    fontFamily: "Mukta",
    margin: "20px 0",
  },
  inputField: {
    marginBottom: "20px",
    width: "110%",
  },
  button: {
    margin: "10px 0 30px 0",
    background: "linear-gradient(45deg, #FFA400 30%, #ff8e53 90%)",
    boxShadow: "0 1px 3px 1px rgba(255, 105, 135, 0.3)",
    fontFamily: "Mukta",
    fontSize: "18px",
    width: "80%",
    borderRadius: "20px",
  },
  errorMessage: {
    fontFamily: "Mukta",
    fontSize: "17px",
    margin: "0 0 10px 0",
    color: "red",
    width: "80%",
    textAlign: "center",
  },
}));
