import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  paper: {
    width: "75%",
    margin: "25px 0",
    padding: "20px",
    textDecoration: "none",
    display: "flex",
    flexDirection: "column",
    fontFamily: "Mukta",
    [theme.breakpoints.down("sm")]: {
      width: "95%",
    },
  },
  titleCont: {
    padding: "10px",
  },
  lowerCont: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  iconsCont: {
    display: "flex",
    alignItems: "center",
  },
  upIconCont: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginRight: "25px",
  },
  downIconCont: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  upIcon: {
    width: "30px",
    cursor: "pointer",
    [theme.breakpoints.up("sm")]: {
      "&:hover": {
        color: "#54E346",
      },
    },
  },
  downIcon: {
    width: "30px",
    cursor: "pointer",
    [theme.breakpoints.up("sm")]: {
      "&:hover": {
        color: "#f00",
      },
    },
  },
  positive: {
    width: "30px",
    cursor: "pointer",
    color: "#54E346",
  },
  negative: {
    width: "30px",
    cursor: "pointer",
    color: "#f00",
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

  // Post Details

  detailsCont: {
    display: "flex",
    justifyContent: "center",
  },
  detailsPaper: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10vh",
    padding: "20px",
    width: "60%",
    fontFamily: "Mukta",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      width: "95%",
    },
  },
  detailsBody: {
    margin: "20px 0",
    fontSize: "20px",
  },
}));
