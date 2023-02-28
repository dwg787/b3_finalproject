import axios from 'axios';
import { Params } from 'react-router-dom';

export interface recCnt {
  [key: string]: string;
}

export type FetchedStayDataType = Omit<recCnt, 'viewCnt' | 'likeCnt'>;

export interface recCnts extends Array<recCnt> {}

//메인페이지 지역별 필터를 위한 관광지 api
export const fetchSpotData = async ({
  region,
  spotCurPage,
}: {
  region: string;
  spotCurPage: number;
}) => {
  const res = await axios.get(
    `http://apis.data.go.kr/B551011/KorService/areaBasedList?numOfRows=8&pageNo=${spotCurPage}&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&listYN=Y&arrange=A&contentTypeId=12&areaCode=${region}&sigunguCode=&cat1=A02&cat2=A0201&cat3=&_type=json`,
  );
  return res.data.response.body;
};

//모바일 반응형 메인페이지 지역별 필터를 위한 관광지 api
export const fetchMobileSpotData = async ({
  region,
  pageParam,
}: {
  region: string;
  pageParam: number;
}) => {
  const res = await axios.get(
    `http://apis.data.go.kr/B551011/KorService/areaBasedList?numOfRows=8&pageNo=${pageParam}&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&listYN=Y&arrange=A&contentTypeId=12&areaCode=${region}&sigunguCode=&cat1=A02&cat2=A0201&cat3=&_type=json`,
  );
  return res.data.response.body;
};

//메인페이지 지역별 필터를 위한 숙박 api
export const fetchStayData = async ({
  region,
  stayCurPage,
}: {
  region: string;
  stayCurPage: number;
}) => {
  const res = await axios.get(
    `http://apis.data.go.kr/B551011/KorService/areaBasedList?numOfRows=8&pageNo=${stayCurPage}&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&listYN=Y&arrange=A&contentTypeId=32&areaCode=${region}&sigunguCode=&cat1=B02&cat2=B0201&cat3=&_type=json`,
  );
  return res.data.response.body;
};

//메인페이지 지역별 필터를 위한 레스토랑 api
export const fetchRestaurantData = async ({
  region,
  restCurPage,
}: {
  region: string;
  restCurPage: number;
}) => {
  const res = await axios.get(
    `http://apis.data.go.kr/B551011/KorService/areaBasedList?numOfRows=8&pageNo=${restCurPage}&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&listYN=Y&arrange=A&contentTypeId=39&areaCode=${region}&sigunguCode=&cat1=A05&cat2=A0502&cat3=&_type=json`,
  );
  return res.data.response.body;
};

//검색페이지 api
export const fetchSpotSearchData = async () => {
  const res = await axios.get(
    `http://apis.data.go.kr/B551011/KorService/areaBasedList?numOfRows=4000&pageNo=1&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&listYN=Y&arrange=A&contentTypeId=12&areaCode=&sigunguCode=&cat1=A02&cat2=A0201&cat3=&_type=json`,
  );
  return res.data.response.body.items.item;
};

//상세페이지 관광지 api
export const fetchSpotDetailData = async ({
  param,
}: {
  param: Readonly<Params<string>>;
}) => {
  const res = await axios.get(
    `http://apis.data.go.kr/B551011/KorService/detailCommon?ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&contentTypeId=12&contentId=${param.id}&MobileOS=ETC&MobileApp=AppTest&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&_type=json`,
  );
  return res.data.response.body.items.item[0];
};

//상세페이지 주변 관광지 api
export const fetchNearSpotData = async ({
  mapx,
  mapy,
}: {
  mapx: string;
  mapy: string;
}) => {
  try {
    const res = await axios.get(
      `https://apis.data.go.kr/B551011/KorService/locationBasedList?ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&contentTypeId=12&mapX=${mapx}&mapY=${mapy}&radius=20000&listYN=Y&MobileOS=ETC&MobileApp=AppTest&arrange=A&numOfRows=12&pageNo=1&_type=json`,
    );
    return res.data.response.body.items.item;
  } catch (err) {
    console.log(err);
  }
};

