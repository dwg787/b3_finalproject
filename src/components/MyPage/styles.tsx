import styled from 'styled-components';

//MyLikeList

const StTicketWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
`;

const StTicket = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

const StLikedBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 555.22px;
  box-sizing: border-box;
  padding: 0 108.42px 108.42px 108.42px;
`;

const StTicketCard = styled.div`
  width: 480.01px;
  height: 172.54px;
  margin: 0 0 18.8px 0;
  border-radius: 11.41px;
  align-items: center;
  clear: both;
  display: flex;
  flex-direction: row;
  background-size: contain;
  box-shadow: 3px 3px 5px grey;
`;

const StTicketCardLeft = styled.div`
  width: 254px;
  height: 172.54px;
  box-sizing: border-box;
  border-radius: 5px;
  /* position: relative; */
  cursor: pointer;
`;

const StTicketCardRight = styled.div`
  width: 226px;
  height: 172.54px;
  box-sizing: border-box;
  border-radius: 5px;
  flex-direction: column;
  display: flex;
  position: relative;
`;

const StMyTicketImage = styled.img`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border-radius: 11.41px;
  cursor: pointer;
  display: flex;
`;

const StCartTitle = styled.span`
  color: #4d4d4d;
  font-weight: 900;
  z-index: 100;
  font-size: 19.7px;
  line-height: 18.4px;
  margin: 22.15px 31.01px 11.21px 30.42px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const StCartTitleAdd = styled(StCartTitle)`
  margin: 0 31.01px 0 30.42px;
  font-size: 15.44px;
  line-height: 24.8px;
`;

const StCartMenu = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 15.75px;
  line-height: 14.1px;
  font-weight: 500;
  width: 62px;
  height: 33.54px;
  border-radius: 239.36px;
  background-color: rgba(77, 77, 77, 0.56);
  margin: 17.89px 18.58px 0 0;
`;

const StTicketHeader = styled.div`
  display: flex;
  justify-content: right;
  position: absolute;
  width: 254px;
  height: 172.54px;
`;

const StTicketHeader2 = styled.div`
  display: flex;
  justify-content: end;
  position: absolute;
  width: 226px;
  height: 172.54px;
  padding: 10px;
`;

const DelBtn = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

//PaginationList
const PaginationBox = styled.div`
  .pagination {
    display: flex;
    justify-content: center;
    margin: 41.63px 0 49.15px 0;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  ul.pagination li {
    display: inline-block;
    width: 9px;
    height: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 14.34px;
    margin: 6.6px;
  }

  ul.pagination li a {
    text-decoration: none;
    color: #909090;
    font-size: 1rem;
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

const LikedHeader = styled.div`
  font-size: 25.79px;
  line-height: 24.1px;
  margin-top: 58.2px;
  margin-bottom: 41.63px;
  font-weight: 900;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #4d4d4d;
  box-sizing: border-box;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 808.97px;
  box-sizing: border-box;
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
