import { useQuery } from "@tanstack/react-query";

import { getBookings } from "../services/apiHandler";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

export const useBooking = () => {
  const { data = [], isLoading, error, refetch } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookings,
    refetchOnWindowFocus: "always"
  });
  useFocusEffect(
      useCallback(() => {
        refetch();
      }, [])
    );
    
  return {
    data, isLoading, error
  };
};
