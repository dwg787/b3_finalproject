import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../../apis/firebase';
import { getDocs, collection, orderBy, query } from 'firebase/firestore';
import MySpotDetail from './MySpotDetail';
import Slider from 'react-slick';
import nextImg from '../../assets/next.avif';
import pervImg from '../../assets/prev.avif';

const MySpot = (propsData) => {
  const [MySpot, setMySpot] = useState();
  const MySpotList = async () => {
    const data = await getDocs(
      query(collection(db, 'spot_recommendation'), orderBy('viewCnt', 'desc')),
    );

    // console.log(MySpot);
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
    infinite: false,
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
          {MySpot &&
            MySpot.map((e) => {
              return (
                <div>
                  <h3>
                    {MySpot && (
                      <MySpotDetail
                        key={e?.contentid}
                        id={e?.contentid}
                        img={e?.firstimage}
                      >
                        {e?.title}
                      </MySpotDetail>
                    )}
                  </h3>
                </div>
              );
            })}
          {/* <div>
            <h3>
              {MySpot && (
                <MySpotDetail
                  key={MySpot[1]?.contentid}
                  id={MySpot[1]?.contentid}
                  img={MySpot[1]?.firstimage}
                >
                  {MySpot[1]?.title}
                </MySpotDetail>
              )}
            </h3>
          </div> */}
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
