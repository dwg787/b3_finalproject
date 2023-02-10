import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Fuse from "fuse.js";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Search() {
  //인풋 Value값을 STATE 로받음
  // const [searchItem, setSearchItem] = useState("");
  const [query, setQuery] = useState("");
  //모든객체를 가지고있음
  const [totalApi, setTotalApi] = useState([]);

  //infinite scroll
  const [items, setItems] = useState(Array.from({ length: 7 }));
  const [infiniteItems, setInfiniteItems] = useState([]);
  console.log(items);

  const fuse = new Fuse(totalApi, {
    keys: ["addr1", "title"],
    includeScore: true,
  });

  const results = fuse.search(query);
  console.log(results);

  const searchItemHandler = ({ currentTarget = {} }) => {
    const { value } = currentTarget;
    setQuery(value);
  };

  const fetchSpotSearchData = async () => {
    const res = await axios.get(
      `http://apis.data.go.kr/B551011/KorService/areaBasedList?numOfRows=4000&pageNo=1&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&listYN=Y&arrange=A&contentTypeId=12&areaCode=&sigunguCode=&cat1=A02&cat2=A0201&cat3=&_type=json`
    );
    return setTotalApi(res.data.response.body.items.item);
  };

  const fetchData = () => {
    setInfiniteItems(totalApi);

    setTimeout(() => {
      setItems(items.concat(Array.from({ length: 7 })));
    }, 3000);
  };

  useEffect(() => {
    fetchSpotSearchData();
  }, []);

  useEffect(() => {
    fetchData();
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
          <ListBoxInfinite
            dataLength={items.length}
            next={fetchData}
            hasMore={true}
          >
            {results.map((item) => {
              if (item.score < 0.34) {
                console.log(item);
                return (
                  <>
                    <ListDiv key={item.key}>
                      <ListImg src={item.item.firstimage} alt="" />
                      {item.item.title}
                    </ListDiv>
                  </>
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
  width: 100%;
  height: 100vh;
`;

const WrapDiv = styled.div`
  width: 80%;
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
`;

const SearchInput = styled.input`
  width: 700px;
  height: 50px;
  border-radius: 25px;
  text-indent: 50px;
`;

const RecommendH4 = styled.h4``;

const ListBoxInfinite = styled(InfiniteScroll)`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;
`;

const ListDiv = styled.div`
  width: 250px;
  height: 300px;

  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ListImg = styled.img`
  width: 200px;
  height: 200px;
  margin-block-end: 10px;
`;
