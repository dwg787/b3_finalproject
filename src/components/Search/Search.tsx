import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Fuse from 'fuse.js';
import debounce from 'lodash/debounce';
import SpotDetail from '../SpotDetail';
import noimg from '../../assets/noimg.avif';
import Footer from '../Footer/Footer';
import search from '../../assets/dotbogi.png';

interface Result {
  score: number | undefined;
  item: { contentid: string; firstimage: string; title: string };
}

export default function Search() {
  //인풋 Value값을 STATE 로받음
  // const [searchItem, setSearchItem] = useState("");
  const [query, setQuery] = useState('');
  //모든객체를 가지고있음
  const [totalApi, setTotalApi] = useState([]);
  console.log(totalApi);
  //타이핑 되는 글자 근사치 검색
  const fuse = new Fuse(totalApi, {
    keys: ['addr1', 'title'],
    includeScore: true,
  });

  const results = fuse.search(query);

  // debounce=======================================================================================================================

  // const debounce = (callback, delay) => {
  //   let timerId = null;
  //   return (...args) => {
  //     if (timerId) clearTimeout(timerId);        프로젝트끝나면 열어보자!
  //     timerId = setTimeout(() => {
  //       callback(...args);
  //     }, delay);
  //   };
  // };

  const selectEventControl = (delay: number) => {
    return debounce((text: string) => setQuery(text), delay, {
      leading: false,
      trailing: true,
    });
  };

  const handleSearchText = useCallback(selectEventControl(400), []);

  const searchItemHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchText(e.currentTarget.value);
  };
  // ================================================================================================================================
  const fetchSpotSearchData = async () => {
    const res = await axios.get(
      `http://apis.data.go.kr/B551011/KorService/areaBasedList?numOfRows=4000&pageNo=1&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&listYN=Y&arrange=A&contentTypeId=12&areaCode=&sigunguCode=&cat1=A02&cat2=A0201&cat3=&_type=json`,
    );
    return setTotalApi(res.data.response.body.items.item);
  };

  useEffect(() => {
    fetchSpotSearchData();
  }, []);

  return (
    <BigContainerDiv>
      <ContainerDiv>
        <WrapDiv>
          <SearchTitleBox>
            <SearchTitleH1>검색하기</SearchTitleH1>
          </SearchTitleBox>

          <ListBoxInfinite>
            <InputBox>
              <SearchImg src={search} alt="" />
              <SearchInput
                placeholder="원하시는 장소를 검색하세요!"
                onChange={searchItemHandler}
              ></SearchInput>
              <RecommendH4>인기검색어 : 낙산사, 동대문, 강화문</RecommendH4>
            </InputBox>
            {results.map((e: any) => {
              if (e.score < 0.34) {
                // console.log(e);
                return (
                  <SpotDetail
                    key={e.item.contentid}
                    id={e.item.contentid}
                    img={e.item.firstimage || noimg}
                  >
                    {e.item.title}
                  </SpotDetail>
                );
              }
            })}
          </ListBoxInfinite>
        </WrapDiv>
        <Footer />
      </ContainerDiv>
    </BigContainerDiv>
  );
}
const BigContainerDiv = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0.69) -3.7%,
    #7c8dff 99.16%
  );
  position: relative;
`;

const SearchImg = styled.img`
  position: absolute;
  z-index: 100;
  margin-top: 30px;
  margin-left: 590px;
  @media screen and (max-width: 820px) {
    margin-left: 340px;
  }
  @media screen and (max-width: 390px) {
    margin-left: 280px;
  }
`;

const ContainerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: transparent;
  position: relative;
`;

const WrapDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 16.55px;
`;

const InputBox = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearchTitleH1 = styled.h1`
  font-size: 19px;
  color: #6478ff;
  font-weight: bold;
  margin-bottom: 19.45px;
`;

const SearchTitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1036px;
  width: 100%;
  border-bottom: 1px solid #6478ff;
  position: relative;
`;

const SearchInput = styled.input`
  width: 644px;
  height: 34px;
  border-radius: 25px;
  text-indent: 23px;
  margin-top: 50px;
  border: 1px solid #d9d9d9;
  box-shadow: 1.62121px 1.62121px 1.62121px rgba(0, 0, 0, 0.15);
  transition: all ease-in-out 0.15s;
  &:focus {
    outline: 1px solid #666666;
    box-shadow: 1.62121px 1.62121px 1.62121px rgba(0, 0, 0, 0.15);
  }
  @media screen and (max-width: 820px) {
    width: 400px;
  }
  @media screen and (max-width: 390px) {
    width: 340px;
  }
`;

const RecommendH4 = styled.h4`
  margin-top: 10px;
  color: #818181;
  font-size: 12px;
`;

const ListBoxInfinite = styled.div`
  max-width: 1036px;
  width: 100%;
  min-height: 600px;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  background: rgba(255, 255, 255, 0.3);
  box-shadow: 2.25708px 2.25708px 5.6427px rgba(0, 0, 0, 0.18);
  border-radius: 0px 0px 11px 11px;
`;
