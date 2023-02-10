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

const Recommendation = (propsData: any) => {
  const [recommendList, setRecommendList] = useState<recCnts>();

  const spotRecommendationList = async () => {
    const data = await getDocs(
      query(collection(db, 'recommendation'), orderBy('viewCnt', 'desc'))
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
        <RecommendListTitle>추천 관광지</RecommendListTitle>
        <RecommendListTitle>전체보기</RecommendListTitle>
      </RecommendListIntroWrapper>
      <RecommendListWrapper>
        {recommendList &&
          recommendList.map((e) => {
            return (
              <SpotDetail key={e.contentid} id={e.contentid} img={e.firstimage}>
                {e.title}
              </SpotDetail>
            );
          })}
      </RecommendListWrapper>
    </Container>
  );
};

export default Recommendation;

const Container = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  /* background-color: #d7d7d7; */
`;

const RecommendListIntroWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
`;

const RecommendListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const RecommendListTitle = styled.div``;
