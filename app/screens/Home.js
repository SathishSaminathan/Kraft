//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { Container, Content, Left, Right, Header, Icon, Item, Card, CardItem } from "native-base";
import FAIcon from "react-native-vector-icons/FontAwesome";
import Swiper from "react-native-swiper";

import RecommendationsCards from "../components/RecommendationsCards";
import images from "../assets/img/image";
// import {  } from "";
// create a component
class Home extends Component {

    componentDidMount(){
        // this.props.navigation.openDrawer();
    }
    render() {
        return (
            <Container>
                <Header style={styles.headerStyle}>
                    <Left style={{flexDirection:"row"}}>
                        <Icon style={{marginRight:10, color:"white"}} name="md-menu" onPress={()=>this.props.navigation.openDrawer()}/>
                        <FAIcon name="amazon" style={{color:"white", fontSize:32}}/>
                    </Left>
                    <Right>
                        <Icon style={styles.iconStyle} name="md-cart"/>
                    </Right>
                </Header>
                <View style={styles.searchBarArea}>
                    <TouchableOpacity>
                        <View style={styles.shopByCatagoryStyle}>
                            <Text 
                            style={{fontSize:12}}>
                                Shop by
                            </Text>
                            <Text 
                            style={{fontWeight:"bold"}}>
                                Catagory
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.searchBarStyle}>
                        <Item
                            style={{width:"100%", backgroundColor:"white", borderRadius:4}}>
                            <Icon 
                                name="search"
                                style={{fontSize:25,padding:5}} />
                            <TextInput 
                                style={{width:"100%", fontSize:20}} 
                                underlineColorAndroid='transparent'
                                placeholder="Search"/>
                        </Item>
                    </View>
                </View>
                <Content
                    style={{backgroundColor:"#d5d5d6",marginTop:70}}>
                    <View 
                        style={{backgroundColor:"white",paddingHorizontal:5, justifyContent:"space-between",alignItems:"center",flexDirection:"row",height:50}}>
                        <Text 
                            style={{fontSize:18}}
                            >Hello, Sathish</Text>
                        <View 
                            style={{flexDirection:"row"}}>
                            <Text
                                style={{fontSize:18}}
                                >Your Account </Text>
                            <Icon 
                                name="arrow-forward"
                                style={{fontSize:26}}/>
                        </View>
                    </View>
                    <Swiper
                        style={{height:100}}
                        autoplay={true}>
                        <View 
                            style={{flex:1}}>
                            <Image 
                                source={require("../assets/img/swiper_1.jpg")}
                                style={{flex:1,height:null,width:null,resizeMode:"contain"}}/>
                        </View>
                        <View 
                            style={{flex:1}}>
                             <Image 
                                source={require("../assets/img/swiper_1.jpg")}
                                style={{flex:1,height:null,width:null,resizeMode:"contain"}}/>
                        </View>
                        <View 
                            style={{flex:1}}>
                             <Image 
                                source={require("../assets/img/swiper_1.jpg")}
                                style={{flex:1,height:null,width:null,resizeMode:"contain"}}/>
                        </View>
                    </Swiper>
                    <Card style={styles.cardStyle}>
                        <CardItem header 
                            style={styles.cardItemStyle}>
                            <Text>Your Recommendations</Text>
                        </CardItem>
                        <RecommendationsCards
                            itemName="Bangles"
                            itemCreator="Sachu"
                            itemPrice="$20"
                            savings="2.5"
                            imageUri={require("../assets/img/jewelry_1.png")}
                            rating={5}
                        />
                         <RecommendationsCards
                            itemName="Bangles"
                            itemCreator="Sachu"
                            itemPrice="$20"
                            savings="2.5"
                            imageUri={require("../assets/img/jewelry_2.png")}
                            rating={5}
                        />
                         <RecommendationsCards
                            itemName="Bangles"
                            itemCreator="Sachu"
                            itemPrice="$20"
                            savings="2.5"
                            imageUri={require("../assets/img/jewelry_3.png")}
                            rating={5}
                        />
                         <RecommendationsCards
                            itemName="Bangles"
                            itemCreator="Sachu"
                            itemPrice="$20"
                            savings="2.5"
                            imageUri={require("../assets/img/jewelry_4.png")}
                            rating={5}
                        />
                         <RecommendationsCards
                            itemName="Bangles"
                            itemCreator="Sachu"
                            itemPrice="$20"
                            savings="2.5"
                            imageUri={require("../assets/img/jewelry_5.png")}
                            rating={5}
                        />
                    </Card>
                </Content>
            </Container>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    headerStyle:{
        backgroundColor:"#3a455c",
        height:90,
        borderBottomColor:"#757575"
    },
    iconStyle:{
        color:"white"
    },
    searchBarArea:{
        position:"absolute",
        top:90,
        height:70,
        backgroundColor:"#3a455c",
        left:0,
        right:0,
        flexDirection:"row",
        paddingHorizontal:5,
        alignItems:"center"
    },
    shopByCatagoryStyle:{
        width:100,
        backgroundColor:"#e7e7eb",
        height:50,
        borderRadius:4,
        padding:10
    },
    searchBarStyle:{
        flex:1,
        flexDirection:"row",
        height:"100%",
        alignItems:"center",
        marginLeft:5
    },
    cardStyle:{
        marginLeft:5,
        marginRight:5
    },
    cardItemStyle:{
        borderBottomWidth:1,
        borderBottomColor:"#dee0e2"
    }
});

//make this component available to the app
export default Home;
