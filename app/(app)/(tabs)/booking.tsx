import BookingItem from "@/src/components/BookingItem";
import { wp } from "@/src/helpers/utils";
import { useBooking } from "@/src/hooks/useBooking";
import { Booking } from "@/src/types/property";
import React from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const BookingsScreen = () => {
  const { data, error, isLoading } = useBooking();

  const renderItem = ({ item }: { item: Booking }) => {
    return <BookingItem item={item} />;
  };
  
  return (
    <SafeAreaView edges={["top"]} className="flex-1 px-4 mt-4">
      <Text className="color-primaryLight font-pb text-3xl mb-5">Bookings</Text>
      <View className="flex-1 justify-center items-center mt-3">
        {isLoading && data.length == 0 && (
          <ActivityIndicator className="color-cyan-700" size={wp(30)} />
        )}
        {error && data.length == 0 && (
          <Text className="color-gray-800 dark:color-slate-300 font-pm text-xl">
            Oops! something went wrong
          </Text>
        )}
        {!error && !isLoading && (
          <FlatList
            ListEmptyComponent={() => (
              <Text className="color-gray-800 dark:color-slate-300 font-pm text-xl">
                No Property to show
              </Text>
            )}
            className="w-full"
            ItemSeparatorComponent={() => <View className="h-2" />}
            data={data}
            renderItem={renderItem}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default BookingsScreen;
