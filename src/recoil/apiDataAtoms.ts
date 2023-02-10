import { atom } from 'recoil';

interface recCnt {
  id: string;
  viewCnt: number;
}

interface recCnts extends Array<recCnt> {}

export const staySelectionState = atom({
  key: 'staySelectionState',
  default: '',
});

export const regionSelectionState = atom({
  key: 'regionSelecionState',
  default: '',
});

//추천 수 카운트 state
export const recommendationCnt = atom<recCnts>({
  key: 'recommendationCnt',
  default: [
    { id: '2513971', viewCnt: 1 },
    { id: '2788127', viewCnt: 1 },
  ],
});
