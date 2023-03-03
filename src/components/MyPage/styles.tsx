import styled from 'styled-components';

//MyLikeList

const StTicketWrap = styled.div`
  width: 100%;
  height: 680px;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  @media screen and (max-width: 820px) {
    width: 100%;
    /* height: 560px; */
  }
`;

const StTicket = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  /* height: 680px; */
  box-sizing: border-box;
  /* position: relative; */
  @media screen and (max-width: 820px) {
    width: 100%;
  }
`;

const StLikedBox = styled.div`
  display: grid;
  /* position: relative; */
  grid-template-columns: repeat(2, 403px);
  grid-template-rows: repeat(3, 144px);
  justify-items: center;
  align-items: center;
  column-gap: 46px;
  row-gap: 16px;
  width: 100%;
  height: 464px;
  box-sizing: border-box;
  padding: 0 92px 97px 92px;
  @media screen and (max-width: 820px) {
    width: 100%;
    /* height: 464px; */
    display: grid;
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(1, 338px);
    grid-template-rows: repeat(4, 120px);
    row-gap: 11px;
  }
`;

const StTicketCard = styled.div`
  width: 403px;
  height: 144px;
  margin: 0 0 16px 0;
  border-radius: 9px;
  align-items: center;
  clear: both;
  display: flex;
  flex-direction: row;
  background-size: contain;
  box-shadow: 1px 1px 3px #d1d1d1;
  @media screen and (max-width: 820px) {
    width: 338px;
    height: 120px;
    /* margin: 0 0 16px 0; */
    border-radius: 8px;
    align-items: center;
    clear: both;
    display: flex;
    /* flex-direction: row; */
    background-size: contain;
    box-shadow: 1px 1px 3px #d1d1d1;
  }
`;

const StTicketCardLeft = styled.div`
  width: 214px;
  height: 144px;
  box-sizing: border-box;
  border-radius: 5px;
  position: relative;
  cursor: pointer;
  @media screen and (max-width: 820px) {
    width: 179px;
    height: 120px;
    box-sizing: border-box;
    border-radius: 8px;
    position: relative;
    cursor: pointer;
  }
`;

const StTicketCardRight = styled.div`
  width: 189px;
  height: 144px;
  box-sizing: border-box;
  border-radius: 5px;
  flex-direction: column;
  display: flex;
  position: relative;
  @media screen and (max-width: 820px) {
    width: 159px;
    height: 120px;
    box-sizing: border-box;
    border-radius: 8px;
    flex-direction: column;
    display: flex;
    position: relative;
  }
`;

const StMyTicketImage = styled.img`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 11.41px;
  cursor: pointer;
  display: flex;
  @media screen and (max-width: 820px) {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
  }
`;

const StCartTitle = styled.span`
  color: #4d4d4d;
  font-weight: 900;
  z-index: 100;
  font-size: 16.57px;
  line-height: 15.5px;
  margin: 18px 39.24px 10px 24.7px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  @media screen and (max-width: 820px) {
    color: #4d4d4d;
    font-weight: medium;
    z-index: 100;
    font-size: 14px;
    line-height: 13px;
    margin: 15px 20px 7px 21px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const StCartTitleAdd = styled(StCartTitle)`
  margin: 0 25.3px 0 30.42px;
  font-size: 12.98px;
  line-height: 20.9px;
  @media screen and (max-width: 820px) {
    margin: 0 20px 0 21px;
    font-size: 11px;
    line-height: 17.5px;
  }
`;

const StCartMenu = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 13.25px;
  line-height: 11.9px;
  font-weight: 500;
  width: 52.1px;
  height: 27.79px;
  border-radius: 201.28px;
  background-color: rgba(77, 77, 77, 0.56);
  margin: 14.89px 16.62px 0 0;
  @media screen and (max-width: 820px) {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 12px;
    line-height: 10px;
    font-weight: 500;
    width: 43px;
    height: 23px;
    border-radius: 169px;
    background-color: rgba(77, 77, 77, 0.56);
    margin: 12px 15px 0 0;
  }
`;

const StTicketHeader = styled.div`
  display: flex;
  justify-content: right;
  position: absolute;
  width: 214px;
  /* height: 144px; */
  @media screen and (max-width: 820px) {
    width: 179px;
  }
`;

const StTicketHeader2 = styled.div`
  display: flex;
  justify-content: end;
  position: absolute;
  width: 189px;
  padding: 13.09px 14.29px 0 0;
  @media screen and (max-width: 820px) {
    width:159px
    padding: 8px 9px 0 0;
  }
`;

const DelBtn = styled.img`
  width: 24px;
  height: 24px;
  /* margin: 13.09px 14.29px 0 0; */
  cursor: pointer;
  @media screen and (max-width: 820px) {
    width: 16px;
    height: 16px;
  }
`;

//PaginationList
const PaginationBox = styled.div`
  /* position: absolute; */

  .pagination {
    display: flex;
    justify-content: center;
    margin: 38px 0 44px 0;
    @media screen and (max-width: 820px) {
      margin-top: 50px;
    }
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 7px;
    height: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 12px;
    margin: 5.5px;
    line-height: 16px;
  }

  ul.pagination li a {
    text-decoration: none;
    color: #909090;
    font-size: 12px;
  }
  ul.pagination li.active a {
    color: #6478ff;
  }

  ul.pagination li a:hover,
  ul.pagination li a.active {
    color: #6478ff;
  }
`;

//MyFav
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 680px;
  box-sizing: border-box;
  @media screen and (max-width: 820px) {
    width: 100%;
    /* height: 560px; */
  }
`;

const LikedHeader = styled.div`
  font-size: 21.68px;
  line-height: 20.3px;
  margin-top: 47px;
  margin-bottom: 51px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4d4d4d;
  box-sizing: border-box;
  @media screen and (max-width: 820px) {
    display: none;
  }
`;

export {
  StTicketWrap,
  StTicket,
  StLikedBox,
  StTicketCard,
  StTicketCardLeft,
  StTicketCardRight,
  StMyTicketImage,
  StCartTitle,
  StCartTitleAdd,
  StCartMenu,
  StTicketHeader,
  StTicketHeader2,
  DelBtn,
  PaginationBox,
  LikedHeader,
  Container,
};
