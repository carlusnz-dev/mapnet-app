import React, { useState } from "react";
import { View, Button, Text, TextInput, Alert, StyleSheet, TouchableOpacity, ToastAndroid } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import MapComponent from "../components/MapComponent";
import MarkerForm from "../components/MarkerForm";
import ContactModal from "../components/ContactModal";
import HeaderContainer from "../components/headerContainer";

export default function TestScreen() {
     const [markedCoordinate, setMarkedCoordinate] = useState(null);
     const [title, setTitle] = useState('');
     const [description, setDescription] = useState('');
     const [markers, setMarkers] = useState([]);
     const [contacts, setContacts] = useState([]);
     const [selectedMarker, setSelectedMarker] = useState(null);
     const [selectedContact, setSelectedContact] = useState(null);
     const [contactName, setContactName] = useState('');
     const [contactItemText, setContactItemText] = useState('');
     const [modalVisible, setModalVisible] = useState(false);

     const handleMapPress = (event) => {
          const { coordinate } = event.nativeEvent;
          console.log(coordinate);
          setMarkedCoordinate(coordinate);
     };

     const handleMarkLocation = () => {
          if (!markedCoordinate) {
               Alert.alert("Erro", "Por favor, selecione uma localização no mapa.");
               return;
          }
          if (!title.trim()) {
               Alert.alert("Erro", "Por favor, insira um título para a marcação.");
               return;
          }
          const newMarker = {
               id: Date.now().toString(),
               coordinate: markedCoordinate,
               title: title,
               description: description,
               contacts: []
          };
          setMarkers([...markers, newMarker]);
          setMarkedCoordinate(null);
          setTitle('');
          setDescription('');
          setSelectedMarker(newMarker);
     };

     const handleAddContact = () => {
          if (!selectedMarker) {
               Alert.alert("Erro", "Por favor, selecione uma marcação.");
               return;
          }
          if (!contactName.trim()) {
               Alert.alert("Erro", "Por favor, insira o nome do contato.");
               return;
          }
          const newContact = {
               name: contactName.trim(),
               items: [],
               markerId: selectedMarker.id
          };
          setContacts([...contacts, newContact]);
          setContactName('');
          ToastAndroid.show("Contato adicionado com sucesso!", ToastAndroid.SHORT);
     };

     const handleDeleteContact = (contact) => {
          const updatedContacts = contacts.filter(c => c.name !== contact.name);
          setContacts(updatedContacts);
     };

     const handleViewContacts = () => {
          setModalVisible(true);
     };

     const handleSelectContact = (contact) => {
          setSelectedContact(contact);
     };

     const handleAddItem = () => {
          if (!selectedContact) {
               Alert.alert("Erro", "Por favor, selecione um contato.");
               return;
          }
          if (!contactItemText.trim()) {
               Alert.alert("Erro", "Por favor, insira um item.");
               return;
          }
          const updatedContacts = contacts.map(c => {
               if (c.name === selectedContact.name) {
                    const updatedItems = [...c.items, contactItemText.trim()];
                    return { ...c, items: updatedItems };
               }
               return c;
          });
          setContacts(updatedContacts);
          setContactItemText('');
     };

     const handleDelItem = (contact) => {
          const updatedContacts = contacts.map(c => {
               if (c.name === contact.name) {
                    const updatedItems = c.items.filter(item => item !== contactItemText);
                    return { ...c, items: updatedItems };
               }
               return c;
          });
          setContacts(updatedContacts);
     };

     const handleDeselctMarker = () => {
          setMarkedCoordinate(null);
          setTitle('');
          setDescription('');
          setSelectedMarker(null);
     };

     const handleDeleteMarker = (markerId) => {
          const updatedMarkers = markers.filter(marker => marker.id !== markerId);
          setMarkers(updatedMarkers);
          const updatedContacts = contacts.filter(contact => contact.markerId !== markerId);
          setContacts(updatedContacts);
          setSelectedMarker(null);
     }

     const filteredContacts = selectedMarker ? contacts.filter(contact => contact.markerId === selectedMarker.id) : [];

     return (
          <View style={styles.container}>

               <HeaderContainer />

               <View style={styles.mapContainer}>
                    <MapComponent
                         markers={markers}
                         onMapPress={handleMapPress}
                         onMarkerPress={setSelectedMarker}
                         markedCoordinate={markedCoordinate}
                         title={title}
                         description={description}
                    />
                    <TouchableOpacity style={styles.btnDesl} onPress={handleDeselctMarker}>
                         <MaterialIcons name="close" size={24} color="white" />
                    </TouchableOpacity>

                    {selectedMarker && (
                         <TouchableOpacity style={styles.btnDesl} onPress={() => handleDeleteMarker(selectedMarker.id)}>
                              <MaterialIcons name="delete" size={24} color="white" />
                         </TouchableOpacity>
                    )}
               </View>
               {!selectedMarker && (
                    <MarkerForm
                         title={title}
                         description={description}
                         setTitle={setTitle}
                         setDescription={setDescription}
                         handleMarkLocation={handleMarkLocation}
                    />
               )}
               {selectedMarker && (
                    <View style={{ marginVertical: 10 }}>
                         <Text style={{ textAlign: 'center', fontSize: 28, fontWeight: 'bold' }}>{selectedMarker.title}</Text>
                         <Text style={{ textAlign: 'center', fontSize: 18 }}>{selectedMarker.description}</Text>
                    </View>
               )}
               {selectedMarker && (
                    <View style={styles.formContainer}>
                         <TextInput
                              style={styles.input}
                              placeholder="Nome do Contato"
                              value={contactName}
                              onChangeText={setContactName}
                         />
                         <TouchableOpacity style={styles.btn} onPress={handleAddContact}>
                              <Text style={{ color: 'white', fontSize: 16 }}>Adicionar Contato</Text>
                              <MaterialIcons name="person-add" size={30} color="white" />
                         </TouchableOpacity>
                    </View>
               )}
               {selectedMarker && (
                    <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: 'center', backgroundColor: '#fefefe', padding: 10, gap: 10 }}>
                         <TouchableOpacity style={styles.btnSec} onPress={handleViewContacts}>
                              <Text style={{ color: 'white' }}>Contatos</Text>
                              <MaterialIcons name="contacts" size={24} color="white" />
                         </TouchableOpacity>
                         <TouchableOpacity style={styles.btnSec} onPress={() => setSelectedMarker(null)}>
                              <MaterialIcons name="close" size={24} color="white" />
                         </TouchableOpacity>
                    </View>
               )}
               <ContactModal
                    modalVisible={modalVisible}
                    filteredContacts={filteredContacts}
                    selectedContact={selectedContact}
                    contactItemText={contactItemText}
                    setContactItemText={setContactItemText}
                    handleAddItem={handleAddItem}
                    setModalVisible={setModalVisible}
                    handleSelectContact={handleSelectContact}
                    handleDeleteContact={handleDeleteContact}
               />
          </View>
     );
}

const styles = StyleSheet.create({
     container: {
          flex: 1,
     },
     mapContainer: {
          position: 'relative',
          flex: 1,
          width: '100%',
     },
     formContainer: {
          flexDirection: 'column',
          alignItems: 'center',
          marginVertical: 10,
          paddingHorizontal: 20,
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
          height: 50,
          flexDirection: 'row',
          gap: 10,
          paddingHorizontal: 20,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#1fad44',
          borderRadius: 50,
          elevation: 5,
     },
     btnSec: {
          width: 150,
          height: 40,
          flexDirection: 'row',
          gap: 10,
          paddingHorizontal: 20,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#f24a4a',
          borderRadius: 10,
          elevation: 3,
     },
     btnDesl: {
          width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#1fad44',
          borderRadius: 10,
          elevation: 5,
          position: 'absolute',
          bottom: 10,
          right: 10,
     },
});
