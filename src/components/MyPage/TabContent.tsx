import React from 'react';
import MyFav from './MyFav';
import MyInfo from './MyInfo';

const TabContent = (props: any) => {
  //마이페이지 탭  나누기
  if (props.clickTab === 0) {
    return (
      <div>
        <MyInfo />
      </div>
    );
  } else if (props.clickTab === 1) {
    return (
      <div>
        <MyFav />
      </div>
    );
  }
};

export default TabContent;
