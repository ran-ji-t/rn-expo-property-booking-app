import { View, Text, ImageSourcePropType, Image } from "react-native";
import React, { useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import ShimmerPlaceHolder from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "@expo/vector-icons/AntDesign";

import { BookingItemProps } from "../types/props";
import { getPropertyInfo } from "../services/apiHandler";
import { hp, wp } from "../helpers/utils";

const BookingItem = ({ item }: BookingItemProps) => {
  const { data, isLoading, error } = useQuery({
    queryKey: [`property/${item.propertyId}`],
    queryFn: () => getPropertyInfo(item.propertyId),
  });
  const source: ImageSourcePropType = useMemo(
    () =>
      data && data.images[0]
        ? {
            uri: data.images[0],
          }
        : require("../../assets/images/placeholder.png"),
    [data]
  );
 
  return (
    <View className="w-full">
      <View className="py-2 px-2 bg-gray-300 dark:bg-gray-900 rounded-md flex-row">
        <ShimmerPlaceHolder
          style={{
            borderRadius: 12,
            width: wp(80),
            height: wp(80),
          }}
          width={wp(80)}
          height={wp(80)}
          visible={!isLoading}
          LinearGradient={LinearGradient}
        >
          <Image className="w-full h-full rounded-lg" source={source} />
        </ShimmerPlaceHolder>
        <View className="ml-4 justify-between flex-1">
          <View>
            <ShimmerPlaceHolder
              style={{
                width: "100%",
                borderRadius: 12,
                marginBottom: hp(2),
              }}
              visible={!isLoading}
              LinearGradient={LinearGradient}
            >
              <View>
                {data ? (
                  <Text
                    className="color-black dark:color-white font-pm text-[15px]"
                    numberOfLines={1}
                  >
                    {data.title}
                  </Text>
                ) : (
                  <Text
                    className="color-black dark:color-white font-pm text-[15px]"
                    numberOfLines={1}
                  >
                    -
                  </Text>
                )}
              </View>
            </ShimmerPlaceHolder>
            <ShimmerPlaceHolder
              style={{
                width: "80%",
                borderRadius: 12,
                marginBottom: hp(2),
              }}
              visible={!isLoading}
              LinearGradient={LinearGradient}
            >
              {data && (
                <Text className="color-gray-500 font-pr text-xs">
                  {data.location.address}, {data.location.city},
                  {data.location.state}
                </Text>
              )}
            </ShimmerPlaceHolder>
          </View>
          <View className="flex-row w-full justify-between items-end">
            <ShimmerPlaceHolder
              style={{
                flex: 1,
                borderRadius: 12,
                marginBottom: hp(2),
              }}
              visible={!isLoading}
              LinearGradient={LinearGradient}
            >
              <Text
                className="color-blue-600 font-pr text-[12px] align-bottom"
                style={{ lineHeight: hp(12) }}
              >
                {item.checkIn} - {item.checkOut}
              </Text>
            </ShimmerPlaceHolder>
            <ShimmerPlaceHolder
              style={{
                width: wp(20),
                height: wp(20),
                borderRadius: 12,
                marginBottom: hp(2),
                marginLeft: wp(5),
              }}
              visible={!isLoading}
              LinearGradient={LinearGradient}
            >
              {item.status == "confirmed" ? (
                <AntDesign name="checkcircle" size={wp(20)} color={"#90EE90"} />
              ) : (
                <AntDesign name="clockcircle" size={wp(20)} color="#FFFFE0" />
              )}
            </ShimmerPlaceHolder>
          </View>
        </View>
      </View>
    </View>
  );
};

export default BookingItem;
