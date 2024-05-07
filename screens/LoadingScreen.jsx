import React from "react";
import {View, StyleSheet, ActivityIndicator, Image} from "react-native"

export default function LoadingScreen() {
     return (
          <View style={styles.container}>
               <Image source={require("../assets/4 - Logo Principal alternativa.png")} style={styles.image} />
               <ActivityIndicator color={"#f0f0f0"} size={40} style={{ marginTop: 50 }} />
          </View>
     )
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1fad44"
     },
     image: {
          width: 200,
          height: 200
     },
})