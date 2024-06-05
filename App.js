import React from "react"
import Routes from "./routes/index"
import TestScreen from "./test/TestScreen"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import StyleMarkModal from "./components/StyleMarkModal"

export default function AppDefault() {
      return (
            <GestureHandlerRootView>
                  <Routes />
            </GestureHandlerRootView>
      )
}
