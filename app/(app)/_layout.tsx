import { useSession } from "@/src/context/sessionContext";
import { wp } from "@/src/helpers/utils";

import { Redirect, Stack } from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";

const ChildRoot = () => {
  const { session, isLoading } = useSession();

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white dark:bg-black">
        <ActivityIndicator color={"#D44638"} size={wp(30)} />
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/signIn" />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default ChildRoot;
