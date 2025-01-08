import { deleteItemAsync, getItemAsync, setItemAsync } from "expo-secure-store";
import { bh, bw, sh, sw } from "../constants/appConstants";
import { Profile, Profilez } from "../types/profile";
import { z } from "zod";

export const wp = (w: number): number => (w * sw) / bw;
export const hp = (h: number): number => (h * sh) / bh;

const userKey = "USER_DETAILS";
export const getUserDetails = async (): Promise<Omit<Profile, "bookings">> => {
  try {
    const res = await getItemAsync(userKey);
    const { data, error } = Profilez.omit({
      bookings: true,
    }).safeParse(JSON.parse(res ?? ""));
    if (error || !data) throw error;
    return data;
  } catch (error) {
    throw error;
  }
};

export const setItem = async (detail: Omit<Profile, "bookings">) => {
  try {
    await setItemAsync(userKey, JSON.stringify(detail));
  } catch (error) {
    throw error;
  }
};

export const deleteItem = async () => {
  try {
    await deleteItemAsync(userKey)
  } catch (error) {
    throw error;
  }
}