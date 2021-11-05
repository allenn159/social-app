import React from "react";
import UserNav from "./User/UserNav";
import { useSelector } from "react-redux";

const NavBar = () => {
  //get user from store
  const state = useSelector((state) => state?.users);
  const { userAuth } = state;
  // const isAdmin = userAuth?.isAdmin;
  return <>{!userAuth ? null : <UserNav />}</>;
};

export default NavBar;
