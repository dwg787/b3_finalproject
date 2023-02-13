import React from 'react';
import styled from 'styled-components';
import mainImg from '../assets/mainImg.png';

const SliderBanner = () => {
  return (
    <BannerWrapper>
      <BannerImg src={mainImg} alt='' />
    </BannerWrapper>
  );
};

export default SliderBanner;

const BannerWrapper = styled.div`
  width: 100%;
  height: 500px;
`;

const BannerImg = styled.img`
  width: 100%;
  height: 100%;
`;
