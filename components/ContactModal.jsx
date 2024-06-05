import React from 'react';
import { Modal, View, FlatList, Button, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

/**
 * Modal para exibir e adicionar contatos a um marcador
 * @param {boolean} modalVisible - Controle de visibilidade do modal
 * @param {Object[]} filteredContacts - Lista de contatos filtrados pelo marcador selecionado
 * @param {Object} selectedContact - Contato selecionado
 * @param {string} contactItemText - Texto do item de contato
 * @param {function} setContactItemText - Função para atualizar o texto do item de contato
 * @param {function} handleAddItem - Função para adicionar um item ao contato
 * @param {function} setModalVisible - Função para controlar a visibilidade do modal
 * @param {function} handleSelectContact - Função para selecionar um contato
 * @param {function} handleDeleteContact - Função para excluir um contato
 */
export default function ContactModal({ modalVisible, filteredContacts, selectedContact, contactItemText, setContactItemText, handleAddItem, setModalVisible, handleSelectContact, handleDeleteContact }) {
     return (
          <Modal
               animationType="slide"
               transparent={false}
               visible={modalVisible}
               onRequestClose={() => {
                    setModalVisible(false);
               }}
          >
               <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                         <Text style={styles.modalTitle}>Contatos</Text>
                         <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, marginBottom: 10 }} />
                         <FlatList
                              data={filteredContacts}
                              renderItem={({ item }) => (
                                   <View style={styles.contactItem}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                             <Text onPress={() => handleSelectContact(item)} style={styles.contactText}>{item.name} - contato</Text>
                                             {selectedContact && selectedContact.name === item.name && (
                                                  <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteContact(item)}>
                                                       <Text style={styles.buttonText}>Excluir</Text>
                                                  </TouchableOpacity>
                                             )}
                                        </View>
                                        <FlatList
                                             data={item.items}
                                             renderItem={({ item }) => (
                                                  <Text style={styles.itemText}>- {item}</Text>
                                             )}
                                             keyExtractor={(item, index) => index.toString()}
                                        />
                                        {selectedContact && selectedContact.name === item.name && (
                                             <View style={styles.formContainer}>
                                                  <TextInput
                                                       style={styles.inputItem}
                                                       placeholder="Item"
                                                       value={contactItemText}
                                                       onChangeText={setContactItemText}
                                                  />
                                                  <TouchableOpacity style={styles.editButton} onPress={handleAddItem}>
                                                       <Text style={styles.buttonText}>Adicionar</Text>
                                                  </TouchableOpacity>
                                             </View>
                                        )}
                                   </View>
                              )}
                              keyExtractor={(item, index) => index.toString()}
                         />
                         <Button title="Fechar" style={styles.btnClose} onPress={() => setModalVisible(false)} />
                    </View>
               </View>
          </Modal>
     );
}

const styles = StyleSheet.create({
     modalContainer: {
          flex: 1,
          padding: 30,
          justifyContent: 'center',
          alignItems: 'center',
     },
     modalContent: {
          width: "100%",
          height: "100%",
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 10,
          elevation: 5,
     },
     modalTitle: {
          fontSize: 32,
          fontWeight: 'bold',
          marginBottom: 10,
          textAlign: 'center',
     },
     contactItem: {
          marginBottom: 20,
     },
     contactText: {
          fontSize: 24,
          fontWeight: "bold",
     },
     buttonContainer: {
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginBottom: 10,
     },
     editButton: {
          backgroundColor: '#007bff',
          borderRadius: 10,
          paddingHorizontal: 20,
          paddingVertical: 10,
     },
     deleteButton: {
          backgroundColor: '#dc3545',
          borderRadius: 10,
          paddingHorizontal: 20,
          paddingVertical: 10,
     },
     buttonText: {
          color: 'white',
          fontWeight: 'bold',
     },
     itemText: {
          marginLeft: 20,
          marginBottom: 5,
          fontSize: 18,
     },
     formContainer: {
          flexDirection: 'column',
          alignItems: 'center',
          marginVertical: 10,
          paddingHorizontal: 20,
     },
     inputItem: {
          width: '70%',
          height: 50,
          marginBottom: 20,
          padding: 10,
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 20,
          elevation: 2,
     },
     btnClose: {
          backgroundColor: '#1fad44',
          borderRadius: 10,
          elevation: 5,
          padding: 10,
     }
});
