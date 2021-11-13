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
    marginBottom: "10px",
  },

  // Post Details

  detailsCont: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  detailsPaper: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    marginTop: "10vh",
    padding: "20px",
    width: "60%",
    fontFamily: "Mukta",
    [theme.breakpoints.down("sm")]: {
      width: "95%",
    },
  },
  detailsBody: {
    margin: "20px 0",
    fontSize: "20px",
  },
  // Create Post
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
  },
  formTitle: {
    width: "50%",
    marginBottom: "20px",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
    },
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
