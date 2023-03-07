import { atom } from 'recoil';
import { recCnts } from '../types/apiDataTypes';

//숙박 선택
export const staySelectionState = atom({
  key: 'staySelectionState',
  default: '',
});

//지역 선택
export const regionSelectionState = atom({
  key: 'regionSelecionState',
  default: '',
});

//메뉴 선택
export const menuSelectionState = atom({
  key: 'menuSelectionState',
  default: '',
});

//추천 수 카운트 state
export const recommendationCnt = atom<recCnts>({
  key: 'recommendationCnt',
  default: [],
});

//알람 state
export const alarmState = atom({
  key: 'alarmState',
  default: [] as string[],
});

//페이지 state
// export const curPageState = atom({
//   key: 'curPageState',
//   default: {
//     spotCurPage: 1,
//     stayCurPage: 1,
//     resCurPage: 1,
//   },
// });

export const weeklyTypeState = atom({
  key: 'weeklyTypeState',
  default: '관광',
});

export const nearStayState = atom({
  key: 'nearStayState',
  default: [],
});

export const likeState = atom({
  key: 'likeState',
  default: '',
});

// export const paramTransfer = atom({
//   key: 'paramTransfer',
//   default: '',
// });
