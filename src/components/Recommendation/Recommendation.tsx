import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
// import { fetchSpotSearchData } from '../../apis/publicAPI';
import { db } from '../../apis/firebase';
import { getDocs, collection, DocumentData } from 'firebase/firestore';
import { useRecoilValue } from 'recoil';
import { regionSelectionState } from '../../recoil/apiDataAtoms';

const Recommendation = (propsData: any) => {
  // const region = useRecoilValue(regionSelectionState);
  // const { data, isLoading } = useQuery(['recommendation_key'], fetchSpotSearchData);
  // console.log('메인페이지에서 추천 컴포넌트로', propsData); //지역별로 정제된 데이터

  const spotRecommendationList = async () => {
    const data = await getDocs(collection(db, 'recommendation'));
    const res = data.docs.map((doc: DocumentData) => {
      return {
        ...doc.data(),
      };
    });
    // console.log('추천리스트', res);
    return res;
  };

  useEffect(() => {
    // spotRecommendationList();
    const fetchRecList = async () => {
      const res = await spotRecommendationList();
      console.log('추천리스트', res);
    };
    fetchRecList();
  }, []);

  // console.log('추천 컴포넌트 데이터', data);
  return (
    <Container>
      {/* {data.items.item.filter((e)=>{
      // return e.contentid === res.map((e)=>e.id)
    })} */}
    </Container>
  );
};

export default Recommendation;

const Container = styled.div`
  width: 100%;
  height: 500px;
  background-color: #d7d7d7;
`;
