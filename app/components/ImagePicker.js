//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Button,ToastAndroid, TouchableOpacity } from 'react-native';
import ImagePickers from "react-native-image-picker";
import images from "../assets/img/image";

// create a component
class ImagePicker extends Component {

    constructor(props){
        super(props)
        this.state={
            pickedImages:images.uploadIcon
        }
    }

     resetImage(){
        this.setState({
            pickedImages:images.uploadIcon
        })
     }

    pickedImageHandler=()=>{
        ImagePickers.showImagePicker({ title:"Pick an Image" },res =>{
            if(res.didCancel){
                ToastAndroid.showWithGravity(
                    "Cancelled",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                  );
                
            }
            else if(res.error){
                ToastAndroid.showWithGravity(
                    "Error",
                    ToastAndroid.SHORT,
                    ToastAndroid.CENTER
                  );
            }
            else{
                this.setState({
                    pickedImages:{uri:res.uri}
                })
                this.props.onImagePicked({uri: res.uri, base64 : res.data})
            }
        });
    }
    render() {
        return (
            <TouchableOpacity
                style={styles.imageArea}
                onPress={()=>{this.pickedImageHandler()}}
            >
                <Image
                    style={styles.imageStyle} 
                    source={this.state.pickedImages}
                />
            </TouchableOpacity>
            // <View style={styles.container}>
            //     <Image
            //         style={styles.drawerImageStyle}
            //         source={this.props.pickedImage}
            //     />
            //     <Button title="Pick Image" onPress={()=>{this.pickedImageHandler()}}/>
            // </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:"white"
    },
    imageStyle: {
        width:169,
        height:169,
        alignSelf:"center"
    },
    imageArea:{
        borderWidth:2,
        borderColor:"white",
        zIndex:1,
        elevation:10,
        backgroundColor:"white"     
    }
});


//make this component available to the app
export default ImagePicker;
