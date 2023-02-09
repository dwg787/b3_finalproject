import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  fetchSpotDetailData,
  fetchNearStayData,
  fetchNearRestaurantData,
  fetchSpotData,
} from "../../apis/publicAPI";

export default function Search() {
  const [searchItem, setSearchItem] = useState("");

  const param = useParams();

  const searchItemHandler = (e) => {
    setSearchItem(e.target.value);
  };

  const { data, isLoading } = useQuery("region", fetchSpotData());

  console.log(data, isLoading);

  return (
    <>
      <ContainerDiv>
        <WrapDiv>
          <SearchTitleH1>어떤걸 찾는가?</SearchTitleH1>
          <SearchInput
            placeholder="여기에 입력하면 무엇이던지 찾을수있지!"
            target={searchItem}
            onChange={searchItemHandler}
          ></SearchInput>
          <RecommendH4>
            인기검색어 : 살려주세요, 정신나갈거같아, 취업할수있을까?
          </RecommendH4>
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

const SearchTitleH1 = styled.h1``;

const SearchInput = styled.input`
  width: 700px;
  height: 50px;
  border-radius: 25px;
  text-indent: 50px;
`;

const RecommendH4 = styled.h4``;
