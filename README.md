![](https://velog.velcdn.com/images/jini9256/post/bcee838d-befd-41b1-8c2f-db0c4fda1b00/image.png)

### 🌱프로젝트명 : Tripick

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

### Depoloy

Vercel

### 🌱주요 기능

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

### 🌱팀원 구성

| **팀원** | **깃허브**                                      |
| -------- | ----------------------------------------------- |
| 유영재   | [YoungJae0910](https://github.com/YoungJae0910) |
| 예재현   | [dwg787](https://github.com/dwg787)             |
| 심대호   | [SimDaeHo](https://github.com/SimDaeHo)         |
| 송원석   | [CircleSeok](https://github.com/CircleSeok)     |
| 김혜진   | [jini9256](https://github.com/jini9256)         |

---

### 🌱프로젝트 기간 : 23.2.6 ~ 23.3.13

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
