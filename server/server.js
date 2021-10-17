const express = require("express");
const dbConnect = require("./config/db/index");
const dotenv = require("dotenv");
const usersRoute = require("./route/users/usersRoute");
const postsRoute = require("./route/posts/postsRoute");
const commentsRoute = require("./route/comments/commentsRoute");
const categoryRoute = require("./route/category/categoryRoute");
const { errorHandler, notFound } = require("./middleware/error/errorHandler");

const app = express();

dotenv.config();

//DB
dbConnect();

//Middleware
// This parses incoming requests with JSON payloads.
app.use(express.json());

//Users Route
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/comments", commentsRoute);
app.use("/api/categories", categoryRoute);

//Error handlers
app.use(notFound);
app.use(errorHandler);

// server
const PORT = process.env.PORT || 5000;

app.listen(5000, console.log(`Server is running on port: ${PORT}`));
