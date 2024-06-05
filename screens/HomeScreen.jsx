import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, ToastAndroid } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import MapComponent from "../components/MapComponent";
import MarkerForm from "../components/MarkerForm";
import ContactModal from "../components/ContactModal";
import HeaderContainer from "../components/HeaderContainer";
import StyleMarkModal from "../components/StyleMarkModal";
import SearchModal from "../components/SearchModal"; // Import the new component

export default function HomeScreen() {
     // State management
     const [markedCoordinate, setMarkedCoordinate] = useState(null);
     const [title, setTitle] = useState('');
     const [description, setDescription] = useState('');
     const [markers, setMarkers] = useState([]);
     const [mapType, setMapType] = useState('hybrid');
     const [contacts, setContacts] = useState([]);
     const [selectedMarker, setSelectedMarker] = useState(null);
     const [selectedContact, setSelectedContact] = useState(null);
     const [contactName, setContactName] = useState('');
     const [contactItemText, setContactItemText] = useState('');
     const [contactModalVisible, setContactModalVisible] = useState(false);
     const [styleMarkModalVisible, setStyleMarkModalVisible] = useState(false);
     const [searchModalVisible, setSearchModalVisible] = useState(false); // State for search modal
     const [selectedColor, setSelectedColor] = useState(null);
     const [selectedIcon, setSelectedIcon] = useState(null);
     const [selectedType, setSelectedType] = useState(null);

     // Effect
     useEffect(() => {
          if (selectedMarker) {
               const updatedContacts = contacts.filter(contact => contact.markerId === selectedMarker.id);
               if (JSON.stringify(updatedContacts) !== JSON.stringify(selectedMarker.contacts)) {
                    setSelectedMarker(prevMarker => ({ ...prevMarker, contacts: updatedContacts }));
               }
          }
     }, [contacts, selectedMarker]);

     // Handlers
     const handleMapPress = (event) => {
          const { coordinate } = event.nativeEvent;
          setMarkedCoordinate(coordinate);
          if (selectedMarker) {
               setSelectedMarker(null);
          }
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
               contacts: [],
               color: selectedColor || 'red',
               icon: selectedIcon || 'place',
          };
          setMarkers([...markers, newMarker]);
          resetForm();
          setSelectedMarker(newMarker);
          ToastAndroid.show("Marcação adicionada com sucesso!", ToastAndroid.SHORT);
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
               markerId: selectedMarker.id,
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
          setContactModalVisible(true);
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

     const handleDeselectMarker = () => {
          resetForm();
          setSelectedMarker(null);
     };

     const handleDeleteMarker = (markerId) => {
          const updatedMarkers = markers.filter(marker => marker.id !== markerId);
          setMarkers(updatedMarkers);
          const updatedContacts = contacts.filter(contact => contact.markerId !== markerId);
          setContacts(updatedContacts);
          setSelectedMarker(null);
     };

     const handleMapTypeChange = () => {
          setMapType(mapType === 'standard' ? 'hybrid' : 'standard');
     };

     const handleStyleMark = () => {
          setStyleMarkModalVisible(true);
     };

     const updateStyleMarker = () => {
          if (!selectedMarker) {
               console.log("Nenhum marcador selecionado.");
               return;
          }
          console.log("Atualizar estilo:", selectedColor, selectedIcon, selectedType);
          const updatedMarkers = markers.map(marker => {
               if (marker.id === selectedMarker.id) {
                    return {
                         ...marker,
                         color: selectedColor,
                         icon: selectedIcon,
                         type: selectedType,
                    };
               }
               return marker;
          });
          setMarkers(updatedMarkers);
          setSelectedMarker(null);
          setStyleMarkModalVisible(false);
     };

     const resetForm = () => {
          setMarkedCoordinate(null);
          setTitle('');
          setDescription('');
          setSelectedColor(null);
          setSelectedIcon(null);
          setSelectedType(null);
     };

     const handleMarkerPress = (marker) => {
          const markerContacts = contacts.filter(contact => contact.markerId === marker.id);
          setSelectedMarker({ ...marker, contacts: markerContacts });
     };

     const filteredContacts = selectedMarker ? contacts.filter(contact => contact.markerId === selectedMarker.id) : [];

     return (
          <View style={styles.container}>
               <HeaderContainer />

               <View style={styles.mapContainer}>
                    <MapComponent
                         markers={markers}
                         onMapPress={handleMapPress}
                         onMarkerPress={handleMarkerPress}
                         markedCoordinate={markedCoordinate}
                         title={title}
                         description={description}
                         icon={selectedMarker?.icon}
                         color={selectedMarker?.color}
                         type={selectedMarker?.type}
                         mapType={mapType}
                    />

                    {markedCoordinate && (
                         <TouchableOpacity style={styles.btnDesl} onPress={handleDeselectMarker}>
                              <MaterialIcons name="close" size={24} color="white" />
                         </TouchableOpacity>
                    )}

                    {selectedMarker && (
                         <TouchableOpacity style={styles.btnDesl} onPress={() => handleDeleteMarker(selectedMarker.id)}>
                              <MaterialIcons name="delete" size={24} color="white" />
                         </TouchableOpacity>
                    )}

                    {!markedCoordinate && !selectedMarker && (
                         <TouchableOpacity style={styles.btnSwitch} onPress={handleMapTypeChange}>
                              <MaterialIcons name="satellite" size={24} color="white" />
                         </TouchableOpacity>
                    )}

                    {!markedCoordinate && selectedMarker && (
                         <TouchableOpacity style={{
                              ...styles.btnSwitch,
                              top: 70,
                         }} onPress={handleStyleMark}>
                              <MaterialIcons name="style" size={24} color="white" />
                         </TouchableOpacity>
                    )}

                    {!markedCoordinate && !selectedMarker && (
                         <TouchableOpacity style={{
                              ...styles.btnSwitch,
                              top: 70,
                         }} onPress={() => setSearchModalVisible(true)}>
                              <MaterialIcons name="search" size={24} color="white" />
                         </TouchableOpacity>
                    )}

               </View>

               {markedCoordinate && !selectedMarker && (
                    <MarkerForm
                         title={title}
                         description={description}
                         setTitle={setTitle}
                         setDescription={setDescription}
                         handleMarkLocation={handleMarkLocation}
                         handleStyleMark={handleStyleMark}
                    />
               )}

               {selectedMarker && (
                    <>
                         <View style={styles.markerInfo}>
                              <Text style={styles.markerTitle}>
                                   {selectedMarker.title}
                              </Text>

                              {selectedMarker.description && (
                                   <Text style={styles.markerDescription}>
                                        {selectedMarker.description}
                                   </Text>
                              )}

                              {selectedMarker.contacts.length > 0 && (
                                   <Text style={{
                                        backgroundColor: 'lightgray',
                                        textAlign: 'center',
                                        marginTop: 20,
                                        padding: 5,
                                        borderRadius: 10,
                                   }}>
                                        Possui {selectedMarker.contacts.length} contatos
                                   </Text>
                              )}

                              {selectedMarker.contacts.length === 0 && (
                                   <Text style={{
                                        backgroundColor: 'lightgray',
                                        textAlign: 'center',
                                        marginTop: 20,
                                        padding: 5,
                                        borderRadius: 10,
                                   }}>
                                        Sem contatos
                                   </Text>
                              )}
                         </View>


                         <View style={styles.formContainer}>
                              <TextInput
                                   style={styles.input}
                                   placeholder="Nome do Contato"
                                   value={contactName}
                                   onChangeText={setContactName}
                              />
                              <TouchableOpacity style={styles.btn} onPress={handleAddContact}>
                                   <Text style={styles.btnText}>Adicionar Contato</Text>
                                   <MaterialIcons name="person-add" size={30} color="white" />
                              </TouchableOpacity>
                         </View>

                         <View style={styles.contactOptions}>
                              <TouchableOpacity style={styles.btnSec} onPress={handleViewContacts}>
                                   <Text style={styles.btnText}>Contatos</Text>
                                   <MaterialIcons name="contacts" size={24} color="white" />
                              </TouchableOpacity>
                              <TouchableOpacity style={styles.btnClose} onPress={() => setSelectedMarker(null)}>
                                   <MaterialIcons name="close" size={24} color="white" />
                              </TouchableOpacity>
                         </View>
                    </>
               )}

               {contactModalVisible && (
                    <ContactModal
                         modalVisible={contactModalVisible}
                         filteredContacts={filteredContacts}
                         selectedContact={selectedContact}
                         contactItemText={contactItemText}
                         setContactItemText={setContactItemText}
                         handleAddItem={handleAddItem}
                         setModalVisible={setContactModalVisible}
                         handleSelectContact={handleSelectContact}
                         handleDeleteContact={handleDeleteContact}
                    />
               )}

               {styleMarkModalVisible && (
                    <StyleMarkModal
                         selectedColor={selectedColor}
                         selectedIcon={selectedIcon}
                         selectedType={selectedType}
                         setSelectedColor={setSelectedColor}
                         setSelectedIcon={setSelectedIcon}
                         setSelectedType={setSelectedType}
                         setModalVisible={setStyleMarkModalVisible}
                         updateStyleMarker={updateStyleMarker}
                    />
               )}

               <SearchModal
                    modalVisible={searchModalVisible}
                    setModalVisible={setSearchModalVisible}
                    markers={markers}
                    contacts={contacts}
                    onSelectMarker={setSelectedMarker}
               />
          </View>
     );
}

// Styles
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
     btnText: {
          color: 'white',
          fontSize: 16,
     },
     btnSec: {
          width: 150,
          height: 40,
          flexDirection: 'row',
          gap: 10,
          paddingHorizontal: 20,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#5AB2FF',
          borderRadius: 10,
          elevation: 3,
     },
     btnDesl: {
          width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#E72929',
          borderRadius: 10,
          elevation: 5,
          position: 'absolute',
          top: 10,
          right: 10,
     },
     btnClose: {
          width: 150,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#E72929',
          borderRadius: 10,
          elevation: 5,
     },
     btnSwitch: {
          width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#5AB2FF',
          borderWidth: 5,
          borderColor: 'white',
          borderRadius: 10,
          position: 'absolute',
          top: 10,
          right: 10,
     },
     markerInfo: {
          marginVertical: 10,
          alignItems: 'center',
     },
     markerTitle: {
          textAlign: 'center',
          fontSize: 28,
          fontWeight: 'bold',
     },
     markerDescription: {
          textAlign: 'center',
          fontSize: 18,
     },
     contactOptions: {
          flexDirection: "row",
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fefefe',
          padding: 10,
          gap: 10,
     },
});
