//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet,Image } from 'react-native';
import { DrawerNavigator } from "react-navigation";
import { Container, Content, Header, Body, Icon } from "native-base";

import images from "../assets/img/image";

import Home from "../screens/Home";


const CustomDrawerContent =(props)=>(
    <Container>
        <Header 
            style={{height:200}}>
            <Body
            style={{alignItems:"center"}}>
                <Image style={styles.profileImageStyle} source={images.profileImage}/>
            </Body>
        </Header>
    </Container>
)

// create a component
const AppDrawer = DrawerNavigator({
    Home:{
        screen:Home
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
export default AppDrawer;
