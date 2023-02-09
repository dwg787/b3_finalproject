import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Fuse from "fuse.js";

export default function Search() {
  //인풋 Value값을 STATE 로받음
  // const [searchItem, setSearchItem] = useState("");
  const [query, setQuery] = useState("");
  //모든객체를 가지고있음
  const [totalApi, setTotalApi] = useState([]);

  //인풋 value 값 SETstate에 넣기

  const fuse = new Fuse(totalApi, {
    keys: ["addr1", "title"],
    includeScore: true,
  });

  const results = fuse.search(query);
  // const titleResults = results.map((result) => result.score);
  // console.log(titleResults);
  // console.log(results);

  const searchItemHandler = ({ currentTarget = {} }) => {
    const { value } = currentTarget;
    setQuery(value);
  };

  const fetchSpotSearchData = async () => {
    // console.log('recoil에 의해 변경되는 전역 상태 값:', stay);
    const res = await axios.get(
      `http://apis.data.go.kr/B551011/KorService/areaBasedList?numOfRows=4000&pageNo=1&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&listYN=Y&arrange=A&contentTypeId=12&areaCode=&sigunguCode=&cat1=A02&cat2=A0201&cat3=&_type=json`
    );
    return setTotalApi(res.data.response.body.items.item);
  };
  // console.log(searchItem);
  // console.log(totalApi);

  useEffect(() => {
    fetchSpotSearchData();
    // setQuery(value);
  }, []);

  return (
    <>
      <ContainerDiv>
        <WrapDiv>
          <InputBox>
            <SearchTitleH1>어떤걸 찾는가?</SearchTitleH1>
            <SearchInput
              placeholder="여기에 입력하면 무엇이던지 찾을수있지!"
              // target={searchItem}
              value={query}
              onChange={searchItemHandler}
            ></SearchInput>
            <RecommendH4>
              인기검색어 : 살려주세요, 정신나갈거같아, 취업할수있을까?
            </RecommendH4>
          </InputBox>
          {results.map((item) => {
            // return (
            //   <>
            //     <p>{item.title}</p>
            //   </>
            // );
            if (item.score < 0.4) {
              console.log(item.score);
              return (
                <>
                  <p key={item.key}>{item.item.title}</p>
                </>
              );
            }
          })}
        </WrapDiv>
      </ContainerDiv>
    </>
  );
}

const ContainerDiv = styled.div`
  width: 100%;
  height: 100vh;
  background-color: blue;
`;

const WrapDiv = styled.div`
  width: 80%;
  height: 100%;
  background-color: gray;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
`;

const InputBox = styled.div`
  width: 100%;
  height: 120px;
`;

const SearchTitleH1 = styled.h1`
  font-size: 30px;
`;

const SearchInput = styled.input`
  width: 700px;
  height: 50px;
  border-radius: 25px;
  text-indent: 50px;
`;

const RecommendH4 = styled.h4``;
