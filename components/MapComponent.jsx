import React from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

/**
 * Componente para exibir o mapa e os marcadores
 * @param {Object[]} markers - Lista de marcadores
 * @param {function} onMapPress - Função para tratar o evento de pressionar no mapa
 * @param {function} onMarkerPress - Função para tratar o evento de pressionar em um marcador
 * @param {Object} markedCoordinate - Coordenada marcada no mapa
 * @param {string} title - Título do marcador
 * @param {string} description - Descrição do marcador
 * @param {string} mapType - Tipo do mapa
 * @param {string} color - Cor do marcador
 * @param {string} icon - Ícone do marcador
 */
export default function MapComponent({ markers, onMapPress, onMarkerPress, markedCoordinate, title, description, mapType, color, icon }) {
     return (
          <MapView
               provider={PROVIDER_GOOGLE}
               style={styles.map}
               initialRegion={{
                    latitude: -9.516730933683634,
                    longitude: -43.00937485701058,
                    latitudeDelta: 0.0000992,
                    longitudeDelta: 0.0421,
               }}
               onPress={onMapPress}
               mapType={mapType}
          >
               {markers.map(marker => (
                    <Marker
                         key={marker.id}
                         coordinate={marker.coordinate}
                         title={marker.title}
                         description={`${marker.description}` || `Sem descrição`}
                         onPress={() => onMarkerPress(marker)}
                         // Adicionando ação de acessibilidade para leitura do marcador
                         accessibilityActions={{
                              label: 'Pressione para ver detalhes',                              
                         }}
                    >
                    
                         <MaterialIcons name={marker.icon} size={32} color={marker.color} style={styles.iconStyle} />

                    </Marker>
               ))}
               {markedCoordinate && (
                    <Marker
                         coordinate={markedCoordinate}
                         title={title}
                         description={`${description}`}
                    >
                         {icon ? (
                              <MaterialIcons name={icon} size={50} color={color} />
                         ) : (
                              <MaterialIcons name="place" size={50} color="red" />
                         )}
                    </Marker>
               )}
          </MapView>
     );
}

const styles = StyleSheet.create({
     map: {
          ...StyleSheet.absoluteFillObject,
          height: '100%',
     },
     iconStyle: {
          backgroundColor: 'white',
          borderRadius: 50,
          padding: 5,
          borderColor: 'gray',
          borderWidth: 1,
          elevation: 5,
     },
});