//상세페이지 주변 숙박 api
export const fetchNearStayData = async ({
  mapx,
  mapy,
}: {
  mapx: string;
  mapy: string;
}) => {
  try {
    const res = await axios.get(
      `https://apis.data.go.kr/B551011/KorService/locationBasedList?ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&contentTypeId=32&mapX=${mapx}&mapY=${mapy}&radius=20000&listYN=Y&MobileOS=ETC&MobileApp=AppTest&arrange=A&numOfRows=12&pageNo=1&_type=json`,
    );
    return res.data.response.body.items.item;
  } catch (err) {
    console.log(err);
  }
};

//상세페이지 주변 맛집 api
export const fetchNearRestaurantData = async ({
  mapx,
  mapy,
}: {
  mapx: string;
  mapy: string;
}) => {
  try {
    const res = await axios.get(
      `http://apis.data.go.kr/B551011/KorService/locationBasedList?ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&contentTypeId=39&mapX=${mapx}&mapY=${mapy}&radius=20000&listYN=Y&MobileOS=ETC&MobileApp=AppTest&arrange=A&numOfRows=12&pageNo=1&_type=json`,
    );
    return res.data.response.body.items.item;
  } catch (err) {
    console.log(err);
  }
};

//맛집 상세내용
export const fetchRestaurantDetailInfo = async ({
  param,
}: {
  param: Readonly<Params<string>>;
}) => {
  const res = await axios.get(
    `http://apis.data.go.kr/B551011/KorService/detailCommon?ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&contentTypeId=39&contentId=${param.id}&MobileOS=ETC&MobileApp=AppTest&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&_type=json`,
  );
  return res.data.response.body.items.item[0];
};

//숙박 상세내용
export const fetchStayDetailInfo = async ({
  param,
}: {
  param: Readonly<Params<string>>;
}) => {
  const res = await axios.get(
    `http://apis.data.go.kr/B551011/KorService/detailCommon?ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&contentTypeId=32&contentId=${param.id}&MobileOS=ETC&MobileApp=AppTest&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&_type=json`,
  );
  return res.data.response.body.items.item[0];
};

//관광지, 숙박, 음식점 다 불러오기 (관리자용)
//메인페이지 api
export const fetchAllSpotData = async () => {
  const res = await axios.get(
    `http://apis.data.go.kr/B551011/KorService/areaBasedList?numOfRows=4000&pageNo=1&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&listYN=Y&arrange=A&contentTypeId=12&areaCode=&sigunguCode=&cat1=A02&cat2=A0201&cat3=&_type=json`,
  );
  return res.data.response.body.items.item;
};

//숙박 api
export const fetchAllStayData = async () => {
  const res = await axios.get(
    `http://apis.data.go.kr/B551011/KorService/areaBasedList?numOfRows=3500&pageNo=1&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&listYN=Y&arrange=A&contentTypeId=32&areaCode=&sigunguCode=&cat1=B02&cat2=B0201&cat3=&_type=json`,
  );
  return res.data.response.body.items.item;
};

//레스토랑 api
export const fetchAllRestaurantData = async () => {
  const res = await axios.get(
    `http://apis.data.go.kr/B551011/KorService/areaBasedList?numOfRows=17300&pageNo=1&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&listYN=Y&arrange=A&contentTypeId=39&areaCode=&sigunguCode=&cat1=A05&cat2=A0502&cat3=&_type=json`,
  );
  return res.data.response.body.items.item;
};

//숙박 상세 소개정보
export const fetchStayAdditionalInfo1 = async ({
  param,
}: {
  param: Readonly<Params<string>>;
}) => {
  const res = await axios.get(
    `http://apis.data.go.kr/B551011/KorService/detailIntro?ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&contentTypeId=32&contentId=${param.id}&MobileOS=ETC&MobileApp=AppTest&_type=json`,
  );
  return res.data.response.body.items.item[0];
};

//숙박 룸 관련 정보
export const fetchStayAdditionalInfo2 = async ({
  param,
}: {
  param: Readonly<Params<string>>;
}) => {
  const res = await axios.get(
    `http://apis.data.go.kr/B551011/KorService/detailInfo?ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&contentTypeId=32&contentId=${param.id}&MobileOS=ETC&MobileApp=AppTest&_type=json`,
  );
  return res.data.response.body.items.item;
};
