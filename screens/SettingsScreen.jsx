import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function SettingsScreen() {
     return (
          <View style={styles.container}>
               <View style={styles.header}>
                    <Text style={{ color: "#fff", fontSize: 21 }}>Map<Text style={{ fontWeight: "bold" }}>Network</Text> - Settings</Text>
               </View>
          </View>
     )
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          backgroundColor: "#fff",
     },
     header: {
          flex: 0.1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1fad44",
          paddingTop: 20,
          paddingHorizontal: 15,
          elevation: 5
     }
});