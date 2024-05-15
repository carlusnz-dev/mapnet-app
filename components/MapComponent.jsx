import React from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { StyleSheet } from 'react-native';

/**
 * Componente para exibir o mapa e os marcadores
 * @param {Object[]} markers - Lista de marcadores
 * @param {function} onMapPress - Função para tratar o evento de pressionar no mapa
 * @param {function} onMarkerPress - Função para tratar o evento de pressionar em um marcador
 * @param {Object} markedCoordinate - Coordenada marcada no mapa
 * @param {string} title - Título do marcador
 * @param {string} description - Descrição do marcador
 */
export default function MapComponent({ markers, onMapPress, onMarkerPress, markedCoordinate, title, description }) {
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
          >
               {markers.map(marker => (
                    <Marker
                         key={marker.id}
                         coordinate={marker.coordinate}
                         title={marker.title}
                         description={marker.description}
                         onPress={() => onMarkerPress(marker)}
                    />
               ))}
               {markedCoordinate && (
                    <Marker
                         coordinate={markedCoordinate}
                         title={title}
                         description={description}
                    />
               )}
          </MapView>
     );
}

const styles = StyleSheet.create({
     map: {
          ...StyleSheet.absoluteFillObject,
          height: '100%',
     },
});