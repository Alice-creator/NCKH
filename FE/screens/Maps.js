import React, { useState } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ScrollView,
    SafeAreaView
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import getDirections from 'react-native-google-maps-directions';
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

import locationIcon from "../assets/location.png"
import nearLocationIcon from "../assets/nearLocation.png"
import carIcon from "../assets/car.png"
import redPinIcon from "../assets/red-pin.png"
import pinIcon from "../assets/pin.png"
import starIcon from "../assets/star.png"

const Maps = ({ route, navigation }) => {

    const mapView = React.useRef()

    const [place, setPlace] = React.useState(null)
    const [placeName, setPlaceName] = React.useState("")
    const [fromLocation, setFromLocation] = React.useState({latitude: 10.769801, longitude: 106.70902})
    const [toLocation, setToLocation] = React.useState(null)
    const [region, setRegion] = React.useState(null)
    const [ nearList, setNearList ] = useState([])
    const [duration, setDuration] = React.useState(0)
    const [angle, setAngle] = React.useState(0)
    const [zoomLevel, setZoomLevel] = useState(1);

    React.useEffect(() => {
        // const currentLocation = {
        //     streetName: "adkdha",
        //     gps: {
        //         latitude: 1.5496614931250685,
        //         longitude: 110.36381866919922
        //     }
        // }
        const getCurrentLocation = async () => {
            // (async () => {
                // Kiểm tra quyền truy cập vào định vị
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                  console.log('Quyền truy cập vào định vị bị từ chối');
                  return;
                }
          
                // Lấy vị trí hiện tại
                let location = await Location.getCurrentPositionAsync({});

    
                const { latitude, longitude } = location.coords;
                
                setFromLocation({ latitude, longitude })
                // setFromLocation({ latitude: 10.769801, longitude: 106.70902 })
                console.log('Vị trí hiện tại:', location.coords);
                return { latitude, longitude }
                // return { latitude: 10.779801, longitude: 106.69902 }
            // })();
        }
        
        
        const updateMapRegion = async () => {
            let { data, nearList } = route.params;
            let toLoc = { "latitude": parseFloat(data.latitude), "longitude": parseFloat(data.longitude) }
            // const toLoc = { latitude: 10.779801, longitude: 106.69902 }
            const currentLocation = await getCurrentLocation();
            // const currentLocation = {latitude: 10.69801, longitude: 106.7902}
            if (!currentLocation) {
              return;
            }
        
            const minLatitude = Math.min(currentLocation.latitude, toLoc.latitude);
            const maxLatitude = Math.max(currentLocation.latitude, toLoc.latitude);
            const minLongitude = Math.min(currentLocation.longitude, toLoc.longitude);
            const maxLongitude = Math.max(currentLocation.longitude, toLoc.longitude);
            const latitudeDelta = maxLatitude - minLatitude + 0.02;
            const longitudeDelta = maxLongitude - minLongitude + 0.02;
            // let mapRegion = {
            //   latitude: (minLatitude + maxLatitude) / 2,
            //   longitude: (minLongitude + maxLongitude) / 2,
            //   latitudeDelta,
            //   longitudeDelta,
            // }; 
            let mapRegion = {
                latitude: (currentLocation.latitude + toLoc.latitude) / 2,
                longitude: (currentLocation.longitude + toLoc.longitude) / 2,
                latitudeDelta: Math.abs(currentLocation.latitude - toLoc.latitude),
                longitudeDelta: Math.abs(currentLocation.longitude - toLoc.longitude)
            }
            mapView.current.animateToRegion(mapRegion, 100)
            setPlaceName(data.name);
            setPlace(data)
            setRegion(mapRegion);
            setToLocation(toLoc)
            setNearList(nearList)
        };
        
        updateMapRegion();
        
        // setStreetName(street)
   
    }, [])

    function calculateAngle(coordinates) {
        let startLat = coordinates[0]["latitude"]
        let startLng = coordinates[0]["longitude"]
        let endLat = coordinates[1]["latitude"]
        let endLng = coordinates[1]["longitude"]
        let dx = endLat - startLat
        let dy = endLng - startLng

        return Math.atan2(dy, dx) * 180 / Math.PI
    }

    function zoomIn() {
        let newRegion = {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta / 2,
            longitudeDelta: region.longitudeDelta / 2
        }

        setRegion(newRegion)
        mapView.current.animateToRegion(newRegion, 200)
    }

    function zoomOut() {
        let newRegion = {
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta * 2,
            longitudeDelta: region.longitudeDelta * 2
        }

        setRegion(newRegion)
        mapView.current.animateToRegion(newRegion, 200)
    }
    function renderMap() {
        const destinationMarker = () => (
            <Marker
                coordinate={toLocation ? toLocation : {latitude: 10, longitude: 106}}
            >
                <View className="w-10 h-10 rounded-2xl flex items-center justify-center bg-white">
                    <View className="w-8 h-8 rounded-2xl flex justify-center items-center bg-red-500">
                        <Image
                            source={pinIcon}
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: "#fff"
                            }}
                        />
                    </View>
                </View>
            </Marker>
        )

        const carIconMarker = () => (
            <Marker
                coordinate={fromLocation}
                // anchor={{ x: 0.5, y: 0.5 }}
                // flat={true}
            >
                <Image
                    source={carIcon}
                    style={{
                        width: 25,
                        height: 25
                    }}
                />
            </Marker>
        )
        
        return (
            <SafeAreaView className="flex-1">
                <MapView
                    ref={mapView}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={region}
                    style={{ flex: 1 }}
                    onRegionChangeComplete={(region) => {
                        // Tính toán mức độ zoom dựa trên delta của region
                        const calculatedZoomLevel = Math.log2(360 / region.longitudeDelta) + 1;
                        console.log(calculatedZoomLevel)
                        setZoomLevel(calculatedZoomLevel);
                    }}
                >
                    {destinationMarker(toLocation)}
                    {carIconMarker()}
                    
                    {zoomLevel > 15 && nearList?.map((place, index) => (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: parseFloat(place.latitude),
                                longitude: parseFloat(place.longitude),
                            }}
                            anchor={{ x: 0.5, y: 0.5 }}
                            title={place.name}
                            description={place.address}
                            onPress={() => setPlace(place)}
                        >
                            <View className="flex-col justify-center items-center">
                                    <View className="w-12 h-12 rounded-lg">
                                        <Image
                                            source={{ uri: place?.image }}
                                            className="w-full h-full rounded-lg"
                                        /> 
                                    </View> 
                                    <View className="flex-row items-center">
                                        <Image source={locationIcon} tintColor="#3F95EC" className="w-4 h-4" />
                                        <Text className="text-xs font-semibold text-primary">{place.distance}</Text>
                                    </View>
                                
                            </View>
                        </Marker>
                    ))}
                </MapView>
            </SafeAreaView>
        )
    }

    function renderDestinationHeader() {
        return (
            <View
                style={{
                    position: 'absolute',
                    top: 50,
                    left: 0,
                    right: 0,
                    height: 50,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: width * 0.9,
                        paddingVertical: 4,
                        paddingHorizontal: 8,
                        borderRadius: 15,
                        backgroundColor: "#fff",
                    }}
                >
                    <Image
                        source={redPinIcon}
                        className="w-8 h-8 mr-2"
                    />

                    <View style={{ flex: 1 }}>
                        <Text>{placeName}</Text>
                    </View>
                    <Text>{Math.ceil(duration)} mins</Text>
                </View>
            </View>
        )
    }
    function renderPlace(place) {
        return (
            <View className="flex-row items-center mx-2" key={place?.name}>
                {/* Avatar */}
                <Image
                    source={{ uri: place?.image ? place.image : 'https://scontent.fsgn5-8.fna.fbcdn.net/v/t39.30808-6/349509252_1425089914979804_2757360445407738847_n.jpg?stp=cp6_dst-jpg&_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=a-0pPGGtYOkAX_IklEd&_nc_ht=scontent.fsgn5-8.fna&oh=00_AfA_7WQkJC92JzJoUyg3xU13Ra3wP9aht--RHSfNmUOKiQ&oe=6479279E' }}
                    style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25
                    }}
                />

                <View style={{ flex: 1, marginLeft: 8 }}>
                    {/* Name & Rating */}
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>{place?.name}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Image
                                className="h-4 w-4 mr-2"
                                source={starIcon}
                                style={{ tintColor: "#3F95EC" }}
                            />
                            <Text>{place?.likes}</Text>
                        </View>
                    </View>
                    <Text className="text-basic">{place?.address}</Text>
                </View>
            </View>
        )
    }
    function renderDeliveryInfo() {
        const handleMapPress = event => {
            
            const data = {
              source: toLocation,
              destination: fromLocation,
              params: [
                {
                  key: 'travelmode',
                  value: 'driving'
                },
                {
                  key: 'dir_action',
                  value: 'navigate'
                }
              ]
            };
        
            getDirections(data);
          };
        return (
            <View
                style={{
                    position: 'absolute',
                    bottom: 15,
                    left: 5,
                    right: 5,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <View
                    style={{
                        width: width * 0.9,
                        paddingVertical: 16,
                        paddingHorizontal: 8,
                        borderRadius: 16,
                        backgroundColor: "#fff"
                    }}
                >
                    {renderPlace(place)}
                    <View className="flex-row mt-4 justify-between">
                        <TouchableOpacity className="flex-1 h-12 mr-3 bg-slate-200 items-center justify-center rounded-xl"
                            onPress={() => navigation.navigate("Discover")}
                        >
                            <Text className="text-slate-700">Back</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="bg-primary flex-1 h-12 items-center justify-center rounded-xl"
                            onPress={handleMapPress}
                        >
                            <Text className="text-white">Direction</Text>
                        </TouchableOpacity>
                    </View>

                </View>
                
            </View>
        )
    }

    function renderButtons() {
        return (
            <View className="flex-col"
                style={{
                    position: 'absolute',
                    bottom: height * 0.25,
                    right: 10,
                    width: 60,
                    height: 130,
                }}
            >
                {/* Zoom In */}
                <TouchableOpacity className="h-8 w-12 rounded-t-lg bg-white items-center justify-center border-b-[1px] border-slate-400"
                    onPress={() => zoomIn()}
                >
                    <Text className="font-bold">+</Text>
                </TouchableOpacity>

                {/* Zoom Out */}
                <TouchableOpacity className="h-8 w-12 rounded-b-lg bg-white items-center justify-center"
                    onPress={() => zoomOut()}
                >
                    <Text className="font-bold">-</Text>
                </TouchableOpacity>
            </View>

        )
    }
    return (
        <View className="flex-1" >
            {renderMap()}
            {renderDestinationHeader()}
            {renderDeliveryInfo()}
            {renderButtons()}
        </View>
    )
}

export default Maps;
