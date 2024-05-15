import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";

const Tab = createBottomTabNavigator();

export default function TabsRoutes() {
     return (
          <NavigationContainer>
               <Tab.Navigator
                    initialRouteName="Home"
                    tabBarOptions={{
                         activeTintColor: "#000",
                         inactiveTintColor: "#999",
                         showLabel: false,
                         style: {
                              backgroundColor: "#fff",
                              borderTopWidth: 0,
                         },
                    }}
               >

                    <Tab.Screen name="Home" component={HomeScreen} options={{
                         headerShown: false,
                         tabBarIcon: ({ color }) => (
                              <MaterialIcons name="home" size={24} color={color} />
                         ),
                    }} />

                    <Tab.Screen name="Profile" component={ProfileScreen} options={{
                         headerShown: false,
                         tabBarIcon: ({ color }) => (
                              <MaterialIcons name="person" size={24} color={color} />
                         ),
                    }} />

                    <Tab.Screen name="Settings" component={SettingsScreen} options={{
                         headerShown: false,
                         tabBarIcon: ({ color }) => (
                              <MaterialIcons name="settings" size={24} color={color} />
                         ),
                    }} />

               </Tab.Navigator>
          </NavigationContainer>
     )
}