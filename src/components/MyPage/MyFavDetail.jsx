import React, { useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { auth, db } from '../../apis/firebase';
import { doc, updateDoc, arrayRemove } from 'firebase/firestore';
import noimg from '../../assets/noimg.avif';
import { fetchSpotDetailData } from '../../apis/publicAPI';

const MyFavDetail = ({ title, getLiked }) => {
  const uid = auth.currentUser.uid;

  // 파이어베이스에 저장한 배열의 타이틀을 삭제해보자->이걸 delbookmark안으로?
  const delLiked = async () => {
    const docRef = doc(db, 'bookmarks', uid);
    console.log(docRef);

    await updateDoc(docRef, {
      bookmarks: arrayRemove(title),
    });
  };

  return (
    <StTicketCard>
      <StTicketCardLeft>
        <StTicketHeader>
          {/* <StCartMenu>음식점</StCartMenu> */}
          <button
            onClick={() => {
              delLiked()
                .then(() => {
                  window.alert('Like 삭제 완료');
                  getLiked();
                })
                .catch((e) => console.log(e));
            }}
          >
            삭제
          </button>
        </StTicketHeader>

        {/* <StMyTicketImage src={img || noimg} alt="사진" /> */}
      </StTicketCardLeft>
      <StCartTitle>{title}</StCartTitle>
    </StTicketCard>
  );
};

export default MyFavDetail;

const StTicketCard = styled.div`
  width: 200px;
  height: 200px;
  margin: 10px;

  box-sizing: border-box;
  border-radius: 10px;
  /* padding: 10px; */
  /* display: grid; */
  align-items: center;
  /* flex-direction: column; */
  clear: both;
  display: flex;
  justify-content: center;
  background-color: rgba(205, 99, 99, 0.5);
  background-size: contain;
`;

const StTicketCardLeft = styled.div`
  width: 200px;
  height: 200px;
  box-sizing: border-box;
  border-radius: 5px;
`;

const StMyTicketImage = styled.img`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  cursor: pointer;
  /* &:hover {
    transform: scale(1.1);
    transition: all 0.35s;
  } */
  position: relative;
  display: flex;

  box-shadow: 5px 5px 10px grey;
  opacity: 0.7;
`;

const StCartTitle = styled.span`
  position: absolute;
  color: #fafafa;
  font-weight: 900;
  z-index: 100;
  text-align: center;
`;

const StCartMenu = styled.span`
  color: #fafafa;
  font-weight: 900;
  z-index: 100;
  background-color: teal;
  margin-right: 130px;
`;

const StTicketHeader = styled.div`
  display: flex;
  justify-content: space-between;
  position: absolute;
  z-index: 100;
`;
