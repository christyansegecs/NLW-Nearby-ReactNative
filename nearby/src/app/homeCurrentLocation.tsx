//import React, { useState, useEffect } from 'react';
//import { View, Text } from 'react-native';
//import MapView, { Marker, Callout } from 'react-native-maps';
//import * as Location from 'expo-location';
//import { fontFamily, colors } from '@/styles/theme'
//
//const Home2 = () => {
//  const [location, setLocation] = useState(null);
//  const [markets, setMarkets] = useState([]);
//
//  useEffect(() => {
//    (async () => {
//      let { status } = await Location.requestForegroundPermissionsAsync();
//      if (status !== 'granted') {
//        console.log('Permission to access location was denied');
//        return;
//      }
//
//      let location = await Location.getCurrentPositionAsync({});
//      setLocation(location);
//    })();
//  }, []);
//
//  const currentLocation = location ? {
//    latitude: location.coords.latitude,
//    longitude: location.coords.longitude,
//    latitudeDelta: 0.01,
//    longitudeDelta: 0.01,
//  } : null;
//
//  return (
//    <View style={{ flex: 1 }}>
//      {currentLocation && (
//        <MapView
//          style={{ flex: 1 }}
//          initialRegion={currentLocation}
//        >
//          <Marker
//            identifier='currentLocation'
//            coordinate={{
//              latitude: currentLocation.latitude,
//              longitude: currentLocation.longitude,
//            }}
//            title='Você está aqui'
//            description='Sua localização atual'
//            image={require('@/assets/location.png')}
//          />
//          {markets.map((item) => (
//            <Marker
//              key={item.id}
//              identifier={item.id}
//              coordinate={{
//                latitude: item.latitude,
//                longitude: item.longitude,
//              }}
//              image={require('@/assets/pin.png')}
//            >
//              <Callout>
//                <View>
//                  <Text style={{ 
//                    fontSize: 14,
//                    color: colors.gray[600],
//                    fontFamily: fontFamily.regular
//                  }}>
//                    {item.name}
//                  </Text>
//                </View>
//              </Callout>
//            </Marker>
//          ))}
//        </MapView>
//      )}
//    </View>
//  );
//};
//
//export default Home;