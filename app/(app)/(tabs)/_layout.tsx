import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import React from "react";

import Colors from "@/src/constants/Colors";
import { hp, wp } from "@/src/helpers/utils";
import { useColorScheme } from "@/src/hooks/useColorScheme";

const TabsLayout = () => {
  const colorScheme = useColorScheme() ?? "light";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme].tabIconSelected,
        tabBarInactiveTintColor: Colors[colorScheme].tabIconDefault,
        tabBarStyle: {
          height: hp(40),
        },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon({ color }) {
            return (
              <MaterialCommunityIcons
                name="office-building-marker"
                size={wp(30)}
                color={color}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="booking"
        options={{
          title: "Booking",
          tabBarIcon({ color, size }) {
            return (
              <FontAwesome6
                name="building-circle-check"
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon({ color, size }) {
            return <Ionicons name="person" size={size} color={color} />;
          },
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
