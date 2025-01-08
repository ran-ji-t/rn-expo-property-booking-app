import { useRouter } from "expo-router";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { logMessage } from "@/src/helpers/logger";
import { setItem, wp } from "@/src/helpers/utils";
import { login } from "@/src/services/apiHandler";
import { userAtom } from "@/src/stores/userAtom";
import { LogLevel } from "@/src/types/utils";

const LoginScreen = () => {
  const [fetching, setFetching] = useState(false);
  const [_, setUser] = useAtom(userAtom);
  const router = useRouter();

  const signIn = async () => {
    setFetching(true);
    try {
      const res = await login();
      const user = {
        email: res.email,
        id: res.id,
        name: res.name,
      };
      setUser(user);
      setItem(user);
      router.replace("/(app)/(tabs)");
    } catch (error) {
      logMessage(LogLevel.Error, "Unable to perform action");
    }
    setFetching(false);
  };
  return (
    <SafeAreaView
      edges={["top"]}
      className="bg-white dark:bg-black flex-1 px-4 mt-4"
    >
      <Text className="color-primaryLight font-pb text-3xl mb-5">Login</Text>
      <View className="flex-1 justify-center items-center">
        {fetching ? (
          <ActivityIndicator color={"#D44638"} size={wp(30)} />
        ) : (
          <TouchableOpacity
            onPress={() => signIn()}
            className="w-1/2 bg-secondaryLight justify-center items-center h-16 rounded-full"
          >
            <Text className="text-center text-black dark:text-white font-pb text-2xl">
              Sign in
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
