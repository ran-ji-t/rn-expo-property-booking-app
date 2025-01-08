import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useSession } from "@/src/context/sessionContext";
import { wp } from "@/src/helpers/utils";

const LoginScreen = () => {
  const [fetching, setFetching] = useState(false);
  const router = useRouter();
  const { signIn } = useSession();

  const signInHandler = async () => {
    setFetching(true);
    try {
      await signIn();
      router.replace("/");
    } catch (error) {}
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
            onPress={() => {
              signInHandler();
            }}
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
