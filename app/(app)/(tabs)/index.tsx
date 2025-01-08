import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useMemo } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageSourcePropType,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import moment from "moment";
import { ScrollView } from "react-native-gesture-handler";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { MD2DarkTheme, MD2LightTheme, Provider } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { ThemeProp } from "react-native-paper/lib/typescript/types";

import Colors from "@/src/constants/Colors";
import { hp, wp } from "@/src/helpers/utils";
import { useHome } from "@/src/hooks/useHome";
import { Property } from "@/src/types/property";

const HomeScreen = () => {
  const {
    data,
    error,
    isLoading,
    bottomSheetRef,
    dismissBottomSheet,
    presentSheet,
    snapPoints,
    selectedProperty,
    endDate,
    endVisible,
    setEndVisible,
    setEnddate,
    setStartDate,
    setStartVisisble,
    startDate,
    startVisisble,
    reset,
    bookVisible,
    mapRef,
    region,
    searchText,
    setSearchText,
    bookProperty,
    booking,
  } = useHome();
  const colorScheme = useColorScheme() ?? "light";
  const customTheme: ThemeProp = useMemo(() => {
    const dark = {
      ...MD2DarkTheme,
      colors: {
        ...MD2DarkTheme.colors,
        primary: "#3D5B8C",
      },
    };
    const light = {
      ...MD2LightTheme,
      colors: {
        ...MD2LightTheme.colors,
        primary: "#3D5B8C",
      },
    };

    return colorScheme === "dark" ? { ...dark } : { ...light };
  }, [colorScheme]);

  const renderItem = ({ item }: { item: Property }) => {
    const source: ImageSourcePropType = item.images[0]
      ? {
          uri: item.images[0],
        }
      : require("../../../assets/images/placeholder.png");
    return (
      <View className="w-full">
        <Pressable
          onPress={() => presentSheet(item.id)}
          className="py-2 px-2 bg-gray-300 dark:bg-gray-900 rounded-md flex-row"
        >
          <Image className="w-24 h-24 rounded-lg" source={source} />
          <View className="ml-4 justify-between flex-1">
            <View>
              <Text
                className="color-black dark:color-white font-pm text-[15px]"
                numberOfLines={1}
              >
                {item.title}
              </Text>
              <Text className="color-gray-500 font-pr text-xs">
                {item.location.address}, {item.location.city},
                {item.location.state}
              </Text>
            </View>
            <Text className="color-blue-600 font-pr text-[12px]">
              ${item.price}
            </Text>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <Provider theme={customTheme}>
      <SafeAreaView edges={["top"]} className="flex-1 px-4 mt-4">
        <Text className="color-primaryLight font-pb text-3xl mb-5">
          Properties
        </Text>
        <TextInput
          cursorColor={"black"}
          className="w-full bg-gray-500 rounded-xl pl-3 font-pm h-14"
          placeholder="Enter text to search"
          value={searchText}
          onChangeText={setSearchText}
        />
        <View className="flex-1 justify-center items-center mt-3">
          {isLoading && data.length == 0 && (
            <ActivityIndicator className="color-cyan-700" size={wp(30)} />
          )}
          {error && data.length == 0 && (
            <Text className="color-gray-800 dark:color-slate-300 font-pm text-xl w-full text-center">
              Oops! something went wrong
            </Text>
          )}
          {!error && !isLoading && (
            <FlatList
              ListEmptyComponent={() => (
                <Text className="color-gray-800 dark:color-slate-300 font-pm text-xl w-full text-center">
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
      <BottomSheetModal
        onChange={(ind) => {
          if (ind == -1) reset();
        }}
        backgroundStyle={{
          backgroundColor: Colors[colorScheme].background,
          elevation: 10,
        }}
        snapPoints={snapPoints}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            {...props}
            appearsOnIndex={0}
            disappearsOnIndex={-1}
          />
        )}
        ref={bottomSheetRef}
        enablePanDownToClose={true}
        handleIndicatorStyle={{
          backgroundColor: Colors[colorScheme].text,
        }}
        enableContentPanningGesture={false}
      >
        <BottomSheetView>
          <View className="relative w-full mt-5 px-5">
            <View style={{ height: hp(150) }}>
              <MapView
                provider={PROVIDER_GOOGLE}
                ref={mapRef}
                initialRegion={region}
                loadingEnabled={true}
                loadingIndicatorColor="#666666"
                loadingBackgroundColor="#eeeeee"
                moveOnMarkerPress={false}
                showsUserLocation={true}
                showsCompass={true}
                showsPointsOfInterest={false}
                onLayout={() => {
                  mapRef.current?.animateCamera(
                    {
                      center: {
                        latitude: region.latitude,
                        longitude: region.longitude,
                      },
                    },
                    { duration: 500 }
                  );
                }}
                region={region}
                style={{ width: "100%", height: hp(150) }}
              >
                <Marker
                  coordinate={{
                    latitude: region.latitude,
                    longitude: region.longitude,
                  }}
                >
                </Marker>
              </MapView>
              <Text className="absolute ml-2 mt-2 color-rose-700 font-pm">
                {selectedProperty?.location.address},{" "}
                {selectedProperty?.location.city},{" "}
                {selectedProperty?.location.state}
              </Text>
            </View>
            <Text className="color-black dark:color-white font-pb text-3xl mt-7">
              {selectedProperty?.title}
            </Text>
            <View>
              <BottomSheetScrollView>
                <View className="w-full">
                  <View className="h-6" />
                  <Text className="color-gray-500 font-pm text-xl mb-2">
                    Images:
                  </Text>
                  <ScrollView horizontal>
                    {(selectedProperty?.images ?? []).map((url, ind) => {
                      return (
                        <Image
                          className="w-20 h-20 mr-2 rounded-md"
                          key={ind}
                          source={{ uri: url }}
                        />
                      );
                    })}
                  </ScrollView>
                  <View className="h-6" />
                  <Text className="color-gray-500 font-pm text-xl mb-2">
                    Features:
                  </Text>
                  <BottomSheetScrollView horizontal>
                    {(selectedProperty?.features ?? []).map((feature, ind) => {
                      return (
                        <View
                          key={ind}
                          className="px-2 py-1 border-black dark:border-white border-[0.5px] mr-2 rounded-md"
                        >
                          <Text className="color-black dark:color-white font-psm text-lg mb-2">
                            {feature}
                          </Text>
                        </View>
                      );
                    })}
                  </BottomSheetScrollView>
                </View>
                <View className="flex-row w-full mt-5">
                  <Pressable
                    onPress={() => setStartVisisble(true)}
                    className="mr-40 border-b-[0.5px] border-gray-500"
                  >
                    <Text className="color-gray-500 font-pm text-xl mb-2">
                      from:
                    </Text>
                    <Text className="color-black dark:color-white font-pm text-[15px] mb-2 opacity-80">
                      {startDate == "" ? "Pick" : startDate}
                    </Text>
                    <DatePickerModal
                      locale="en"
                      mode="single"
                      presentationStyle="pageSheet"
                      visible={startVisisble}
                      onDismiss={() => {
                        setStartVisisble(false);
                      }}
                      onConfirm={({ date }) => {
                        setStartVisisble(false);
                        if (date)
                          setStartDate(moment(date).format("YYYY-MM-DD"));
                        setEnddate("");
                      }}
                    />
                  </Pressable>
                  <Pressable
                    onPress={() => setEndVisible(true)}
                    className="mr-40 border-b-[0.5px] border-gray-500"
                  >
                    <Text className="color-gray-500 font-pr text-xl mb-2">
                      To:
                    </Text>
                    <Text className="color-black dark:color-white font-pm text-[15px] mb-2 opacity-80">
                      {endDate == "" ? "Pick" : endDate}
                    </Text>
                    <DatePickerModal
                      locale="en"
                      mode="single"
                      presentationStyle="pageSheet"
                      visible={endVisible}
                      onDismiss={() => {
                        setEndVisible(false);
                      }}
                      onConfirm={({ date }) => {
                        setEndVisible(false);
                        if (date) setEnddate(moment(date).format("YYYY-MM-DD"));
                      }}
                    />
                  </Pressable>
                </View>
                <View className="h-[50px] w-2/3 self-center mt-16 justify-center items-center">
                  {booking ? (
                    <ActivityIndicator
                      className="color-cyan-700"
                      size={wp(30)}
                    />
                  ) : (
                    <TouchableOpacity
                      onPress={() => bookProperty()}
                      className="h-full w-full bg-primaryLight rounded-2xl justify-center items-center"
                      style={{ opacity: bookVisible ? 1 : 0.3 }}
                      activeOpacity={0.3}
                    >
                      <Text className="color-black dark:color-white font-pm text-xl">
                        Book ${selectedProperty?.price ?? 0}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </BottomSheetScrollView>
            </View>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </Provider>
  );
};

export default HomeScreen;
