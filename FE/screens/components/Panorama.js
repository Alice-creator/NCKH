

// /**
//  * Pull in all imports required for the controls within this scene.
//  */
// import React, { Component } from 'react';
// import {StyleSheet} from 'react-native';


// import backgroundImage from '../../assets/westlake_towers.jpg'

// /**
//  * Set all the images and assets required in this scene.
//  */

// // import {
// //     ViroARScene,
// //     ViroARSceneNavigator,
// //     ViroMaterials,
// //     ViroAnimations,
// //     ViroBox,
// //   } from '@viro-community/react-viro';
  
//   /**
//    * Every 3D object will require materials to display texture on body.
//    * We have to create all materials before we use them with our elements.
//    */
//   ViroMaterials.createMaterials({
//     /**
//      * Material in its simplest form is just diffused color
//      */
//     white: {
//       diffuseColor: 'rgba(255,255,255,1)',
//     },
//     /**
//      * We can also diffuse a texture here.
//      */
//     grid: {
//       diffuseTexture: backgroundImage
//     },
//   });
  
//   ViroAnimations.registerAnimations({
//     /** To begin with we have added simple rotation animation */
//     rotate: {
//       properties: {
//       rotateY: '+=90',
//       },
//       duration: 2500, //.25 seconds
//     },
//   });
  
// const Panorama = () => {


//     /**
//      * Renders a scene with a 360 Photo background that contains a few toggleable Info UI Elements
//      * featuring iconic items like the SLUT, monorail and statue.
//      */
//     // return (
//     //   // <ViroScene style={styles.container}>
//         // <Viro360Image source={backgroundImage} />

//     //   // </ViroScene>
//     // );
//  }
// /**
//  * Declare all custom flex box styles here to be reference by the
//  * controls above.
//  */
// var styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
// });

// /**
//  * Declare all your animations here. They'll be referenced by the animation props.
//  */
// // ViroAnimations.registerAnimations({
// //     fadeIn:{properties:{opacity: 1.0}, duration: 1000},
// // });

// export default Panorama
import { View, Text } from 'react-native'
import React from 'react'

const Panorama = () => {
  return (
    <View>
      <Text>Panorama</Text>
    </View>
  )
}

export default Panorama