import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  contentCont: {
    marginTop: "15vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: "Mukta",
    fontSize: "3rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  textField: {
    textAlign: "center",
    width: "400px",
    [theme.breakpoints.down("sm")]: {
      width: "250px",
    },
  },
  button: {
    positon: "relative",
    width: "400px",
    background: "linear-gradient(45deg, #113CFC 30%, #1597E5 90%)",
    boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
    color: "#fff",
    fontFamily: "Mukta",
    fontSize: "20px",
    marginTop: "20px",
    [theme.breakpoints.down("sm")]: {
      width: "250px",
    },
  },
  addIcon: {
    position: "absolute",
    left: 10,
  },
  successMsgCont: {
    width: "300px",
    height: "55px",
  },
  successMsg: {
    marginTop: "25px",
  },
  categoriesCont: {
    marginTop: "10px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  categoriesItem: {
    margin: "20px",
    fontFamily: "Mukta",
    fontSize: "25px",
  },
}));
