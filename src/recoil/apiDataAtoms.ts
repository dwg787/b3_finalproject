import { atom } from 'recoil';
import { recCnts } from '../apis/publicAPI';

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
  default: [],
});
