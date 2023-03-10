
![](https://velog.velcdn.com/images/jini9256/post/bcee838d-befd-41b1-8c2f-db0c4fda1b00/image.png)

### 🌱프로젝트명 : Tripick

 - 국내를 돌아다니며 여행할 수 있는 자료를 제공함으로써 국내 관광 정보제공 및 반경 20km 내 숙박 및 식음료 데이터를 제공해 주는 사이트
  
![](https://velog.velcdn.com/images/jini9256/post/c3363126-286a-4cdb-b7a4-5a202d4b26ed/image.png)

---

💙[Tripick 사이트](https://b3-finalproject.vercel.app/)

🗂 [S.A](https://coherent-petalite-63a.notion.site/S-A-8bda63e869934236961d7009428b284c)

💻 [시연 영상](https://youtu.be/f-2ipfhSZlg)

---

### 🌱팀원 구성

|**팀원**|**깃허브**|
|---|---|
|유영재|[YoungJae0910](https://github.com/YoungJae0910)|
|예재현|[dwg787](https://github.com/dwg787)|
|심대호|[SimDaeHo](https://github.com/SimDaeHo)|
|송원석|[CircleSeok](https://github.com/CircleSeok)|
|김혜진|[jini9256](https://github.com/jini9256)|

---
### 🌱프로젝트 기간 : 23.2.6 ~ 23.3.13

|**기간**|**일정 내용**|
|---|---|
|2/5 - 2/12|전체적인 컬러 및 기획 완성
|2/13 - 2/20|UI 제작 및 기능 적용|
|2/21 - 2/22|미완성 부분 UI 및 기능 적용 1차 디자인 점검|
|2/23 - 2/24|전체적인 페이지 기능 테스트 및 bug 서칭|
|2/25 - 3/2|추가 기능 업데이트|
|3/3 - 3/7| 유저 피드백 & 개선사항 개선|
|3/8 - 3/13|발표 자료 준비 및 최종 발표|

---

### 🌱개발 기능

1. 로그인 / 회원가입

- 일반 로그인
- 소셜 로그인(구글, 카카오, 네이버)
- 회원가입 시 유효성 검사
- firebase 연동 및 db 관리

1-1. navbar

 - 로고
 - 돋보기 버튼 클릭 시 검색 페이지로 이동
- 세션 스토리지에 유저의 정보가 있으면 로그인 유지
- 로그아웃 버튼(클릭 시 세션 스토리지의 특정 토큰 및 정보 만료)

2.메인페이지

- UX 향상을 위해 fetching, loading 시간 동안 보여줄 스켈레톤 UI 구현
- 새로운 관광 정보를 알려주는 메인 슬라이더
- (지역별) 추천 관광지 리스트
- (지역별) 추천 숙박 리스트
- (지역별) 추천 맛집 리스트
- Storage를 활용한 로그인 상태 확인
- 추천 리스트 (좋아요 클릭 수에 따른 랭킹)

3.마이페이지

- 내 정보 : 프로필 수정 기능 / 유효성검사
- 회원 탈퇴
- 찜하기(좋아요) 리스트 & 페이지네이션

4.관광지/맛집/숙소 상세정보 페이지

- kakao map을 사용 api(위도, 경도)로 마커 표시
- 관광 정보의 상세 내용 표기
- 주변 (추천) 맛집 4개
- 주변 (추천) 숙소 4개
- 주변 (추천) 관광지 4개
- 댓글 (CRUD)& 페이지네이션
- 상세 페이지 좋아요 기능
- 좋아요 추가/취소 시, 댓글 수정/삭제 시 토스트 메시지 팝업 기능 구현

5.검색페이지

- 검색 시 주소와 타이틀에 검색 내용이 포함된다면 검색 결과물을 도출

6.슬롯머신

7.챗봇 
- 유저 문의사항을 firebase로 수집

8.반응형

---

![](https://velog.velcdn.com/images/jini9256/post/a3e22b26-712e-4f02-bd4e-6c023eab82b2/image.png)


