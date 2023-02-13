import React from "react";
import MyCart from "./MyCart";
import MyFav from "./MyFav";
import MyInfo from "./MyInfo";
import MyTicket from "./MyTicket";

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
  } else if (props.clickTab === 3) {
    return (
      <div>
        <MyTicket />
      </div>
    );
  }
};

export default TabContent;
