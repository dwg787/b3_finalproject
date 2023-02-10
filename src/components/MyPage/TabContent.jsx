import React from "react";
import MyCart from "./MyCart";
import MyFav from "./MyFav";
import MyInfo from "./MyInfo";

const TabContent = (props) => {
  if (props.clickTab === 0) {
    return (
      <div>
        <MyInfo />
      </div>
    );
  } else if (props.clickTab === 1) {
    return (
      <div>
        <MyCart />
      </div>
    );
  } else if (props.clickTab === 2) {
    return (
      <div>
        <MyFav />
      </div>
    );
  }
};

export default TabContent;
