import React from 'react';
import { View, Text, TextInput, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

/**
 * Formulário para adicionar um novo marcador
 * @param {string} title - Título do marcador
 * @param {string} description - Descrição do marcador
 * @param {function} setTitle - Função para atualizar o título
 * @param {function} setDescription - Função para atualizar a descrição
 * @param {function} handleMarkLocation - Função para adicionar o marcador
 */
export default function MarkerForm({ title, description, setTitle, setDescription, handleMarkLocation }) {
     return (
          <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : null}>
               <View style={styles.formContainer}>
                    <TextInput
                         style={styles.input}
                         placeholder="Título"
                         value={title}
                         onChangeText={setTitle}
                    />
                    <TextInput
                         style={styles.input}
                         placeholder="Descrição"
                         value={description}
                         onChangeText={setDescription}
                    />
                    <TouchableOpacity style={styles.btn} onPress={handleMarkLocation}>
                         <Text style={styles.text}>Marcar Localização</Text>
                    </TouchableOpacity>
               </View>
          </KeyboardAvoidingView>
     );
}

const styles = StyleSheet.create({
     container: {
          flex: 0.6,
     },
     formContainer: {
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 10,
          elevation: 20,
     },
     input: {
          width: '90%',
          height: 50,
          marginBottom: 20,
          padding: 10,
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 20,
          elevation: 2,
     },
     btn: {
          width: 200,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#1fad44',
          borderRadius: 10,
          elevation: 5,
     },
     text: {
          color: 'white',
          fontSize: 17,
          fontWeight: 'bold',
     }
});