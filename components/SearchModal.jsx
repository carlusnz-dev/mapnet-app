import React, { useState, useEffect } from 'react';
import { Modal, View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function SearchModal({ modalVisible, setModalVisible, markers, onSelectMarker, contacts }) {
     const [searchTerm, setSearchTerm] = useState('');
     const [updatedMarkers, setUpdatedMarkers] = useState([]);

     useEffect(() => {
          if (markers && contacts) {
               const markersWithContacts = markers.map(marker => {
                    const markerContacts = contacts.filter(contact => contact.markerId === marker.id);
                    return { ...marker, contacts: markerContacts };
               });
               setUpdatedMarkers(markersWithContacts);
          }
     }, [markers, contacts]);

     const filteredMarkers = updatedMarkers.filter(marker =>
          marker.title.toLowerCase().includes(searchTerm.toLowerCase())
     );

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
                    <TextInput
                         style={styles.searchInput}
                         placeholder="Pesquisar Marcadores"
                         value={searchTerm}
                         onChangeText={setSearchTerm}
                    />

                    {filteredMarkers.length === 0 && (
                         <Text style={{
                              textAlign: 'center',
                              fontSize: 18,
                         }}>Nenhum marcador encontrado</Text>
                    )}

                    <FlatList
                         data={filteredMarkers}
                         renderItem={({ item }) => (
                              <TouchableOpacity onPress={() => { onSelectMarker(item); setModalVisible(false); }}>
                                   <View style={styles.markerItem}>
                                        <Text style={styles.markerTitle}>{item.title}</Text>
                                        <Text style={styles.markerDescription}>
                                             {item.description || 'Sem descrição'}
                                        </Text>
                                        <Text style={{
                                             backgroundColor: 'lightgray',
                                             textAlign: 'center',
                                             marginTop: 20,
                                             padding: 5,
                                             borderRadius: 10,
                                        }}>
                                             Possui {item.contacts ? item.contacts.length : 0} contatos
                                        </Text>
                                   </View>
                              </TouchableOpacity>
                         )}
                         keyExtractor={(item) => item.id}
                    />
                    <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                         <Text style={styles.closeButtonText}>Fechar</Text>
                    </TouchableOpacity>
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
     searchInput: {
          width: '100%',
          height: 50,
          padding: 10,
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: 'gray',
          borderRadius: 20,
          marginBottom: 20,
     },
     markerItem: {
          width: 200,
          backgroundColor: '#f9f9f9',
          borderRadius: 10,
          marginBottom: 20,
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: 'gray',
     },
     markerTitle: {
          fontSize: 22,
          marginBottom: 10,
          fontWeight: 'bold',
          textAlign: 'center',
     },
     markerDescription: {
          fontSize: 16,
          textAlign: 'center',
     },
     closeButton: {
          marginTop: 20,
          padding: 10,
          backgroundColor: '#1fad44',
          borderRadius: 10,
     },
     closeButtonText: {
          color: 'white',
          fontSize: 16,
     },
});
