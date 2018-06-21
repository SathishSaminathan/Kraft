//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, Image, TouchableOpacity, ImageBackground,StatusBar,Picker } from 'react-native';
import { Container, Content, Card, CardItem,Body, Left, Right, Footer, Header, Input, Icon } from "native-base";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { connect } from "react-redux";

import {uploadProduct} from "../store/actions";
import customStyles from "../assets/styles/styles";
import colorFonts from "../assets/styles/common";
import images from "../assets/img/image";
import ImagePicker from "../components/ImagePicker";
import Loader from "../components/Loader";

const { width, height} = Dimensions.get("window");

// create a component
class UploadProducts extends Component {

    static navigationOptions={
        header:null,
        drawerIcon:(
            <FontAwesome
                style={{fontSize:colorFonts.MEDIUM,color:colorFonts.SITE_GRAY1}}
                name="upload"
            />
        )
    }

    constructor(props){
        super(props);
        this.state={
            productName:"",
            productPrice:"",
            productDescription:"",
            productCatagory: undefined,
            productImage:{
                value:null
            }
        }
    }

    uploadHandler = (productName,productDescription, productPrice, productCatagory, productImage)=>{
        this.refs.productName.blur();
        this.refs.productDescription.blur();
        this.refs.productPrice.blur();
        this.refs.productName.clear();
        this.refs.productDescription.clear();
        this.refs.productPrice.clear();
        this.props.uploadAction(productName, productDescription, productPrice, productCatagory, productImage);
        this.refs.child.resetImage();
    }

    onValueChange(value) {
        this.setState({
          productCatagory: value
        });
    }

    imagePickerHandler =(image)=>{
        this.setState({
            image:image
        })
    }

    render() {
        return (
            <Container style={styles.container}>
                    <StatusBar 
                        backgroundColor={colorFonts.COLOR_PRIMARY_PINK_BACKGROUND}
                        barStyle="light-content"
                        translucent={false}
                    />
                    <ImageBackground 
                        style={{flex:1}}
                        source={images.loginBackground}
                    >
                        <Content style={styles.imageUpload}>
                            <View
                                style={styles.imageUploadArea} 
                            >
                                <ImagePicker ref='child' {...this.props} productImage={images.uploadIcon} onImagePicked={this.imagePickerHandler}/>
                            </View>
                        </Content>  
                        <Content 
                            style={{flex:1, height:(height/2)-20, marginHorizontal:3}}
                        >
                        <Card
                            style={{flex:1,backgroundColor:"white", marginHorizontal:30}}
                        >
                            <View
                                style={{flexDirection:"row"}}
                            >
                                <View
                                      style={{width:width/1.7}}                          
                                >
                                    <CardItem
                                      style={styles.cardItemStyle}      
                                    >
                                        <Text 
                                            style={styles.customLabel}
                                        > PN </Text>
                                        <TextInput 
                                            ref="productName"
                                            style={styles.textInputStyle}
                                            placeholder="Product Name"
                                            onChangeText={(productName)=>{this.setState({productName})}}
                                            onSubmitEditing={()=>{this.refs.productDescription.focus()}}
                                            returnKeyType="next"
                                            blurOnSubmit={false}
                                        />
                                    </CardItem>
                                    <CardItem
                                      style={styles.cardItemStyle}      
                                    >
                                        <Text 
                                            style={styles.customLabel}
                                        > PD </Text>
                                        <TextInput 
                                            ref="productDescription"
                                            style={[styles.textInputStyle,{borderWidth:1,borderRadius:20}]}
                                            placeholder="Product Description"
                                            onChangeText={(productDescription)=>{this.setState({productDescription})}}
                                            onSubmitEditing={()=>{this.refs.productPrice.focus()}}
                                            returnKeyType="done"
                                            blurOnSubmit={false}
                                            multiline
                                            numberOfLines={3}
                                            maxHeight={50}
                                            underlineColorAndroid="transparent"
                                        />
                                    </CardItem> 
                                </View>
                                <View
                                      style={{width:width/3}}                          
                                >         
                                    <CardItem
                                      style={styles.cardItemStyle}      
                                    >
                                        <FontAwesome 
                                            style={[styles.customLabel,{textAlign:"center"}]}
                                            name="rupee"
                                        />
                                        <TextInput 
                                            ref="productPrice"
                                            style={[styles.textInputStyle, {width:width/3}]}
                                            placeholder="Price"
                                            onChangeText={(productPrice)=>{this.setState({productPrice})}}
                                            keyboardType="phone-pad"
                                            returnKeyType="done"
                                            blurOnSubmit
                                        />
                                    </CardItem>                         
                                    <CardItem
                                      style={styles.cardItemStyle}      
                                    >
                                        <Text 
                                            style={styles.customLabel}
                                        > C </Text>                             
                                        <Picker
                                            itemStyle={{fontSize:30}}
                                            selectedValue={this.state.productCatagory}
                                            style={{ height: 50, width: 100, color:"grey", marginHorizontal:15 }}
                                            onValueChange={(itemValue, itemIndex) => this.setState({productCatagory: itemValue})}>
                                            <Picker.Item label="Bangles" value="bangle" />
                                            <Picker.Item label="Dress" value="dress" />
                                        </Picker>
                                    </CardItem>
                                </View>
                            </View>
                            
                        </Card>
                        </Content>              
                    </ImageBackground>
                <TouchableOpacity                    
                    onPress={()=>{this.uploadHandler(this.state.productName, this.state.productDescription, this.state.productPrice, this.state.productCatagory, this.state.image, )}}
                >
                    {/* <Image  
                        style={styles.logoStyle}
                        source={images.kraftLogo}/> */}
                    <Text style={customStyles.successButton}>Upload Product</Text>
                </TouchableOpacity>
                {this.props.isLoading && <Loader />}
            </Container>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"white"
    },
    imageUpload:{
        height:height/2,
    },
    productDetails:{
        height:height/2
    },
    imageUploadArea:{
        flex:1,
        alignItems:"center",
        padding:60,
        zIndex:1
    },
    logoStyle:{
        width:100,
        height:50   
    },
    cardStyle:{
        backgroundColor:"transparent"
    },
    cardItemStyle:{
        marginVertical:20
    },
    customLabel:{
        backgroundColor:colorFonts.COLOR_PRIMARY_PINK,
        color:"white",
        width:35,
        height:35,
        fontSize:14,
        borderRadius:18,
        alignSelf:"center",
        padding:5,
        fontFamily:"vincHand",
    },
    iconInput:{
        position:"relative"
    },
    textInputStyle:{
        width:width/2.4,
        marginLeft:5,
        fontSize:14,
        fontFamily:'PTM55FT'
    }
});

const mapStateToProps = (state) => {
    return {
        productImage: state.logIn.productImage,
        isLoading : state.ui.isLoading
    };
};

const mapDispatchToProps = dispatch => {
    return{
            uploadAction: (productName, productDescription, productPrice, productCatagory, productImage) => dispatch(uploadProduct(productName,productDescription, productPrice, productCatagory, productImage))
        };
    };
//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(UploadProducts);

