
import { View, Text, Alert } from 'react-native'
import { api } from '@/services/api'
import { useEffect, useState } from 'react'
import MapView, { Callout, Marker } from 'react-native-maps'

import * as Location from 'expo-location'

import { router } from 'expo-router'

import { Places } from '@/components/places'
import { PlaceProps } from '@/components/place'
import { Categories, CategoriesProps } from '@/components/categories'
import { fontFamily, colors } from '@/styles/theme'

type MarketsProps = PlaceProps & {
    latitude: number
    longitude: number
}

const currentLocation = {
    latitude: -23.561187293883442,
    longitude: -46.656451388116494,
  }

export default function Home() {

    const [categories, setCategories] = useState<CategoriesProps>([])
    const [category, setCategory] = useState('')
    const [markets, setMarkets] = useState<MarketsProps[]>([])
    //const [currentLocation, setCurrentLocation] = useState({
    //    latitude: -23.561187293883442,
    //    longitude: -46.656451388116494,
    //})

    async function fetchCategories() {
        try {
            const { data } = await api.get('/categories')
            setCategories(data)
            setCategory(data[0].id)
        } catch (error) {
            console.log(error)
            Alert.alert('Categorias', 'Não foi possível carregar as categorias.')
        }
    }

    async function fetchMarkets() {
        try {
            if (!category) return

            const {data} = await api.get('/markets/category/' + category)
            setMarkets(data)
        } catch (error) {
            console.log(error)
            Alert.alert('Locais', 'Não foi possível carregar os locais.')
        }
    }

    async function getCurrentLocation() {
        try {
            const { granted } = await Location.requestForegroundPermissionsAsync()

            if (granted) {
                const location = await Location.getCurrentPositionAsync({})
                //setCurrentLocation({
                //latitude: location.coords.latitude,
                //longitude: location.coords.longitude,
                //})
                //
                //console.log('location: ' + location.coords.latitude + ' ' + location.coords.longitude)
            }

        } catch (error) {
            console.log(error)
            Alert.alert('Localização', 'Não foi possível obter a localização atual.')
        }
    }

    useEffect(() => {
        fetchCategories()
    }, [])

    useEffect(() => {
        fetchMarkets()
    }, [category])

    //useEffect(() => {
    //    getCurrentLocation()
    //}, [currentLocation])

    return(
        <View style={{ flex: 1 }}>
            <Categories 
                data={categories}
                onSelect={setCategory}
                selected={category} />
            
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                }}
            />

            <Marker
                identifier='currentLocation'
                coordinate={{
                    latitude: currentLocation.latitude,
                    longitude: currentLocation.longitude,
                }}
                title='Você está aqui'
                description='Sua localização atual'
                image={require('@/assets/location.png')}
            />
            {
                markets.map(( item ) => (
                    <Marker
                        key={item.id}
                        identifier={item.id}
                        coordinate={{
                            latitude: item.latitude,
                            longitude: item.longitude,
                        }}
                        image={require('@/assets/pin.png')}
                    >
                        <Callout onPress={() => router.navigate(`/market/${item.id}`)}>
                            <View>
                                <Text style={{ 
                                    fontSize: 14,
                                    color: colors.gray[600],
                                    fontFamily: fontFamily.regular
                                    }}
                                >
                                    {item.name}
                                </Text>
                                <Text style={{ 
                                    fontSize: 12,
                                    color: colors.gray[600],
                                    fontFamily: fontFamily.medium
                                    }}
                                >
                                    {item.address}
                                </Text>
                            </View>
                        </Callout>
                    </Marker>
                ))
            }

            <Places data={markets} />
        </View>
    )
}