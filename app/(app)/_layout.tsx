import { getUserDetails, wp } from "@/src/helpers/utils";
import { userAtom } from "@/src/stores/userAtom";
import { useQuery } from "@tanstack/react-query";

import { Redirect, Stack } from "expo-router";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

const ChildRoot = () => {
  const [user, setUser] = useAtom(userAtom);
  const {
    data,
    error: queryError,
    isLoading: queryLoading,
    isFetched,
  } = useQuery({
    queryKey: ["auth"],
    queryFn: getUserDetails,
    enabled: !user,
  });
  useEffect(() => {
    if (data && !user) {
      setUser(data);
    }
  }, [data, user, setUser]);
  if (queryLoading && !isFetched) {
    return (
      <View className="flex-1 justify-center items-center bg-white dark:bg-black">
        <ActivityIndicator color={"#D44638"} size={wp(30)} />
      </View>
    );
  }

  if (!data || queryError) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};

export default ChildRoot;
