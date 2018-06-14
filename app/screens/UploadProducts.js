//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TextInput, Image } from 'react-native';
import { Container, Content, Card, CardItem,Body, Left, Right, Footer } from "native-base";

import customStyles from "../assets/styles/styles";
import { COLOR_PRIMARY_PINK } from "../assets/styles/common";
import images from "../assets/img/image";
import FloatingLabelInput from "../components/FloatingLabelInput";

const { width, height} = Dimensions.get("window");

// create a component
class UploadProducts extends Component {

    static navigationOptions={
        header:null
    }

    constructor(props){
        super(props);
        this.state={
            productName:"",
            productPrice:"",
            productDescription:""
        }
    }

    render() {
        return (
            <Container style={styles.container}>
                <Content style={styles.imageUpload}>
                    
                </Content>
                <Content styles={styles.productDetails}>
                    <Card>
                        <CardItem header style={styles.cardHeader}>
                            <Text style={[customStyles.secondaryMediumText,{fontFamily:"vincHand"}]}>Product Details</Text>
                        </CardItem>
                        <CardItem style={styles.productArea}>
                            <View style={styles.inputArea}>
                            {/* <FloatingLabelInput
                                label="Product Name"
                                value={this.state.productName}
                                onChangeText={(productName)=>{this.setState({productName})}}
                                returnKeyType="next"
                                onSubmitEditing={()=>this.refs.prodes.focus()}                                
                            />
                            <FloatingLabelInput            
                                ref="prodes"                    
                                label="Product Description"
                                value={this.state.productDescription}
                                onChangeText={(productDescription)=>{this.setState({productDescription})}}
                                returnKeyType="done"
                            /> */}

                            </View>                            
                        </CardItem>
                        <CardItem footer style={styles.cardFooter}>
                            {/* <Text style={[customStyles.primaryMediumText,{color:COLOR_PRIMARY_PINK}]}>Kraft
                                <Text style={customStyles.successSmallText}>.inc</Text>
                            </Text> */}
                            <Image  
                                style={styles.logoStyle}
                                source={images.kraftLogo}/>
                        </CardItem>
                    </Card>
                </Content>
                <Footer 
                    style={{backgroundColor:"white"}}
                >
                    <Image  
                        style={styles.logoStyle}
                        source={images.kraftLogo}/>
                </Footer>
            </Container>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageUpload:{
        height:height/2,
        backgroundColor:"red"
    },
    productDetails:{
        height:height/2
    },
    cardHeader:{
        flex:1,
        flexDirection:"column",
        justifyContent:"center",
    },
    cardFooter:{
        flex:1,
        flexDirection:"column",
        justifyContent:"center",
    },
    productArea:{
        flex:1
    },
    inputArea:{
        flex:1,
        flexDirection:"column"
    },
    input:{
        width:width
    },
    logoStyle:{
        width:100,
        height:50   
    }
});

//make this component available to the app
export default UploadProducts;
