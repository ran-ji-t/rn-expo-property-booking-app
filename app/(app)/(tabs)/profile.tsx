import { deleteItem, wp } from "@/src/helpers/utils";
import { userAtom } from "@/src/stores/userAtom";

import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { useAtom } from "jotai";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ProfileScreen = () => {
  const [user, setUser] = useAtom(userAtom);
  const queryClient = useQueryClient();
  const router = useRouter();

  const logout = async () => {
    try {
      await deleteItem();
      queryClient.invalidateQueries();
      router.replace("/(auth)");
      setUser(undefined);
    } catch (error) {}
  };

  return (
    <SafeAreaView edges={["top"]} className="flex-1 px-4 mt-4">
      <Text className="color-primaryLight font-pb text-3xl mb-5">Profile</Text>
      <View className="flex-1 items-center mt-20 justify-between">
        <View className="items-center">
          <FontAwesome color={"gray"} name="user" size={wp(70)} />
          <Text className="color-black dark:color-white font-pb text-2xl mt-3">
            {user?.name}
          </Text>
          <Text className="color-gray-800 dark:color-gray-300 font-pm text-[10px]">
            {user?.email}
          </Text>
        </View>
        <TouchableOpacity onPress={() => logout()} className="w-1/2 bg-secondaryLight justify-center items-center h-16 rounded-full mb-10">
          <Text className="text-center text-black dark:text-white font-pb text-2xl">
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;
