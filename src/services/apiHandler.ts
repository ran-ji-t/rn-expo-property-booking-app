import axios from "axios";
import { API_BASE_URL } from "../constants/appConstants";
import { Booking, Bookingz, Property, Propertyz } from "../types/property";
import { z } from "zod";
import uuid from "react-native-uuid";
import { getUserDetails } from "../helpers/utils";
import { Profile, Profilez } from "../types/profile";

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000
});

export const getproperties = async (
  searchText: string
): Promise<Property[]> => {
  const res = await instance.get(`/properties?title_like=${searchText}`);
  const { data, error } = z.array(Propertyz).safeParse(res.data);
  if (error) throw error;
  return data;
};

export const getPropertyInfo = async (
  id: string
): Promise<Pick<Property, "title" | "location" | "images">> => {
  const res = await instance.get(`properties?id=${id}`);
  const { data, error } = Propertyz.pick({
    title: true,
    location: true,
    images: true,
  }).safeParse(res.data[0]);
  if (error) throw error;
  return data;
};

export const getBookings = async (): Promise<Booking[]> => {
  const user = await getUserDetails();
  const res = await instance.get(`/bookings?userId=${user.id}`);
  const { data, error } = z.array(Bookingz).safeParse(res.data);
  if (error) throw error;
  return data;
};

export const postBooking = async ({
  checkIn,
  checkOut,
  propertyId,
}: Omit<Booking, "id" | "userId" | "status">) => {
  const id = uuid.v4();
  const user = await getUserDetails();
  await instance.post("/bookings", {
    id,
    checkIn,
    checkOut,
    propertyId,
    status: "Pending",
    userId: user.id,
  });
};

export const login = async (): Promise<Profile> => {
  const res = await instance.get(`/profile`);
  const { data, error } = Profilez.safeParse(res.data);
  if (error) throw error;
  return data;
};
