import React from "react";
import { View, Text, TextInput, StyleSheet, Modal, TouchableOpacity, Alert } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function StyleMarkModal({
     modalVisible,
     setModalVisible,
     selectedColor,
     setSelectedColor,
     selectedIcon,
     setSelectedIcon,
     selectedType,
     setMarkerType,
     updateStyleMarker
}) {
     // Verificação de valores nulos e definição de valores padrão
     const defaultColor = selectedColor || 'red';
     const defaultIcon = selectedIcon || 'house';
     const defaultType = selectedType || 'não definido';

     const colors = ['red', 'blue', 'green', 'yellow', 'orange'];
     const icons = ['house', 'location-city', 'landscape'];

     return (
          <Modal
               animationType="slide"
               transparent={false}
               visible={modalVisible}
               onRequestClose={() => {
                    setModalVisible(false);
               }}
          >
               <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                         <Text style={styles.titleModal}>Escolha o estilo do marcador</Text>

                         <Text style={styles.modalText}>Escolha a cor</Text>
                         <View style={styles.colorContainer}>
                              {colors.map((color, index) => (
                                   <TouchableOpacity
                                        key={index}
                                        style={[
                                             styles.btnColor,
                                             { backgroundColor: color },
                                             defaultColor === color && styles.selected,
                                        ]}
                                        onPress={() => setSelectedColor(color)}
                                   >
                                        <Text style={styles.text}>{index + 1}</Text>
                                   </TouchableOpacity>
                              ))}
                         </View>

                         <Text style={styles.modalText}>Escolha o ícone</Text>
                         <View style={styles.iconContainer}>
                              {icons.map((icon, index) => (
                                   <TouchableOpacity
                                        key={index}
                                        onPress={() => setSelectedIcon(icon)}
                                   >
                                        <MaterialIcons
                                             name={icon}
                                             size={32}
                                             color={defaultIcon === icon ? 'blue' : 'black'}
                                        />
                                   </TouchableOpacity>
                              ))}
                         </View>

                         <TouchableOpacity
                              style={styles.btnSubmit}
                              onPress={() => {
                                   updateStyleMarker(
                                        selectedColor,
                                        selectedIcon
                                   );
                                   Alert.alert("Estilo do marcador atualizado com sucesso!");
                                   setModalVisible(false);
                              }}
                         >
                              <Text style={styles.submitText}>Salvar</Text>
                         </TouchableOpacity>

                         <TouchableOpacity
                              style={styles.btnSubmit}
                              onPress={() => setModalVisible(false)}
                         >
                              <Text style={styles.submitText}>Fechar</Text>
                         </TouchableOpacity>

                    </View>
               </View>
          </Modal>
     );
}

const styles = StyleSheet.create({
     centeredView: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 22,
     },
     titleModal: {
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 20,
     },
     modalView: {
          margin: 20,
          backgroundColor: "white",
          borderRadius: 20,
          padding: 35,
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: {
               width: 0,
               height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 10,
     },
     modalText: {
          marginBottom: 10,
          textAlign: "center",
     },
     colorContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 10,
          marginBottom: 30,
     },
     btnColor: {
          width: 30,
          height: 30,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
     },
     selected: {
          borderWidth: 2,
          borderColor: 'black',
     },
     iconContainer: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 10,
          marginBottom: 30,
     },
     btnSubmit: {
          backgroundColor: '#2196F3',
          width: 200,
          height: 45,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 10,
          marginTop: 50,
     },
     submitText: {
          fontSize: 18,
          color: "white",
     },
     text: {
          color: 'black',
     },
     input: {
          height: 40,
          margin: 12,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: 'gray',
          padding: 10,
          width: 200,
     },
});
