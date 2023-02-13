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
import StayDetail from '../StayDetail';
import { recCnts } from '../../apis/publicAPI';
import { Link } from 'react-router-dom';

const StayRecommendation = (propsData: any) => {
  const [recommendList, setRecommendList] = useState<recCnts>();

  const stayRecommendationList = async () => {
    const data = await getDocs(
      query(collection(db, 'stay_recommendation'), orderBy('viewCnt', 'desc'))
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
      const res = await stayRecommendationList();
      setRecommendList(res);
    };
    fetchRecList();
  }, []);

  return (
    <Container>
      <RecommendListIntroWrapper>
        <RecommendListTitle>추천 숙박 TOP 10</RecommendListTitle>
        <RecommendListLink to={'/my'}>전체보기</RecommendListLink>
      </RecommendListIntroWrapper>
      <RecommendListWrapper>
        {recommendList &&
          recommendList.slice(0, 10).map((e) => {
            return (
              <StayDetail key={e.contentid} id={e.contentid} img={e.firstimage}>
                {e.title}
              </StayDetail>
            );
          })}
      </RecommendListWrapper>
    </Container>
  );
};

export default StayRecommendation;

const Container = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* background-color: #d7d7d7; */
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
  margin-left: 10px;
  margin-top: 10px;
`;

const RecommendListLink = styled(Link)`
  margin-right: 10px;
  margin-top: 10px;
  text-decoration: none;
`;
