import axios from 'axios';

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

export const fetchStayData = async ({
  stay,
  region,
}: {
  stay: string;
  region: string;
}) => {
  console.log('recoil에 의해 변경되는 전역 상태 값:', stay);
  const res = await axios.get(
    `http://apis.data.go.kr/B551011/KorService/areaBasedList?numOfRows=12&pageNo=1&MobileOS=ETC&MobileApp=AppTest&ServiceKey=${process.env.REACT_APP_PUBLIC_STAY_API_KEY}&listYN=Y&arrange=A&contentTypeId=32&areaCode=${region}&sigunguCode=&cat1=B02&cat2=B0201&cat3=${stay}&_type=json`
  );
  return res.data.response.body.items.item;
};
