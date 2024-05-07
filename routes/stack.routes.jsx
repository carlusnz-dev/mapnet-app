import React, {useEffect, useState} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoadingScreen from "../screens/LoadingScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";

const Stack = createStackNavigator()

export default function StackLoginRoutes() {

     const [isLoading, setIsLoading] = useState(true)

     useEffect(() => {
          setTimeout(() => {
               setIsLoading(false)
          }, 2000)
     }, []);

     return (
          <NavigationContainer>
               <Stack.Navigator initialRouteName={"Loading"}>
                    {isLoading ? (
                         <Stack.Screen name="Loading" component={LoadingScreen} options={{ headerShown: false }} />
                    ) : (
                         <>
                              <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                              <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
                         </>
                    )}
               </Stack.Navigator>
          </NavigationContainer>
     )

}