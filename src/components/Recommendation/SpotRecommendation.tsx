import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from '../../apis/firebase';
import {
  getDocs,
  collection,
  DocumentData,
  orderBy,
  query,
} from 'firebase/firestore';
import SpotDetail from '../SpotDetail';
import { recCnts } from '../../apis/publicAPI';
import { Link } from 'react-router-dom';
const SpotRecommendation = (propsData: any) => {
  const [recommendList, setRecommendList] = useState<recCnts>();
  const spotRecommendationList = async () => {
    const data = await getDocs(
      query(collection(db, 'recommendation'), orderBy('viewCnt', 'desc')),
    );
    const res = data.docs.map((doc: DocumentData) => {
      return {
        ...doc.data(),
      };
    });
    return res;
  };
  useEffect(() => {
    const fetchRecList = async () => {
      const res = await spotRecommendationList();
      setRecommendList(res);
    };
    fetchRecList();
  }, []);

  return (
    <Container>
      <RecommendListIntroWrapper>
        <RecommendListTitle>나만 알고 싶은 감성 스팟</RecommendListTitle>
      </RecommendListIntroWrapper>
      <RecommendListWrapper>
        <SliderDiv>
          {recommendList &&
            recommendList.slice(0, 10).map((e) => {
              return (
                <SpotDetail
                  key={e.contentid}
                  id={e.contentid}
                  img={e.firstimage}
                >
                  {e.title}
                </SpotDetail>
              );
            })}
        </SliderDiv>
      </RecommendListWrapper>
      {/* <Slider {...settings}>
        {recommendList &&
          recommendList.slice(0, 10).map((e) => {
            return (
              <SpotDetail key={e.contentid} id={e.contentid} img={e.firstimage}>
                {e.title}
              </SpotDetail>
            );
          })}
      </Slider> */}
    </Container>
  );
};
export default SpotRecommendation;
const SliderDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
  height: 300px;
  float: left;
`;
const Container = styled.div`
  width: 90%;
  height: 580px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 70px;
  padding-top: 40px;
  border: 1.5px solid #6478ff;
  border-radius: 50px;
  box-shadow: 5px 5px #c8c8c8;
  overflow: hidden;
  background-color: white;
`;
const RecommendListIntroWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`;
const RecommendListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;
const RecommendListTitle = styled.div`
  margin-left: 70px;
  color: #6478ff;
  font-size: 20px;
  font-weight: bold;
`;
const RecommendListLink = styled(Link)`
  margin-right: 10px;
  margin-top: 10px;
  text-decoration: none;
`;
