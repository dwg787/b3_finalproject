import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../../apis/firebase';
import { getDocs, collection, orderBy, query } from 'firebase/firestore';
import MySpotDetail from './MySpotDetail';
import Slider from 'react-slick';
import nextImg from '../../assets/next.avif';
import pervImg from '../../assets/prev.avif';
import { DetailDataTypes } from '../../types/apiDataTypes';

const MySpot = (propsData: any) => {
  const [MySpot, setMySpot] = useState<any>();
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
    slidesToShow: 3.5,
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
            MySpot.map((e: DetailDataTypes) => {
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
        </StyledSlider>
      </div>
    </Container>
  );
};
export default MySpot;

const Container = styled.div`
  max-width: 1036px;
  width: 100%;
  height: 426.96px;
  display: flex;
  flex-direction: column;
  margin-top: 19.98px;
  padding-top: 20px;
  border-radius: 11.2px;
  box-shadow: 2.26px 2.26px rgba(0, 0, 0, 0.2);
  background-color: white;
`;

const MySpotTitle = styled.div`
  padding-top: 10px;
  margin-left: 21.21px;
  color: #6478ff;
  font-size: 17.88px;
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
  margin-left: 50px;
`;

const NextTo = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  right: 5%;
  z-index: 3;
  margin-right: 50px;
`;

const ArrowImg = styled.img`
  width: 15px;
  height: 30px;
`;
