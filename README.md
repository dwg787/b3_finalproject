![](https://velog.velcdn.com/images/jini9256/post/bcee838d-befd-41b1-8c2f-db0c4fda1b00/image.png)

## 🌱프로젝트명 : Tripick

- 국내 관광명소 정보 제공 및 관광지 중심으로 반경 20km 내 숙박 및 음식점 정보를 제공해 주는 웹사이트

![](https://velog.velcdn.com/images/jini9256/post/c3363126-286a-4cdb-b7a4-5a202d4b26ed/image.png)

---

💙[Tripick 사이트](https://b3-finalproject.vercel.app/)

🗂 [S.A](https://coherent-petalite-63a.notion.site/S-A-8bda63e869934236961d7009428b284c)

💻 [시연 영상](https://youtu.be/f-2ipfhSZlg)

---

## 🔧 기술 스택

### Client  

- React, Recoil, React-query, React-router-dom, Styled-components

### Server, DB

- Firebase Firestore

### API

- Kakao Map API
- 한국관광공사 Tour API

### Deploy

- Vercel

## 🌱주요 기능

<table>
 <tr>
    <td align="center" width="100" height="500">
      로그인
    </td>
    <td align="center">
      <img width="500" height="500" src="https://user-images.githubusercontent.com/95618332/225481009-619d6daf-aef5-4568-aea5-b7e47838d275.gif" alt="custom-style-modal">
    </td>
    <td>
    <ul>
      <li>일반 로그인(이메일), 소셜 로그인(구글, 카카오, 네이버) 모달</li>
      <li>로그인 시 유효성 검사</li>
      <li>검색 페이지로 이동</li>
      <li>브라우저 탭 유지 시 로그아웃 하지 않는 이상 로그인 유지</li>
    </ul>
    </td>
  </tr>
  <tr>
    <td align="center" width="100" height="500">
      회원가입
    </td>
    <td align="center">
      <img width="500" height="500" src="https://user-images.githubusercontent.com/95618332/225482259-f3ff91b4-48de-448d-bb07-6b7960171060.gif" alt="custom-style-modal">
    </td>
    <td>
    <ul>
      <li>회원가입 약관 모달</li>
      <li>회원가입 유효성 검사</li>
    </ul>
    </td>
    </tr>
</table>

 <table>
 <tr>
    <td align="center" width="100" height="500">
      메인페이지
    </td>
    <td align="center">
      <img width="500" height="500" src="https://user-images.githubusercontent.com/95618332/225478137-db7050db-91fc-44b4-9e18-6ab9ba1bff80.gif" alt="custom-style-modal">
    </td>
    <td>
    <ul>
      <li>관광지, 숙박, 맛집 리스트 카테고라이징 및 지역별 필터 검색</li>
      <li>리스트 페이지네이션 라이브러리 사용하지 않고 직접 구현</li>
      <li>추천 랭킹 리스트(좋아요 수 기준으로 내림차순 정렬, 조회수 기준 내림차순 정렬)</li>
      <li>페이지 fetching, loading 상태에서 UX 향상과 Layout Shift 방지를 위한 스켈레톤 UI 표시</li>
    </ul>
    </td>
  </tr>
</table>

<table>
  <tr>
    <td align="center" width="100" height="500">
      마이페이지
    </td>
    <td align="center">
      <img width="500" height="500" src="https://user-images.githubusercontent.com/95618332/225480273-15b7a374-a081-4c9f-ad57-77da988844ab.gif" alt="custom-style-modal">
    </td>
    <td>
    <ul>
      <li>찜하기(좋아요) 리스트 추가/삭제</li>
      <li>찜하기 리스트 페이지네이션</li>
    </ul>
    </td>
  </tr>
  <tr>
    <td align="center" width="100" height="100">
      마이페이지
    </td>
    <td align="center">
<!--       <img width="500" height="500" src="https://user-images.githubusercontent.com/95618332/225480254-0fa4ca76-9ac1-4f34-902a-cd871f19c1cb.gif" alt="custom-style-modal"> -->
    </td>
    <td>
    <ul>
      <li>내 정보 : 프로필 수정 기능 / 유효성검사</li>
      <li>회원 탈퇴</li>
    </ul>
    </td>
  </tr>
</table>

<table>
 <tr>
    <td align="center" width="100" height="500">
      상세페이지
    </td>
    <td align="center">
      <img width="500" height="500" src="https://user-images.githubusercontent.com/95618332/225487361-f3ed840b-9605-4a03-902d-e698b07cce09.gif" alt="custom-style-modal">
    </td>
    <td>
    <ul>
      <li>관광 정보의 상세 내용 표기</li>
      <li>상세 페이지 해당 장소 찜하기(좋아요) 기능</li>
      <li>좋아요 추가/취소 시, 댓글 수정/삭제 시 토스트 메시지 팝업 기능 구현</li>
      <li>관광지 주변 반경 20km 내 숙박, 맛집 리스트 표시</li>
      <li>댓글 (CRUD)& 페이지네이션</li>
    </ul>
    </td>
  </tr>
  <tr>
    <td align="center" width="100" height="500">
      상세페이지
    </td>
    <td align="center">
      <img width="500" height="500" src="https://user-images.githubusercontent.com/95618332/225485684-21bca08c-8a8b-4b58-adca-514f60e2bb4f.gif" alt="custom-style-modal">
    </td>
    <td>
    <ul>
      <li>kakao Map API를 활용한 마커 표시</li>
      <li>관광지 주변 반경 20km 내 숙박 다중 마커 표시</li>
    </ul>
    </td>
  </tr>
</table>

<table>
 <tr>
    <td align="center" width="100" height="500">
      반응형 UI
    </td>
    <td align="center">
      <img width="300" height="500" src="https://user-images.githubusercontent.com/95618332/225486073-2ed6683a-f2b1-4aa2-9cdb-37f2a87bc193.gif" alt="custom-style-modal">
    </td>
    <td>
    <ul>
      <li>모바일에서도 서비스를 이용할 수 있도록 미디어쿼리를 이용하여 반응형 UI 구현</li>
    </ul>
    </td>
  </tr>
</table>

6.검색페이지(관광지)
- Fuse.js 라이브러리를 활용한 관광지 검색 기능

7.슬롯머신

8.챗봇

- 유저 문의사항을 firebase로 수집

---
## 기술적 챌린지

### 메뉴탭 카테고라이징
기존에 새로고침 시 메뉴 상태 유지를 위해 sessionStorage에서 관리했었음. 
유저 피드백에 따라 기존 방식을 useLocation 훅을 활용하여 url query로 유지하는 방식으로 리팩토링

### 메인페이지 페이지네이션 
페이지네이션 기능을 위해 초기 react-slick 라이브러리를 도입하여 간편하게 구현하고자 했으나 적용 시점이 늦어 CSS가 깨지는 문제가 있었음. 그래서 라이브러리를 사용하지 않고 직접 로직 구현. 
또한 초기에 useInfinitequery를 이용하여 구현하였으나 페이지 건너뛰기 fetching 구현에 한계가 있어 useQuery로 리팩토링 
API DATA 가 자주 변경되는 데이터는 아니라서 이미 fetch하여 캐싱된 데이터의 빠른 로딩을 위해 query key의 staletime을 1시간으로 적용하였음

### 스켈레톤 UI
fetching, Loading 상태를 근본적으로 줄이는 방향이 바람직하겠지만 공공 API 서버 상황에 따라 fetching에 시간이 좀 걸리는 경우가 있어 스켈레톤 UI 적용을 고려 및 적용
스켈레톤 UI 또한 별도의 라이브러리를 사용하지 않고 직접 UI 치수에 따라 커스터마이징 구현.
스켈레톤 UI 적용 후 lighthouse에서 5점 정도의 Performance 점수 증가. 성능 향상보다는 UX적 입장에서 사용감이 좋았다는 유저 피드백이 있었음. 로딩 시 레이아웃 시프트를 방지하는 이점

### 좋아요 카운트 표시 및 마이페이지 찜하기 추가/제거
우리 프로젝트에서 좋아요는 곧 유저 개개인이 찜한 내용이므로 bookmarks라는 한 collection에 유저 개개개인의 doc이 있고(doc 이름은 유저 개개인 고유의 uid) doc 안에 한 유저의 찜목록들이 배열 리스트 형태로 저장되도록 설계 및 구현.
또 하나는 숙소 추천 리스트 수집을 위한 stay_recommendation라는 이름의 collection을 두어 유저가 한 숙소 카드를 클릭하거나 클릭 이후 넘어가는 상세페이지에서 찜하기를 클릭하면 stay_recommendation의 해당 숙소 contentid doc 안에 내가 추가해둔 속성인 viewCnt(조회수 카운트), likeCnt(숙소 총 찜하기(=좋아요) 개수 카운트)가 증가(또는 감소)하도록 설계 및 구현.
위에서 likeCnt 속성이 8개씩 카드가 나오는 화면에서도 반영되어 보이게 구현.
상세페이지에서의 좋아요 카운트는 클릭 즉시 반영되어야하는데 기존의 getDoc을 이용하는 방식으로는 약간의 텀이 있고 부가적인 코드가 있어 간단하면서도 바로 상태를 반영할 수 있는 onSnapshot 함수로 리팩토링

### Queue 자료구조를 갖는 토스트 팝업 메시지
immutable 한 concat과 slice 함수를 사용
fade-out 애니메이션을 주기 위한 keyframe 사용
어느 페이지나 토스트 메시지 기능이 필요한 곳에 사용가능하도록 Recoil로 관리 및 해당 로직을 커스텀 훅으로 구현

### 이미지 최적화 도전
API Data에서 가져오는 이미지가 아닌 asset에 저장하는 이미지인 경우 이미지 압축 및 avif 포맷으로 변환하여 저장(메인페이지 슬라이드 배너 이미지 등)
img 태그를 picture 태그로 감싸고 source의 srcSet으로 avif, webp로 들어오는 이미지가 있다면 적용되게 함. loading=lazy 속성과 decoding=async 속성 적용.
배너 이미지를 avif 적용했음에도 크기가 커서 첫 랜딩 시 로딩 시간이 오래걸림. useLayoutEffect로 preload되게 리팩토링
input에 의한 업로드 이벤트가 아닌 API fetching을 통해 가져온 이미지 포맷을 react-image-file-resizer를 사용하여 webp로 변환 및 렌더링 성공(개발환경에서)
#### 미해결 부분
webp 포맷으로 변환하여 네트워크 통신 비용을 줄이고 좀더 빠른 로딩이 가능하도록 만들고자 하였음.
api로부터 받아오는 이미지 url의 CORS 정책으로 http-proxy-middleware 라이브러리를 활용해 프록시 우회를 하려고 하였음.   
위에 채택했던 방법으로는 로컬환경에서밖에 적용이 안되서 시간상 배포버전에는 이미지 포맷을 webp로 변환하지는 못함.

---

## 🌱팀원 구성

| **팀원** | **깃허브**                                      |
| -------- | ----------------------------------------------- |
| 유영재   | [YoungJae0910](https://github.com/YoungJae0910) |
| 예재현   | [dwg787](https://github.com/dwg787)             |
| 심대호   | [SimDaeHo](https://github.com/SimDaeHo)         |
| 송원석   | [CircleSeok](https://github.com/CircleSeok)     |
| 김혜진   | [jini9256](https://github.com/jini9256)         |

---

## 🌱프로젝트 기간 : 23.2.6 ~ 23.3.13

| **기간**    | **일정 내용**                               |
| ----------- | ------------------------------------------- |
| 2/5 - 2/12  | 전체적인 컬러 및 기획 완성                  |
| 2/13 - 2/20 | UI 제작 및 기능 적용                        |
| 2/21 - 2/22 | 미완성 부분 UI 및 기능 적용 1차 디자인 점검 |
| 2/23 - 2/24 | 전체적인 페이지 기능 테스트 및 bug 서칭     |
| 2/25 - 3/2  | 추가 기능 업데이트                          |
| 3/3 - 3/7   | 유저 피드백 & 개선사항 개선                 |
| 3/8 - 3/13  | 발표 자료 준비 및 최종 발표                 |

---
