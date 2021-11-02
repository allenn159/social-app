import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  paper: {
    width: "75%",

    margin: "25px 0",
    textDecoration: "none",
    display: "flex",
    justifyContent: "space-between",
    fontFamily: "Mukta",
  },
  titleCont: {
    padding: "25px",
  },
  iconsCont: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    padding: "25px",
  },
  iconsDiv: {
    display: "flex",
    alignItems: "center",
  },
  icons: {
    width: "30px",
    cursor: "pointer",
    marginRight: "15px",
  },
  postTitle: {
    margin: 0,
    fontSize: "30px",
  },
  postBody: {
    fontSize: "20px",
  },
  postDate: {
    fontSize: "15px",
  },
}));
