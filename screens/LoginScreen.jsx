import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function LoginScreen({ navigation }) {
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");

     const handleLogin = () => {
          console.log("Email:", email);
          console.log("Password:", password);
     };

     return (
          <View style={{ flex: 1 }}>
               <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center", backgroundColor: "#1fad44", elevation: 20 }}>
                    <Image source={require("../assets/5 - Logo Principal alternativa com nome.png")} style={styles.logo} />
               </View>
               <View style={{ flex: 1, padding: 20, justifyContent: "center", alignItems: "center" }}>
                    <Text style={styles.title}>Bem-vindo de volta!</Text>
                    <Text style={{ textAlign: "center", marginBottom: 50 }}>Entre de volta com sua conta</Text>
                    <TextInput
                         placeholder={"E-mail"}
                         style={styles.input}
                         autoFocus={true}
                         autoComplete={"email"}
                         inputMode={"email"}
                         onChangeText={setEmail} // Adicionei onChangeText para atualizar o estado 'email'
                    />
                    <TextInput
                         placeholder={"Senha"}
                         style={styles.input}
                         inputMode={"text"}
                         secureTextEntry={true}
                         onChangeText={setPassword} // Adicionei onChangeText para atualizar o estado 'password'
                    />
                    <TouchableOpacity style={styles.submit} onPress={handleLogin}>
                         <Text style={{ color: "#f0f0f0", fontWeight: "bold", fontSize: 18, textAlign: "center" }}>Entrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Register")} style={{ marginTop: 20 }}>
                         <Text style={{ fontSize: 15 }}>Ainda não possui uma conta? <Text style={{ color: "#1fad44", fontWeight: "bold" }}>Crie uma</Text></Text>
                    </TouchableOpacity>
               </View>
          </View>
     )
}

const styles = StyleSheet.create({
     logo: {
          width: 180,
          height: 180
     },
     title: {
          fontSize: 28,
          textAlign: "center",
          fontWeight: "bold"
     },
     input: {
          width: "80%",
          marginBottom: 20,
          padding: 15,
          borderRadius: 8,
          borderStyle: "solid",
          borderColor: "rgba(31,31,31,0.48)",
          borderWidth: 2,
          backgroundColor: "#fff",
          elevation: 10
     },
     submit: {
          width: "40%",
          marginTop: 30,
          padding: 15,
          borderRadius: 100,
          backgroundColor: "#1fad44",
     }
});
