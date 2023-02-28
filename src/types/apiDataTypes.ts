export interface recCnt {
  [key: string]: string;
}

export type FetchedStayDataType = Omit<recCnt, 'viewCnt' | 'likeCnt'>;

export interface recCnts extends Array<recCnt> {}

export interface PageDataTypes {
  [key: string]: any;
}

export interface EachRankType {
  [key: string]: any;
}

export interface RankTypeList extends Array<EachRankType> {}

export interface DetailDataTypes {
  // [x: string]: any;
  contentid: string;
  contenttypeid: string;
  title: string;
  createdtime: string;
  modifiedtime: string;
  tel: string;
  telname: string;
  homepage: string;
  booktour: string;
  firstimage: string;
  firstimage2: string;
  areacode: string;
  sigungucode: string;
  cat1: string;
  cat2: string;
  cat3: string;
  addr1: string;
  addr2: string;
  zipcode: string;
  mapx: string;
  mapy: string;
  mlevel: string;
  overview: string;
}

// export interface spotDetailDataTypes {
//   contentid: string;
//   contenttypeid: string;
//   title: string;
//   createdtime: string;
//   modifiedtime: string;
//   tel: string;
//   telname: string;
//   homepage: string;
//   booktour: string;
//   firstimage: string;
//   firstimage2: string;
//   areacode: string;
//   sigungucode: string;
//   cat1: string;
//   cat2: string;
//   cat3: string;
//   addr1: string;
//   addr2: string;
//   zipcode: string;
//   mapx: string;
//   mapy: string;
//   mlevel: string;
//   overview: string;
// }
