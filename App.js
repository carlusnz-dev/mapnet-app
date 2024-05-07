import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import StackLoginRoutes from "./routes/stack.routes";

export default function AppDefault() {
      return (
           <StackLoginRoutes />
      )
}
