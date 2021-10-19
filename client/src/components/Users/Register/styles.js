import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "15vh",
  },
  contentCont: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "400px",
  },
  formCont: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  titleOne: {
    fontFamily: "Mukta",
    color: "#113CFC",
    fontSize: "30px",
    margin: "0 0 20px 0",
  },
  titleTwo: {
    fontFamily: "Mukta",
    margin: "20px 0",
  },
  inputField: {
    marginBottom: "20px",
  },
  button: {
    marginBottom: "30px",
    background: "linear-gradient(45deg, #FFA400 30%, #ff8e53 90%)",
    boxShadow: "0 1px 5px 2px rgba(255, 105, 135, 0.3)",
    fontFamily: "Mukta",
    width: "60%",
    fontSize: "18px",
  },
}));
