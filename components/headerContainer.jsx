import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function HeaderContainer() {
     return (
          <View style={styles.header}>
               <Text style={{ color: "#fff", fontSize: 21 }}>Map<Text style={{ fontWeight: "bold" }}>Network</Text></Text>
          </View>
     )
}

const styles = StyleSheet.create({
     header: {
          flex: 0.1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#1fad44",
          paddingTop: 25,
          paddingHorizontal: 15
     }
})