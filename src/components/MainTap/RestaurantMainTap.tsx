import { useState, useEffect } from 'react';
import { getDocs, query, collection, orderBy, limit } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../../apis/firebase';
import styled from 'styled-components';
import one from '../../assets/one.avif';
import two from '../../assets/two.avif';
import three from '../../assets/three.avif';
import noimg from '../../assets/noimg.avif';
import redheart from '../../assets/redheart.avif';
import { RankTypeList } from '../../types/apiDataTypes';

const RestaurantMainTap = () => {
  const navigate = useNavigate();
  const [rankList, setRankList] = useState<RankTypeList>([]);
  const medalImg = [one, two, three];
  const restaurantRankList = async () => {
    const data = await getDocs(
      query(
        collection(db, 'restaurant_recommendation'),
        orderBy('likeCnt', 'desc'),
        limit(7),
      ),
    );
    const res = data.docs.map((doc) => {
      return {
        ...doc.data(),
      };
    });
    return res;
  };

  useEffect(() => {
    const fetchRestaurantRankList = async () => {
      const res = await restaurantRankList();
      setRankList(res);
    };
    fetchRestaurantRankList();
  }, []);

  return (
    <WrapDiv>
      <ListTitleWrapper>
        <ListItemTitle>추천! 인기 관광지</ListItemTitle>
      </ListTitleWrapper>
      <>
        {rankList ? (
          <InnerDiv>
            {rankList.slice(0, 3)?.map((e, idx) => {
              if (e?.likeCnt) {
                return (
                  <InnerList
                    key={e?.contentid}
                    onClick={() => navigate(`/restaurant/${e?.contentid}`)}
                  >
                    <InnerImg src={e?.firstimage || noimg} />
                    <MedalHeartBox>
                      <HeartImg src={redheart} />
                      <HeartText>{e?.likeCnt}</HeartText>
                    </MedalHeartBox>
                    <InnerMedals src={medalImg[idx]} alt="" />
                    <InnerTextBox>
                      <MedalText>
                        {e?.title.split(/[\\[\]\\(\\)]/)[0]
                          ? e?.title.split(/[\\[\]\\(\\)]/)[0]
                          : e?.title.split(/[\\[\]\\(\\)]/)[2]}
                      </MedalText>
                      <MedalSubText>{e?.overview.slice(0, 20)}...</MedalSubText>
                    </InnerTextBox>
                  </InnerList>
                );
              } else {
                return (
                  <InnerList>
                    <InnerMedals src={medalImg[idx]} alt="" />
                    <InnerTextBox></InnerTextBox>
                  </InnerList>
                );
              }
            })}
          </InnerDiv>
        ) : (
          <InnerDiv></InnerDiv>
        )}
        <OuterDiv>
          {rankList.slice(3, 7).map((e, i) => {
            if (e.likeCnt > 0) {
              return (
                <OuterList
                  key={e?.contentid}
                  onClick={() => navigate(`/restaurant/${e.contentid}`)}
                >
                  <InnerNmb>{i + 4}</InnerNmb>
                  <OuterImg src={e.firstimage || noimg} alt="" />
                  <OuterMedalHeartBox>
                    <OuterHeartImg src={redheart} />
                    <OuterHeartText>{e.likeCnt}</OuterHeartText>
                  </OuterMedalHeartBox>
                  <OuterTextBox>
                    <OuterMedalText>
                      {e?.title.split(/[\\[\]\\(\\)]/)[0]
                        ? e?.title.split(/[\\[\]\\(\\)]/)[0]
                        : e?.title.split(/[\\[\]\\(\\)]/)[2]}
                    </OuterMedalText>
                    <OuterMedalSubText>
                      {e.overview.slice(0, 20)}
                    </OuterMedalSubText>
                  </OuterTextBox>
                </OuterList>
              );
            } else {
              return (
                <OuterList>
                  <InnerNmb>{i + 4}</InnerNmb>
                  <OuterTextBox></OuterTextBox>
                </OuterList>
              );
            }
          })}
        </OuterDiv>
      </>
    </WrapDiv>
  );
};

export default RestaurantMainTap;

const WrapDiv = styled.div`
  max-width: 1036px;
  width: 100%;
  /* height: 725px; */
  background: linear-gradient(
    180deg,
    #8796ff 0%,
    rgba(255, 255, 255, 0.04) 100%
  );
  border-radius: 11px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 2.16px 2.16px 5.4px rgba(0, 0, 0, 0.18);
  z-index: 3;
`;

const InnerDiv = styled.div`
  max-width: 904px;
  margin-top: 18px;
  border-radius: 11px;
  background: #d6dcff;
  box-shadow: 2.16px 2.16px 2.16px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 19px;
  padding: 19px 57px 19px 57px;
  @media (max-width: 820px) {
    width: 340px;
    padding: 15px;
    flex-wrap: wrap;
  }
`;

