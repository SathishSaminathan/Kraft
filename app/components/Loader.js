//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity,Dimensions,Image,StatusBar } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Pulse from "react-native-pulse";

import colorFonts from "../assets/styles/common";
import images from "../assets/img/image";

const {width,height}=Dimensions.get("window");

// create a component
class Loader extends Component {
    static navigationOptions ={
        header:null
    }

    render() {
        return (
                <View
                    style={styles.container}
                >
                <StatusBar 
                    backgroundColor="transparent"
                    translucent
                    barStyle="light-content"
                />
                    {/* <ImageBackground  
                        style={styles.logoContainer}    
                        source={images.loginBackground}           
                    >
                        <Animatable.Text 
                            style={styles.logoText}
                            animation="pulse"
                            iterationCount={100}
                        >Kraft......
                        </Animatable.Text>
                    </ImageBackground> */}

                    {/* Animation with react-native-animatable */}
                    {/* <Animatable.View  
                        style={styles.logoContainer}
                        animation="pulse"            
                        iterationCount={100}
                    >
                        <Image 
                            style={styles.loaderImg}
                            source={images.loaderImg}
                        />
                    </Animatable.View> */}

                    {/* Animation with react-native-pulse */}
                     {/* <Pulse color={colorFonts.COLOR_PRIMARY_PINK} numPulses={3} diameter={400} speed={40} duration={2000} />
                     <Image 
                            style={styles.loaderImgPulse}
                            source={images.loaderImg}
                        /> */}

                    {/* Animated with Gif images */}
                    <Image 
                        style={styles.loaderImgGif}
                        source={images.loadingGif}
                    />                    
                </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        position:"absolute",
        top:0,
        bottom:0,
        left:0,
        right:0,
        backgroundColor:colorFonts.COLOR_PRIMARY_PINK_BACKGROUND
    },
    logoContainer:{
        top:height/2.7,
        left:width/3.1,
        backgroundColor:"white",
        width:150,
        height:150,
        borderRadius:75,
        flexDirection:"column",
        justifyContent:"center",
        elevation:10
    },
    logoText:{
        fontSize:colorFonts.XXLARGE,
        color:colorFonts.COLOR_PRIMARY,
        fontFamily:"vincHand",
        // padding:20
        textAlign:"center"
    },
    loaderImg:{
        alignSelf:"center",
        width:150,
        height:150
    },
    loaderImgPulse:{
        width:150,
        height:150,
        top:height/2.7,
        left:width/3.1,
    },
    loaderImgGif:{        
        top:height/2.7,
        left:width/4,
        margin:10,
        width:width/2,
        height:height/11,
        margin:10
    }
});

//make this component available to the app
export default Loader;
