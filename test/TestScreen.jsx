import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MapView, { Marker } from 'react-native-maps';

const markers = [
     {
          coordinate: { latitude: -33.890542, longitude: 151.274856 },
          title: "Bondi Beach",
          image: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
     },
     {
          coordinate: { latitude: -33.923036, longitude: 151.259052 },
          title: "Coogee Beach",
          image: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
     },
     {
          coordinate: { latitude: -34.028249, longitude: 151.157507 },
          title: "Cronulla Beach",
          image: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
     },
     {
          coordinate: { latitude: -33.800101, longitude: 151.287478 },
          title: "Manly Beach",
          image: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
     },
     {
          coordinate: { latitude: -33.950198, longitude: 151.259302 },
          title: "Maroubra Beach",
          image: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
     }
];

const App = () => {
     return (
          <View style={styles.container}>
               <MapView
                    provider={MapView.PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={{
                         latitude: -33.9,
                         longitude: 151.2,
                         latitudeDelta: 0.5,
                         longitudeDelta: 0.5,
                    }}
               >
                    {markers.map((marker, index) => (
                         <Marker
                              key={index}
                              coordinate={marker.coordinate}
                              title={marker.title}
                         >
                              <MaterialIcons name="house" size={32} color="red" style={styles.flagIcon} />
                         </Marker>
                    ))}
               </MapView>
          </View>
     );
};

const styles = StyleSheet.create({
     container: {
          ...StyleSheet.absoluteFillObject,
          justifyContent: 'flex-end',
          alignItems: 'center',
     },
     map: {
          ...StyleSheet.absoluteFillObject,
     },
     flagIcon: {
          width: 50,
          height: 50,
          position: 'relative',
          left: 10,
     },
});

export default App;
