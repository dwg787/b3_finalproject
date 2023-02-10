// import React from "react";
// import axios from "axios";

// export default function Infinite() {
//   const [fetching, setFetching] = useState(false); // 추가 데이터를 로드하는지 아닌지를 담기위한 state

//   const fetchMoreInstaFeeds = async () => {
//     // 추가 데이터를 로드하는 상태로 전환
//     setFetching(true);

//     // API로부터 받아온 페이징 데이터를 이용해 다음 데이터를 로드
//     await axios.get(instaPaging.next).then((response) => {
//       const fetchedData = response.data.data; // 피드 데이터 부분
//       // 기존 데이터 배열과 새로 받아온 데이터 배열을 합쳐 새 배열을 만들고 state에 저장한다.
//       const mergedData = instaData.concat(...fetchedData);
//       setInstaData(mergedData);
//     });
//     // 추가 데이터 로드 끝
//     setFetching(false);
//   };

//   // 스크롤 이벤트 핸들러
//   const handleScroll = () => {
//     const scrollHeight = document.documentElement.scrollHeight;
//     const scrollTop = document.documentElement.scrollTop;
//     const clientHeight = document.documentElement.clientHeight;
//     if (scrollTop + clientHeight >= scrollHeight && fetching === false) {
//       // 페이지 끝에 도달하면 추가 데이터를 받아온다
//       fetchMoreInstaFeeds();
//     }
//   };

//   useEffect(() => {
//     // scroll event listener 등록
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       // scroll event listener 해제
//       window.removeEventListener("scroll", handleScroll);
//     };
//   });
// }
