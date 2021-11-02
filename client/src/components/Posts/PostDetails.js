import React, { useEffect } from "react";
import { Paper } from "@material-ui/core";
import { useParams } from "react-router";
import { fetchSinglePostAction } from "../../Redux/slices/posts/postSlices";
import { useDispatch, useSelector } from "react-redux";

const PostDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchSinglePostAction(id));
  }, [id, dispatch]);

  return <div></div>;
};

export default PostDetails;
