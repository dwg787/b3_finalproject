import React from "react";
import { auth } from "../../apis/firebase";

const MyFavDetail = ({ title, getLiked }) => {
  const uid = auth.currentUser.uid;

  return <div>{title}</div>;
};

export default MyFavDetail;
