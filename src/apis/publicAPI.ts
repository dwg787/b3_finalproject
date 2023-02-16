import axios from 'axios';
import { Params } from 'react-router-dom';

export interface FetchedStayDataType {
  [key: string]: string;
}

interface recCnt {
  [key: string]: string;
  // viewCnt: number;
}
// type recCntWithViewCnt = Omit<recCnt, 'viewCnt'>;

export interface recCnts extends Array<recCnt> {}

//메인페이지 api
export const fetchSpotData = async ({
  region,
  pageParam,
}: {
  region: string;
  pageParam: string;
}) => {
  // console.log('recoil에 의해 변경되는 전역 상태 값:', stay);
  const res = await axios.get(
    `http://apis.data.go.kr/B551011/KorService/areaBasedList?numOfRows=8&pageNo=${pageParam}&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&listYN=Y&arrange=A&contentTypeId=12&areaCode=${region}&sigunguCode=&cat1=A02&cat2=A0201&cat3=&_type=json`,
    // `http://apis.data.go.kr/B551011/KorService/areaBasedList?numOfRows=12&pageNo=1&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&listYN=Y&arrange=A&contentTypeId=32&areaCode=${region}&sigunguCode=&cat1=B02&cat2=B0201&cat3=${stay}&_type=json`
    // `http://apis.data.go.kr/B551011/KorService/searchStay?areaCode=${region}&sigunguCode=&ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&listYN=Y&MobileOS=ETC&MobileApp=AppTest&arrange=A&numOfRows=12&pageNo=1&_type=json`
  );
  return res.data.response.body;
};

//숙박 api
export const fetchStayData = async ({
  region,
  pageParam,
}: {
  region: string;
  pageParam: string;
}) => {
  // console.log('recoil에 의해 변경되는 전역 상태 값:', stay);
  const res = await axios.get(
    `http://apis.data.go.kr/B551011/KorService/areaBasedList?numOfRows=8&pageNo=${pageParam}&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&listYN=Y&arrange=A&contentTypeId=32&areaCode=${region}&sigunguCode=&cat1=B02&cat2=B0201&cat3=&_type=json`,
    // `http://apis.data.go.kr/B551011/KorService/areaBasedList?numOfRows=12&pageNo=1&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&listYN=Y&arrange=A&contentTypeId=32&areaCode=${region}&sigunguCode=&cat1=B02&cat2=B0201&cat3=${stay}&_type=json`
    // `http://apis.data.go.kr/B551011/KorService/searchStay?areaCode=${region}&sigunguCode=&ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&listYN=Y&MobileOS=ETC&MobileApp=AppTest&arrange=A&numOfRows=12&pageNo=1&_type=json`
  );
  return res.data.response.body;
};

//레스토랑 api
export const fetchRestaurantData = async ({
  region,
  pageParam,
}: {
  region: string;
  pageParam: string;
}) => {
  // console.log('recoil에 의해 변경되는 전역 상태 값:', stay);
  const res = await axios.get(
    `http://apis.data.go.kr/B551011/KorService/areaBasedList?numOfRows=8&pageNo=${pageParam}&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&listYN=Y&arrange=A&contentTypeId=39&areaCode=${region}&sigunguCode=&cat1=A05&cat2=A0502&cat3=&_type=json`,
    // `http://apis.data.go.kr/B551011/KorService/areaBasedList?numOfRows=12&pageNo=1&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&listYN=Y&arrange=A&contentTypeId=32&areaCode=${region}&sigunguCode=&cat1=B02&cat2=B0201&cat3=${stay}&_type=json`
    // `http://apis.data.go.kr/B551011/KorService/searchStay?areaCode=${region}&sigunguCode=&ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&listYN=Y&MobileOS=ETC&MobileApp=AppTest&arrange=A&numOfRows=12&pageNo=1&_type=json`
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
  // console.log('param', param, typeof param);
  const res = await axios.get(
    // `http://apis.data.go.kr/B551011/KorService/detailCommon?ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&contentTypeId=12&contentId=${param}&MobileOS=ETC&MobileApp=AppTest&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&_type=json`
    `http://apis.data.go.kr/B551011/KorService/detailCommon?ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&contentTypeId=12&contentId=${param.id}&MobileOS=ETC&MobileApp=AppTest&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&_type=json`,
  );
  return res.data.response.body.items.item[0];
};

//상세페이지 주변 숙박 api
export const fetchNearStayData = async ({
  mapx,
  mapy,
}: {
  mapx: string;
  mapy: string;
}) => {
  const res = await axios.get(
    `https://apis.data.go.kr/B551011/KorService/locationBasedList?ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&contentTypeId=32&mapX=${mapx}&mapY=${mapy}&radius=20000&listYN=Y&MobileOS=ETC&MobileApp=AppTest&arrange=A&numOfRows=12&pageNo=1&_type=json`,
    // `http://apis.data.go.kr/B551011/KorService/areaBasedList?numOfRows=12&pageNo=1&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&listYN=Y&arrange=A&contentTypeId=32&areaCode=&sigunguCode=&mapX=${mapx}&mapY=${mapy}&radius=5000&cat1=B02&cat2=B0201&cat3=B02010100&_type=json`
  );
  return res.data.response.body.items.item;
};

//상세페이지 주변 맛집 api
export const fetchNearRestaurantData = async ({
  mapx,
  mapy,
}: {
  mapx: string;
  mapy: string;
}) => {
  const res = await axios.get(
    `http://apis.data.go.kr/B551011/KorService/locationBasedList?ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&contentTypeId=39&mapX=${mapx}&mapY=${mapy}&radius=20000&listYN=Y&MobileOS=ETC&MobileApp=AppTest&arrange=A&numOfRows=12&pageNo=1&_type=json`,
  );
  return res.data.response.body.items.item;
};

//맛집 상세내용
export const fetchRestaurantDetailInfo = async ({
  param,
}: {
  param: Readonly<Params<string>>;
}) => {
  const res = await axios.get(
    `http://apis.data.go.kr/B551011/KorService/detailCommon?ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&contentTypeId=39&contentId=${param.id}&MobileOS=ETC&MobileApp=AppTest&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&_type=json`,
    // `http://apis.data.go.kr/B551011/KorService/locationBasedList?ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&contentTypeId=39&mapX=${mapx}&mapY=${mapy}&radius=20000&listYN=Y&MobileOS=ETC&MobileApp=AppTest&arrange=A&numOfRows=12&pageNo=1&_type=json`
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
  console.log('관광지 모든 데이터?', res.data.response.body.items.item);
  return res.data.response.body.items.item;
};

//숙박 api
export const fetchAllStayData = async () => {
  const res = await axios.get(
    `http://apis.data.go.kr/B551011/KorService/areaBasedList?numOfRows=3500&pageNo=1&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&listYN=Y&arrange=A&contentTypeId=32&areaCode=&sigunguCode=&cat1=B02&cat2=B0201&cat3=&_type=json`,
  );
  console.log('숙박 모든 데이터?', res.data.response.body.items.item);
  return res.data.response.body.items.item;
};

//레스토랑 api
export const fetchAllRestaurantData = async () => {
  const res = await axios.get(
    `http://apis.data.go.kr/B551011/KorService/areaBasedList?numOfRows=17300&pageNo=1&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&listYN=Y&arrange=A&contentTypeId=39&areaCode=&sigunguCode=&cat1=A05&cat2=A0502&cat3=&_type=json`,
  );
  console.log('레스토랑 모든 데이터?', res.data.response.body.items.item);
  return res.data.response.body.items.item;
};
