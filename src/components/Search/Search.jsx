import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import Fuse from 'fuse.js';
import _ from 'lodash';
import SpotDetail from '../SpotDetail';
import noimg from '../../assets/noimg.avif';

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

  const selectEventControl = (delay) => {
    return _.debounce((text) => setQuery(text), delay, {
      leading: false,
      trailing: true,
    });
  };

  const handleSearchText = useCallback(selectEventControl(400), []);

  const searchItemHandler = (e) => {
    handleSearchText(e.target.value);
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
    <>
      <ContainerDiv>
        <WrapDiv>
          <SearchTitleBox>
            <SearchTitleH1>검색하기</SearchTitleH1>
          </SearchTitleBox>

          <ListBoxInfinite>
            <InputBox>
              <SearchInput
                placeholder="원하시는 장소를 검색하세요!"
                onChange={searchItemHandler}
              ></SearchInput>
              <RecommendH4>인기검색어 : 낙산사, 동대문, 강화문</RecommendH4>
            </InputBox>
            {results.map((e) => {
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
      </ContainerDiv>
    </>
  );
}

const ContainerDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-bottom: 440px;
`;

const WrapDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
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
  font-size: 30px;
  color: #6478ff;
  font-weight: bold;
  margin-bottom: 10px;
`;

const SearchTitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #6478ff;
`;

const SearchInput = styled.input`
  width: 700px;
  height: 120px;
  border-radius: 25px;
  text-indent: 50px;
  margin-top: 50px;
  border: 1px solid #d9d9d9;
  box-shadow: 5px 5px #d9d9d9be;
  transition: all ease-in-out 0.15s;
  &:focus {
    outline: 1px solid #666666;
    box-shadow: 5px 5px #d9d9d9be;
  }
`;

const RecommendH4 = styled.h4`
  margin-top: 10px;
  color: #666666;
`;

const ListBoxInfinite = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
`;