const InnerList = styled.div`
  position: relative;
  width: 261px;
  height: 298px;
  background-color: gray;
  border-radius: 8px;
  box-shadow: 2.15833px 2.15833px 5.39583px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  cursor: pointer;
  @media (max-width: 820px) {
    width: 310px;
    height: 183px;
  }
`;

const InnerImg = styled.img`
  width: 261px;
  height: 200px;
  position: absolute;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
    transition: all 0.35s;
  }
  @media (max-width: 820px) {
    width: 310px;
    height: 134px;
  }
`;

const OuterImg = styled.img`
  width: 214px;
  height: 200px;
  position: absolute;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
    transition: all 0.35s;
  }
  @media (max-width: 820px) {
    width: 164px;
    height: 112px;
  }
`;

const InnerMedals = styled.img`
  width: 60px;
  margin-left: 8px;
  position: absolute;
`;

const InnerTextBox = styled.div`
  position: absolute;
  width: 100%;
  height: 120.04px;
  background-color: white;
  margin-top: 178.06px;
  @media (max-width: 820px) {
    width: 310px;
    height: 49px;
    margin-top: 134px;
  }
`;

const OuterDiv = styled.div`
  width: 100%;
  /* min-height: 320px; */
  background-color: transparent;
  margin-top: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 17px;
  flex-wrap: wrap;
  @media (max-width: 820px) {
    margin-top: 15px;
    gap: 12px;
    padding-bottom: 25px;
  }
`;

const OuterList = styled.div`
  width: 214px;
  height: 245px;
  background-color: gray;
  border-radius: 7px;
  overflow: hidden;
  box-shadow: 5px 5px rgba(0, 0, 0, 0.1);
  position: relative;
  margin-bottom: 50px;
  cursor: pointer;
  @media (max-width: 820px) {
    width: 164px;
    height: 150px;
    margin-bottom: 0px;
  }
`;

const OuterTextBox = styled.div`
  width: 214.93px;
  height: 106.8px;
  background-color: white;
  position: absolute;
  margin-top: 146.24px;
  text-align: center;
  @media (max-width: 820px) {
    width: 164px;
    height: 38px;
    margin-top: 112px;
  }
`;

const InnerNmb = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.4);
  margin-top: 10px;
  margin-left: 10px;
  border-radius: 10px;
  color: white;
  z-index: 3;
  font-weight: bold;
  @media (max-width: 820px) {
    margin-top: 0px;
    margin-left: 0px;
    border-radius: 5px;
  }
`;

const OuterMedalHeartBox = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  gap: 10px;
  margin-top: 113.65px;
  margin-left: 141.12px;
  position: absolute;
  @media (max-width: 820px) {
    margin-top: 82px;
    margin-left: 102px;
  }
`;

const OuterHeartImg = styled.img`
  width: 22.24px;
  height: 18.57px;
`;

const OuterHeartText = styled.p`
  font-size: 20.51px;
  margin-left: px;
  color: #ffffff;
  font-weight: bold;
  font-size: 17px;
`;

const MedalText = styled.h1`
  margin-top: 21px;
  /* margin-left: 60px; */
  font-size: 21px;
  font-weight: bold;
  text-align: center;
  @media (max-width: 820px) {
    margin-top: 15px;
  }
`;

const MedalSubText = styled.p`
  margin-top: 17.27px;
  margin-left: 27.79px;
  font-size: 12.7px;
`;

const MedalHeartBox = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  gap: 10px;
  margin-top: 137.33px;
  margin-left: 172.15px;
  position: absolute;
  @media (max-width: 820px) {
    margin-top: 97px;
    margin-left: 235px;
  }
`;

const HeartBox = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  /* @media (max-width: 820px) {
    
  } */
`;

const HeartImg = styled.img`
  width: 27.13px;
  height: 22.59px;
`;

const HeartText = styled.p`
  font-size: 20.51px;
  margin-left: 7.73px;
  color: #d6dcff;
  font-weight: bold;
`;

const OuterMedalText = styled.h1`
  margin-top: 21px;
  /* margin-left: 60px; */
  font-size: 17px;
  font-weight: bold;
  text-align: center;
  @media (max-width: 820px) {
    margin-top: 11px;
  }
`;

const OuterMedalSubText = styled.p`
  margin-top: 13px;
  font-size: 11px;
`;

const ListItemTitle = styled.p`
  margin-top: 30px;
  margin-left: 59px;
  font-size: 17px;
  color: #6478ff;
  font-weight: bold;
  @media (max-width: 820px) {
    margin-top: 16px;
    margin-left: 24px;
  }
`;

const ListTitleWrapper = styled.div`
  width: 100%;
  height: 100%;
`;
