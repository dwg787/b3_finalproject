import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../../apis/firebase';
import { getDocs, collection, orderBy, query } from 'firebase/firestore';
import MySpotDetail from './MySpotDetail';
import Slider from 'react-slick';
import nextImg from '../../assets/next.png';
import pervImg from '../../assets/prev.png';

const MySpot = (propsData) => {
  const [MySpot, setMySpot] = useState();
  const MySpotList = async () => {
    const data = await getDocs(
      query(collection(db, 'recommendation'), orderBy('viewCnt', 'desc')),
    );

    console.log(MySpot);
    const res = data.docs.map((doc) => {
      return {
        ...doc.data(),
      };
    });
    return res;
  };

  useEffect(() => {
    const fetchRecList = async () => {
      const res = await MySpotList();
      setMySpot(res);
    };
    fetchRecList();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 4.7,
    slidesToScroll: 1,
    nextArrow: (
      <NextTo>
        <ArrowImg src={nextImg} />
      </NextTo>
    ),
    prevArrow: (
      <Pre>
        <ArrowImg src={pervImg} />
      </Pre>
    ),
  };

  return (
    <Container>
      <MySpotTitle>나만 알고 싶은 감성 스팟</MySpotTitle>
      <div>
        <StyledSlider {...settings}>
          <div>
            <h3>
              {MySpot && (
                <MySpotDetail
                  key={MySpot[0].contentid}
                  id={MySpot[0].contentid}
                  img={MySpot[0].firstimage}
                >
                  {MySpot[0].title}
                </MySpotDetail>
              )}
            </h3>
          </div>
          <div>
            <h3>
              {MySpot && (
                <MySpotDetail
                  key={MySpot[1].contentid}
                  id={MySpot[1].contentid}
                  img={MySpot[1].firstimage}
                >
                  {MySpot[1].title}
                </MySpotDetail>
              )}
            </h3>
          </div>
          <div>
            <h3>
              {MySpot && (
                <MySpotDetail
                  key={MySpot[2].contentid}
                  id={MySpot[2].contentid}
                  img={MySpot[2].firstimage}
                >
                  {MySpot[2].title}
                </MySpotDetail>
              )}
            </h3>
          </div>
          <div>
            <h3>
              {MySpot && (
                <MySpotDetail
                  key={MySpot[3].contentid}
                  id={MySpot[3].contentid}
                  img={MySpot[3].firstimage}
                >
                  {MySpot[3].title}
                </MySpotDetail>
              )}
            </h3>
          </div>
          <div>
            <h3>
              {MySpot && (
                <MySpotDetail
                  key={MySpot[4].contentid}
                  id={MySpot[4].contentid}
                  img={MySpot[4].firstimage}
                >
                  {MySpot[4].title}
                </MySpotDetail>
              )}
            </h3>
          </div>
          <div>
            <h3>
              {MySpot && (
                <MySpotDetail
                  key={MySpot[5].contentid}
                  id={MySpot[5].contentid}
                  img={MySpot[5].firstimage}
                >
                  {MySpot[5].title}
                </MySpotDetail>
              )}
            </h3>
          </div>
          <div>
            <h3>
              {MySpot && (
                <MySpotDetail
                  key={MySpot[6].contentid}
                  id={MySpot[6].contentid}
                  img={MySpot[6].firstimage}
                >
                  {MySpot[6].title}
                </MySpotDetail>
              )}
            </h3>
          </div>
          <div>
            <h3>
              {MySpot && (
                <MySpotDetail
                  key={MySpot[7].contentid}
                  id={MySpot[7].contentid}
                  img={MySpot[7].firstimage}
                >
                  {MySpot[7].title}
                </MySpotDetail>
              )}
            </h3>
          </div>
          <div>
            <h3>
              {MySpot && (
                <MySpotDetail
                  key={MySpot[8].contentid}
                  id={MySpot[8].contentid}
                  img={MySpot[8].firstimage}
                >
                  {MySpot[8].title}
                </MySpotDetail>
              )}
            </h3>
          </div>
        </StyledSlider>
      </div>
    </Container>
  );
};
export default MySpot;

const Container = styled.div`
  width: 65%;
  height: 440px;
  display: flex;
  flex-direction: column;
  margin-top: 70px;
  padding-top: 40px;
  border: 1.5px solid #6478ff;
  border-radius: 50px;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.2);
  background-color: white;
`;

const MySpotTitle = styled.div`
  margin-left: 70px;
  color: #6478ff;
  font-size: 20px;
  font-weight: bold;
`;

const StyledSlider = styled(Slider)`
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }
`;

const Pre = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  left: 5%;
  z-index: 3;
  margin-left: 40px;
`;

const NextTo = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 5%;
  z-index: 3;
  margin-right: 40px;
`;

const ArrowImg = styled.img`
  width: 20px;
  height: 20px;
`;
