import axios from 'axios';
import { Params } from 'react-router-dom';

export interface FetchedStayDataType {
  [key: string]: string;
}

// export const fetchStayData = async () => {
//   const res = await axios.get(
//     `http://apis.data.go.kr/B551011/KorService/areaBasedList?numOfRows=12&pageNo=1&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&listYN=Y&arrange=A&contentTypeId=32&areaCode=39&sigunguCode=&cat1=B02&cat2=B0201&cat3=B02010100&_type=json`
//   );
//   // console.log('res.data:', res.data.response.body.items.item);
//   return res.data.response.body.items.item;
// };

//메인페이지 api
export const fetchAttractionData = async ({
  stay,
  region,
}: {
  stay: string;
  region: string;
}) => {
  // console.log('recoil에 의해 변경되는 전역 상태 값:', stay);
  const res = await axios.get(
    `http://apis.data.go.kr/B551011/KorService/areaBasedList?numOfRows=12&pageNo=1&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&listYN=Y&arrange=A&contentTypeId=12&areaCode=${region}&sigunguCode=&cat1=A02&cat2=A0201&cat3=&_type=json`
    // `http://apis.data.go.kr/B551011/KorService/areaBasedList?numOfRows=12&pageNo=1&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&listYN=Y&arrange=A&contentTypeId=32&areaCode=${region}&sigunguCode=&cat1=B02&cat2=B0201&cat3=${stay}&_type=json`
    // `http://apis.data.go.kr/B551011/KorService/searchStay?areaCode=${region}&sigunguCode=&ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&listYN=Y&MobileOS=ETC&MobileApp=AppTest&arrange=A&numOfRows=12&pageNo=1&_type=json`
  );
  return res.data.response.body;
};

//상세페이지 api
export const fetchAttractionDetailData = async ({
  param,
}: {
  param: Readonly<Params<string>>;
}) => {
  // console.log('param', param, typeof param);
  const res = await axios.get(
    // `http://apis.data.go.kr/B551011/KorService/detailCommon?ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&contentTypeId=12&contentId=${param}&MobileOS=ETC&MobileApp=AppTest&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&_type=json`
    `http://apis.data.go.kr/B551011/KorService/detailCommon?ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&contentTypeId=12&contentId=${param.id}&MobileOS=ETC&MobileApp=AppTest&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y&_type=json`
  );
  return res.data.response.body.items.item;
};
