import { atom } from "recoil";

export const staySelectionState = atom({
  key: "staySelectionState",
  default: "",
});

export const regionSelectionState = atom({
  key: "regionSelecionState",
  default: "",
});

export const allItemTotalCount = atom({
  key: "itemTotalCount",
  default: "",
});
