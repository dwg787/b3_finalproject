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
      <RecommendListTitle>추천 관광지</RecommendListTitle>
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
  background-color: #d7d7d7;
`;

const RecommendListWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const RecommendListTitle = styled.div`
  margin-left: 0;
`;
