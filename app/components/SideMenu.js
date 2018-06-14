//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image, StatusBar } from 'react-native';
import { DrawerNavigator, DrawerItems } from "react-navigation";
import { Container, Content, Header, Body, Icon } from "native-base";

import images from "../assets/img/image";
import colors from "../assets/styles/colors";
import Home from "../screens/Home";
import UploadProducts from "../screens/UploadProducts";


const CustomDrawerContent =(props)=>(
    <Container>
        <Header 
            style={{height:200, backgroundColor: colors.COLOR_PRIMARY}}>
            <StatusBar 
                backgroundColor={colors.COLOR_PRIMARY}
                barStyle="light-content"
            />
            <Body
            style={{alignItems:"center"}}>
                <Image style={styles.profileImageStyle} source={images.profileImage}/>
            </Body>
        </Header>
        <Content>
            <DrawerItems {...props}/>
        </Content>
    </Container>
)

// create a component
class Sidemenu extends Component{

    static navigationOptions = {
        header:null
    }

    render(){
        return(
           <AppDrawer />
        );
    }
}
const AppDrawer = DrawerNavigator({
    Home:{
        screen:Home
    },
    "Upload Products":{
        screen:UploadProducts
    }
},
{
    initialRouteName:"Home",
    contentComponent:CustomDrawerContent
})


const styles = StyleSheet.create({
  profileImageStyle:{
      width:150,
      height:150,
      borderRadius:75
  }
});

//make this component available to the app
export default Sidemenu;
