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
}));
