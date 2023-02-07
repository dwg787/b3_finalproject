// 숙박 분류 코드
// export const STAY_TYPE = {
//   펜션: 'B02010700',
//   관광호텔: 'B02010100',
//   한옥: 'B02011600',
// };

// interface STAY_CODE_TYPE {
//     [key:string]:string
// }

export const STAY_TYPE = [
  { id: 'B02010700', type: '펜션' },
  { id: 'B02010100', type: '관광호텔' },
  { id: 'B02011600', type: '한옥' },
];

export const TOURIST_ATTRACTION_TYPE = [
  {
    largeGroup: 'A01',
    middleGroup: 'A0101',
    smallGroup: 'A01010400',
    type: '산',
  },
  {
    largeGroup: 'A01',
    middleGroup: 'A0101',
    smallGroup: 'A01011200',
    type: '해수욕장',
  },
];
