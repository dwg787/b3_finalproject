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

const StayMainTap = () => {
  const navigate = useNavigate();
  const [rankList, setRankList] = useState<RankTypeList>([]);
  const stayRankList = async () => {
    const data = await getDocs(
      query(
        collection(db, 'stay_recommendation'),
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
    const fetchStayRankList = async () => {
      const res = await stayRankList();
      setRankList(res);
    };
    fetchStayRankList();
  }, []);

  return (
    <WrapDiv>
      <InnerDiv>
        {rankList ? (
          <>
            {rankList[0]?.likeCnt ? (
              <InnerList>
                <InnerImg
                  src={rankList[0]?.firstimage || noimg}
                  onClick={() => navigate(`/stay/${rankList[0]?.contentid}`)}
                />
                <MedalHeartBox>
                  <HeartImg src={redheart} />
                  <HeartText>{rankList[0]?.likeCnt}</HeartText>
                </MedalHeartBox>
                <InnerMedals src={one} alt="" />
                <InnerTextBox>
                  <MedalText>
                    {rankList[0]?.title.split(/[\\(\\[]/)[0]}
                  </MedalText>
                  <MedalSubText>
                    {rankList[0]?.overview.slice(0, 20)}...
                  </MedalSubText>
                </InnerTextBox>
              </InnerList>
            ) : (
              <InnerList>
                <InnerMedals src={one} alt="" />
                <InnerTextBox></InnerTextBox>
              </InnerList>
            )}
            {rankList[1]?.likeCnt ? (
              <InnerList>
                <InnerImg
                  src={rankList[1]?.firstimage || noimg}
                  onClick={() => navigate(`/stay/${rankList[1]?.contentid}`)}
                />
                <MedalHeartBox>
                  <HeartImg src={redheart} />
                  <HeartText>{rankList[1]?.likeCnt}</HeartText>
                </MedalHeartBox>
                <InnerMedals src={two} alt="" />
                <InnerTextBox>
                  <MedalText>
                    {rankList[1]?.title.split(/[\\(\\[]/)[0]}
                  </MedalText>
                  <MedalSubText>
                    {rankList[1]?.overview.slice(0, 20)}...
                  </MedalSubText>
                </InnerTextBox>
              </InnerList>
            ) : (
              <InnerList>
                <InnerMedals src={two} alt="" />
                <InnerTextBox></InnerTextBox>
              </InnerList>
            )}
            {rankList[2]?.likeCnt ? (
              <InnerList>
                <InnerImg
                  src={rankList[2]?.firstimage || noimg}
                  onClick={() => navigate(`/stay/${rankList[2]?.contentid}`)}
                />
                <MedalHeartBox>
                  <HeartImg src={redheart} />
                  <HeartText>{rankList[2]?.likeCnt}</HeartText>
                </MedalHeartBox>
                <InnerMedals src={three} alt="" />
                <InnerTextBox>
                  <MedalText>
                    {rankList[2]?.title.split(/[\\(\\[]/)[0]}
                  </MedalText>
                  <MedalSubText>
                    {rankList[2]?.overview.slice(0, 20)}...
                  </MedalSubText>
                </InnerTextBox>
              </InnerList>
            ) : (
              <InnerList>
                <InnerMedals src={three} alt="" />
                <InnerTextBox></InnerTextBox>
              </InnerList>
            )}
          </>
        ) : (
          <></>
        )}
      </InnerDiv>
      <OuterDiv>
        {rankList.slice(3, 7).map((e, i) => {
          if (e.likeCnt > 0) {
            return (
              <OuterList>
                <InnerNmb>{i + 4}</InnerNmb>
                <InnerImg
                  src={e.firstimage}
                  alt=""
                  onClick={() => navigate(`/stay/${e.contentid}`)}
                />
                <OuterMedalHeartBox>
                  <OuterHeartImg src={redheart} />
                  <OuterHeartText>{e.likeCnt}</OuterHeartText>
                </OuterMedalHeartBox>
                <OuterTextBox>
                  <MedalText>{e.title.split(/[\\(\\[]/)[0]}</MedalText>
                  <MedalSubText>{e.overview.slice(0, 20)}</MedalSubText>
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
    </WrapDiv>
  );
};

export default StayMainTap;

const WrapDiv = styled.div`
  max-width: 1036px;
  width: 100%;
  height: 725px;
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
  width: 904px;
  height: 360px;
  margin-top: 61px;
  border-radius: 11px;
  background: #d6dcff;
  box-shadow: 2.16px 2.16px 2.16px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 19px;
`;

const InnerList = styled.div`
  position: relative;
  width: 261px;
  height: 298px;
  background-color: gray;
  border-radius: 8px;
  box-shadow: 2.15833px 2.15833px 5.39583px rgba(0, 0, 0, 0.2);
  overflow: hidden;
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
`;

const OuterDiv = styled.div`
  width: 100%;
  height: 320px;
  background-color: transparent;
  margin-top: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 17px;
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
`;

const OuterTextBox = styled.div`
  width: 214.93px;
  height: 106.8px;
  background-color: white;
  position: absolute;
  margin-top: 146.24px;
  text-align: center;
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
`;

const OuterMedalHeartBox = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  gap: 10px;
  margin-top: 113.65px;
  margin-left: 141.12px;
  position: absolute;
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
`;

const HeartBox = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  gap: 10px;
  margin-top: 20px;
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
`;

const OuterMedalSubText = styled.p`
  margin-top: 13px;
  font-size: 11px;
`;
