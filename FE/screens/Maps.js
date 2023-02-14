import React from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from "react-native-maps-directions";

import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

const GOOGLE_API_KEY =  "AIzaSyCYvMpmVhFc0ydILEuXGJNYNGFnBoKPCL8"

import carIcon from "../assets/car.png"
import redPinIcon from "../assets/red-pin.png"
import pinIcon from "../assets/pin.png"
import starIcon from "../assets/star.png"



const Maps = ({ route, navigation }) => {

    const mapView = React.useRef()

    const [place, setPlace] = React.useState(null)
    const [streetName, setStreetName] = React.useState("")
    const [fromLocation, setFromLocation] = React.useState(null)
    const [toLocation, setToLocation] = React.useState(null)
    const [region, setRegion] = React.useState(null)

    const [duration, setDuration] = React.useState(0)
    const [isReady, setIsReady] = React.useState(false)
    const [angle, setAngle] = React.useState(0)

    React.useEffect(() => {
        const currentLocation = {
            streetName: "Kuching",
            gps: {
                latitude: 1.5496614931250685,
                longitude: 110.36381866919922
            }
        }

        let { data } = route.params;
        console.log(data.result_object.longitude)
        let fromLoc = currentLocation.gps
        let toLoc = { "latitude": data.result_object.latitude, "longitude": data.result_object.longitude }
        let street = currentLocation.streetName

        let mapRegion = {
            latitude: (fromLoc.latitude + toLoc.latitude) / 2,
            longitude: (fromLoc.longitude + toLoc.longitude) / 2,
            latitudeDelta: Math.abs(fromLoc.latitude - toLoc.latitude) * 2,
            longitudeDelta: Math.abs(fromLoc.longitude - toLoc.longitude) * 2
        }

        setPlace(data)
        setStreetName(street)
        setFromLocation(fromLoc)
        setToLocation(toLoc)
        setRegion(mapRegion)

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
                coordinate={toLocation}
            >
                <View className="w-10 h-10 rounded-2xl flex items-center justify-center bg-white">
                    <View className="w-8 h-8 rounded-2xl flex justify-center items-center bg-primary">
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

        const carIcon = () => (
            <Marker
                coordinate={fromLocation}
                anchor={{ x: 0.5, y: 0.5 }}
                flat={true}
                rotation={angle}
            >
                <Image
                    source={carIcon}
                    style={{
                        width: 40,
                        height: 40
                    }}
                />
            </Marker>
        )

        return (
            <View style={{ flex: 1 }}>
                <MapView
                    ref={mapView}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={region}
                    style={{ flex: 1 }}
                >
                    <MapViewDirections
                        origin={fromLocation}
                        destination={toLocation}
                        apikey={GOOGLE_API_KEY}
                        strokeWidth={5}
                        strokeColor="#3F95EC"
                        optimizeWaypoints={true}
                        onReady={result => {
                            setDuration(result.duration)

                            if (!isReady) {
                                // Fit route into maps
                                mapView.current.fitToCoordinates(result.coordinates, {
                                    edgePadding: {
                                        right: (width / 20),
                                        bottom: (height / 4),
                                        left: (width / 20),
                                        top: (height / 8)
                                    }
                                })

                                // Reposition the car
                                let nextLoc = {
                                    latitude: result.coordinates[0]["latitude"],
                                    longitude: result.coordinates[0]["longitude"]
                                }

                                if (result.coordinates.length >= 2) {
                                    let angle = calculateAngle(result.coordinates)
                                    setAngle(angle)
                                }

                                setFromLocation(nextLoc)
                                setIsReady(true)
                            }
                        }}
                    />
                    {destinationMarker()}
                    {fromLocation? carIcon() : null}
                </MapView>
            </View>
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
                        backgroundColor: "#fff"
                    }}
                >
                    <Image
                        source={redPinIcon}
                        className="w-8 h-8 mr-2"
                    />

                    <View style={{ flex: 1 }}>
                        <Text>{streetName}</Text>
                    </View>

                    <Text>{Math.ceil(duration)} mins</Text>
                </View>
            </View>
        )
    }

    function renderDeliveryInfo() {
        return (
            <View
                style={{
                    position: 'absolute',
                    bottom: 50,
                    left: 0,
                    right: 0,
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
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {/* Avatar */}
                        <Image
                            source={{ uri: place?.result_object.photo.images.original.url}}
                            style={{
                                width: 50,
                                height: 50,
                                borderRadius: 25
                            }}
                        />

                        <View style={{ flex: 1, marginLeft: 8 }}>
                            {/* Name & Rating */}
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text>{place?.result_object.name}</Text>
                                <View style={{ flexDirection: 'row' }}>
                                    <Image
                                        className="h-4 w-4 mr-2"
                                        source={starIcon}
                                        style={{ tintColor: "#3F95EC" }}
                                    />
                                    <Text>{place?.result_object.rating}</Text>
                                </View>
                            </View>
                            <Text className="text-basic">{place?.result_object.name}</Text>
                        </View>
                    </View>

                    <View className="flex-row mt-4 justify-between">
                        <TouchableOpacity className="flex-1 h-12 mr-3 bg-primary items-center justify-center rounded-xl"
                            onPress={() => navigation.navigate("HomePage")}
                        >
                            <Text className="text-white">Call</Text>
                        </TouchableOpacity>

                        <TouchableOpacity className="text-secondary flex-1 h-12 items-center justify-center rounded-xl">
                            <Text className="text-white">Cancel</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        )
    }

    function renderButtons() {
        return (
            <View
                style={{
                    position: 'absolute',
                    bottom: height * 0.35,
                    right: 16,
                    width: 60,
                    height: 130,
                    justifyContent: 'space-between'
                }}
            >
                {/* Zoom In */}
                <TouchableOpacity className="h-16 w-16 rounded-full bg-white items-center justify-center"
                    onPress={() => zoomIn()}
                >
                    <Text className="font-bold">+</Text>
                </TouchableOpacity>

                {/* Zoom Out */}
                <TouchableOpacity className="h-16 w-16 rounded-full bg-white items-center justify-center"
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