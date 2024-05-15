import React from "react"
import TestScreen from "./test/TestScreen"
import { GestureHandlerRootView } from "react-native-gesture-handler"

export default function AppDefault() {
      return (
            <GestureHandlerRootView>
                  <TestScreen />
            </GestureHandlerRootView>
      )
}
