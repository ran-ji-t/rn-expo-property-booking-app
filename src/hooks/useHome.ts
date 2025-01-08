import { useQuery } from "@tanstack/react-query";
import { getproperties, postBooking } from "../services/apiHandler";
import {
  useCallback,
  useDeferredValue,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { hp } from "../helpers/utils";
import { Property } from "../types/property";
import MapView from "react-native-maps";
import { useFocusEffect } from "expo-router";
import { logMessage } from "../helpers/logger";
import { LogLevel } from "../types/utils";

export const useHome = () => {
  const [searchText, setSearchText] = useState("");
  const defferedSearchText = useDeferredValue(searchText);
  const {
    data = [],
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["properties", defferedSearchText],
    queryFn: () => getproperties(defferedSearchText),
    refetchOnWindowFocus: "always",
    staleTime: 500,
  });
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [selectedCard, setSelectedCard] = useState("");
  const snapPoints = useMemo(() => ["50%", "93%"], []);
  const [startVisisble, setStartVisisble] = useState(false);
  const [endVisible, setEndVisible] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEnddate] = useState("");
  const [bookVisible, setBookVisible] = useState(false);
  const mapRef = useRef<MapView>(null);
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 10,
    longitudeDelta: 10,
  });
  const [booking, setBooking] = useState(false);
  const selectedProperty: Property | undefined = useMemo(() => {
    return data.find((item) => item.id == selectedCard);
  }, [selectedCard]);
  useEffect(() => {
    setRegion((pre) => {
      return {
        ...pre,
        latitude: selectedProperty?.location.coordinates.latitude ?? 0,
        longitude: selectedProperty?.location.coordinates.longitude ?? 0,
      };
    });
  }, [selectedCard]);
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );
  useEffect(() => {
    if (startDate != "" && endDate != "") setBookVisible(true);
    else setBookVisible(false);
  }, [startDate, endDate]);
  const presentSheet = (id: string) => {
    setSelectedCard(id);
    bottomSheetRef.current?.present();
  };
  const dismissBottomSheet = () => {
    setSelectedCard("");
    bottomSheetRef.current?.forceClose({
      duration: 500,
    });
    reset();
  };
  const reset = () => {
    setEndVisible(false);
    setEnddate("");
    setStartDate("");
    setStartVisisble(false);
    setSelectedCard("");
  };
  const bookProperty = async () => {
    setBooking(true);
    try {
      if (!selectedProperty) throw new Error("No id found");
      await postBooking({
        checkIn: startDate,
        checkOut: endDate,
        propertyId: selectedProperty?.id ?? "",
      });
      dismissBottomSheet();
    } catch (error: any) {
      logMessage(LogLevel.Error, "Unable to book property", error.message);
    }
    setBooking(false);
  };

  return {
    data,
    error,
    isLoading,
    bottomSheetRef,
    presentSheet,
    dismissBottomSheet,
    snapPoints,
    selectedProperty,
    startVisisble,
    endVisible,
    startDate,
    endDate,
    setEndVisible,
    setEnddate,
    setStartDate,
    setStartVisisble,
    reset,
    bookVisible,
    mapRef,
    region,
    searchText,
    setSearchText,
    booking,
    bookProperty,
  };
};
