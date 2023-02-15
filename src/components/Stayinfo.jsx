import React from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchNearStayData } from '../apis/publicAPI';
import Loader from './Loader/Loader';
import StayDetail from './StayDetail';
import noimg from '../assets/noimg.png';

const StayInfo = ({ spotData }) => {
  const { data: stayData, isLoading: isLoadingStay } = useQuery(
    ['stay_list', spotData],
    () => fetchNearStayData({ mapx: spotData.mapx, mapy: spotData.mapy }),
    {
      enabled: !!spotData,
    }
  );

  return (
    <>
      <div>주변 숙박정보</div>
      <Stres>
        {isLoadingStay ? (
          <Loader />
        ) : (
          <>
            {stayData ? (
              <>
                {stayData.slice(0, 5).map((item) => {
                  return (
                    <StayDetail
                      key={item.contentid}
                      id={item.contentid}
                      img={item.firstimage || noimg}
                    >
                      {item.title}
                    </StayDetail>
                  );
                })}
              </>
            ) : (
              <>
                <div>주변 숙박정보가 없습니다.</div>
              </>
            )}
          </>
        )}
      </Stres>
    </>
  );
};

export default StayInfo;

// const StayImage = styled.img`
//   width: 300px;
//   height: 200px;
// `;
const Stres = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin: 10px;

  /* padding: 20px;
  overflow: scroll; */

  /* 가로 스크롤 */
  /* overflow: auto;
  white-space: nowrap;
  &:-webkit-scrollbar {
    display: none;
  } */
`;

// const Stdata = styled.div`
//   display: flex;
//   justify-content: center;
//   flex-direction: column;
//   margin: 10px;
// `;

const SpotEachItemWrapper = styled.div`
  width: 18%;
  height: 200px;
  margin: 10px 10px 10px 10px;
  /* overflow: hidden;
  border-radius: 10px; */
`;

const SpotEachItemImg = styled.img`
  width: 200px;
  aspect-ratio: 1;
  border-radius: 10px;
  /* &:hover {
    transform: scale(1.4);
  } */
`;
