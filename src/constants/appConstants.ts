import { Dimensions } from "react-native";

export const { height: sh, width: sw } = Dimensions.get("screen");
export const bw = 360,
  bh = 640;
export const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? "";
