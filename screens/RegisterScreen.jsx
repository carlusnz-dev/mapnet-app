import React, { useState } from "react";
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function RegisterScreen({ navigation }) {
     const [name, setName] = useState("");
     const [email, setEmail] = useState("");
     const [password, setPassword] = useState("");

     const handleRegister = () => {
          // Lógica para registrar o usuário com nome, e-mail e senha
          console.log("Name:", name);
          console.log("E-mail:", email);
          console.log("Password:", password);
          navigation.navigate("Login")
     };

     return (
          <View style={{ flex: 1 }}>
               <View style={{ flex: 0.5, justifyContent: "center", alignItems: "center", backgroundColor: "#1fad44", elevation: 20 }}>
                    <Image source={require("../assets/5 - Logo Principal alternativa com nome.png")} style={styles.logo} />
               </View>
               <View style={{ flex: 1, padding: 20, justifyContent: "center", alignItems: "center" }}>
                    <Text style={styles.title}>Crie sua conta</Text>
                    <Text style={styles.subtitle}>Preencha os campos abaixo para criar sua conta</Text>
                    <TextInput
                         placeholder="Nome"
                         style={styles.input}
                         value={name}
                         onChangeText={setName}
                    />
                    <TextInput
                         placeholder="E-mail"
                         style={styles.input}
                         value={email}
                         onChangeText={setEmail}
                         autoCompleteType="email"
                         keyboardType="email-address"
                    />
                    <TextInput
                         placeholder="Senha"
                         style={styles.input}
                         value={password}
                         onChangeText={setPassword}
                         secureTextEntry={true}
                    />
                    <TouchableOpacity style={styles.submit} onPress={handleRegister}>
                         <Text style={{ color: "#f0f0f0", fontWeight: "bold", fontSize: 18, textAlign: "center" }}>Registrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Login")} style={{ marginTop: 20 }}>
                         <Text style={{ fontSize: 15 }}>Já possui uma conta? <Text style={{ color: "#1fad44", fontWeight: "bold" }}>Faça login</Text></Text>
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
          fontWeight: "bold",
     },
     subtitle: {
          textAlign: "center",
          marginBottom: 50,
     },
     input: {
          width: "80%",
          marginBottom: 20,
          padding: 15,
          borderRadius: 8,
          borderStyle: "solid",
          borderColor: "#1fad44",
          borderWidth: 2,
          backgroundColor: "#fff",
          // Sombra Android
          elevation: 10,
          // Sombra iOS
          shadowColor: "#000",
          shadowOffset: {
               width: 0,
               height: 2
          },
          shadowOpacity: 0.15,
          shadowRadius: 10
     },
     submit: {
          width: "40%",
          marginTop: 30,
          padding: 15,
          borderRadius: 100,
          backgroundColor: "#1fad44",
     }
});
