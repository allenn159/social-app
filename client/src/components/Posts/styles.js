import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  paper: {
    width: "75%",
    margin: "25px 0",
    textDecoration: "none",
    display: "flex",
    justifyContent: "space-between",
    fontFamily: "Mukta",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      width: "95%",
    },
  },
  titleCont: {
    padding: "10px",
  },
  iconsCont: {
    display: "flex",
    alignItems: "flex-end",
    margin: "0 10px 10px 0",
    [theme.breakpoints.down("sm")]: {
      margin: "0 0 20px 5px",
    },
  },
  upDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  downDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  upIcon: {
    width: "30px",
    cursor: "pointer",
    marginRight: "15px",
  },
  downIcon: {
    width: "30px",
    cursor: "pointer",
  },
  postTitle: {
    margin: 0,
    fontSize: "30px",
    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
    },
  },
  postBody: {
    margin: "20px 0",
    maxHeight: "200px",
    fontSize: "20px",
    overflowY: "hidden",
    [theme.breakpoints.down("sm")]: {
      maskImage: "linear-gradient(to bottom, black 70%, transparent 100%)",
    },
  },
  postDate: {
    fontSize: "15px",
    marginBottom: "20px",
  },
}));
