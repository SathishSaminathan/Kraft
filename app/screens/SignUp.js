//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, TouchableOpacity, Image, Animated, Dimensions, Keyboard, Platform, StatusBar } from 'react-native';
import * as Animatable from "react-native-animatable";
import { Icon } from "native-base";

import images from "../assets/img/image";
import Loader from "../components/Loader";
import customStyles from "../assets/styles/styles";
import colorsFonts from "../assets/styles/common";

const SCREEN_HEIGHT = Dimensions.get("window").height;

// create a component
class SignUp extends Component {

    constructor(props){
        super(props)
        this.state={
            loader:true,
            placeholder:"Enter Your Email Address"
        }
    }

    static navigationOptions = {
        header:null
    }

    componentWillMount(){
        this.loginHeight = new Animated.Value(150);

        this.keyboardWDidShow= Keyboard.addListener("keyboardDidShow", this.keyboardDidShow)
        this.keyboardDidHide= Keyboard.addListener("keyboardDidHide", this.keyboardDidHide)

        this.keyboardHeight = new Animated.Value(10-SCREEN_HEIGHT);
        this.forwardArrowOpacity = new Animated.Value(1);
        this.borderBottomWidth = new Animated.Value(0);
        this.passwordOpactity = new Animated.Value(0);
    }

    componentDidMount(){
        this.setState({
            loader:false
        })
    }

    keyboardDidShow =(event) =>{

        if(Platform.OS === "android")
        {
            duration=100
        }
        else
        {
            duration = event.duration
        }

        Animated.parallel([
            Animated.timing(this.keyboardHeight,{
                duration:duration+100,
                toValue: event.endCoordinates.height-(event.endCoordinates.height-20)
            }),
            Animated.timing(this.forwardArrowOpacity,{
                duration:duration,
                toValue:1
            }),
            Animated.timing(this.borderBottomWidth,{
                duration:duration,
                toValue:1
            }),
            Animated.timing(this.passwordOpactity,{
                duration:duration,
                toValue:1
            })
        ]).start();
    }

    keyboardDidHide =(event) =>{

        if(Platform.OS === "android")
        {
            duration=100
        }
        else
        {
            duration = event.duration
        }

        Animated.parallel([
            Animated.timing(this.keyboardHeight,{
                duration:duration+100,
                toValue: 10-SCREEN_HEIGHT
            }),
            Animated.timing(this.forwardArrowOpacity,{
                duration:duration,
                toValue:0
            }),
            Animated.timing(this.borderBottomWidth,{
                duration:duration,
                toValue:0
            })
        ]).start();
    }

    increaseLoginHeight =()=>{
        this.setState({
            placeholder:"sample@gmail.com"
        })
        Animated.timing(this.loginHeight,{
            toValue:SCREEN_HEIGHT,
            duration:500
        }).start(()=>{
            this.refs.textInputEmail.focus()
        });
        // alert("hai")
    }

    decreaseLoginHeight = () =>{
        Keyboard.dismiss()
        Animated.timing(this.loginHeight,{
            toValue:150,
            duration:500
        }).start(()=>{
            this.setState({
                placeholder:"Enter Your Email Address"
            })
        });     
    }

    render() { 

        const headerTextOpacity =this.loginHeight.interpolate({
            inputRange:[150,SCREEN_HEIGHT],
            outputRange:[1,0]
        })

        const marginTop =this.loginHeight.interpolate({
            inputRange:[150,SCREEN_HEIGHT],
            outputRange:[25,80]
        })

        const headerBackArrrowOpacity =this.loginHeight.interpolate({
            inputRange:[150,SCREEN_HEIGHT],
            outputRange:[0,1]
        })

        const titleLeft =this.loginHeight.interpolate({
            inputRange:[150,SCREEN_HEIGHT],
            outputRange:[100,25]
        })

        const titleBottom =this.loginHeight.interpolate({
            inputRange:[150,400,SCREEN_HEIGHT],
            outputRange:[0,0,100]
        })

        const titleOpacity =this.loginHeight.interpolate({
            inputRange:[150,SCREEN_HEIGHT],
            outputRange:[0,1]
        })

        return (
            <View style={styles.container}>
                <StatusBar 
                    backgroundColor="transparent"
                    barStyle="dark-content"
                />
                <Animated.View
                    style={[styles.backArrowArea,{opacity:headerBackArrrowOpacity}]}>
                    <TouchableOpacity
                        onPress={this.decreaseLoginHeight}>
                        <Icon name="md-arrow-back" style={{color:"black"}}/>
                    </TouchableOpacity>
                </Animated.View>

                <Animated.View
                    style={[styles.forwardArrowStyle,{bottom:this.keyboardHeight,opacity:this.forwardArrowOpacity}]}>
                    <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate("Home")}
                    >
                        <Icon 
                            name="md-arrow-forward" 
                            style={{color:"white"}}
                        />
                    </TouchableOpacity>
                </Animated.View>

                <ImageBackground 
                    source={images.loginBackground}
                    style={styles.imageBackground}>
                    <Animatable.View 
                        style={styles.logoContentArea}
                        animation="zoomIn"
                        iterationCount={1}>
                        <View style={styles.logoContent}>
                            {/* <Text style={styles.logoText}>Kraft</Text> */}
                            <Image source={images.kraftLogo} style={{width:150,height:150}}/>
                        </View>
                    </Animatable.View>

                    {/** Bottom Half **/}
                    <Animatable.View
                        animation="slideInUp"
                        iterationCount={1}>
                        
                        <Animated.View style={[styles.primaryLoginArea,{height:this.loginHeight}]}>
                            <Animated.View style={[styles.primaryLogin, {opacity: headerTextOpacity, marginTop:marginTop}]}>
                                <Text style={{fontSize:24}}>Get Beauty with Kraft</Text>
                            </Animated.View>                            
                            <TouchableOpacity
                                onPress={this.increaseLoginHeight}>
                                <Animated.View style={[styles.loginInput,{marginTop:marginTop}]}>
                                    <Animated.Text
                                    style={[styles.titleText,{position:"absolute", bottom:titleBottom,left:titleLeft, opacity: titleOpacity}]}>
                                        Enter the Email Address
                                    </Animated.Text>
                                    <Image 
                                        style={styles.indiaImage}
                                        source={images.indiaImage}/>
                                    <Animated.View 
                                        style={{flex:1, flexDirection:"row", alignItems:"center", borderBottomWidth:this.borderBottomWidth}}
                                        pointerEvents="none">
                                        {/* <Text style={{fontSize:20,paddingHorizontal:10}}>+91</Text> */}
                                        <TextInput 
                                            ref="textInputEmail"
                                            style={{flex:1, fontSize:20}}
                                            placeholder={this.state.placeholder}
                                            underlineColorAndroid="transparent"
                                            returnKeyType="next"
                                            keyboardType="email-address"
                                            blurOnSubmit={false}
                                            onSubmitEditing={()=>this.refs.password.focus()}
                                        />
                                    </Animated.View> 
                                </Animated.View>
                                <Animated.View style={[styles.passwordInput,{opacity:this.passwordOpactity}]}>
                                    <Image 
                                        style={styles.passwordImage}
                                        source={images.passwordImage}/>
                                    <Animated.View 
                                        style={{flex:1, flexDirection:"row", alignItems:"center", borderBottomWidth:this.borderBottomWidth}}
                                        pointerEvents="none">
                                        {/* <Text style={{fontSize:20,paddingHorizontal:10}}>+91</Text> */}
                                        <TextInput 
                                            ref="password"
                                            style={{flex:1, fontSize:20}}   
                                            placeholder="enter the password"
                                            underlineColorAndroid="transparent"
                                            returnKeyType="done"
                                            secureTextEntry
                                        />
                                    </Animated.View> 
                                </Animated.View>
                            </TouchableOpacity>
                        </Animated.View>
                        <View style={styles.anotherLogin}>
                            <View
                                style={{flexDirection:"row",alignItems:"center"}}
                            >
                                <Text style={{color:"#5a7fdf", fontWeight:"bold", fontSize:colorsFonts.MEDIUM}}>Or Login with </Text>
                                {/* <Text style={{color:"#5a7fdf", fontWeight:"bold"}}>Or Login with Mobile Number </Text> */}
                            </View>
                            <TouchableOpacity
                                style={[styles.anotherLoginButton,{backgroundColor:colorsFonts.COLOR_PRIMARY_BLUE}]}
                            >
                                <Icon 
                                    style={styles.anotherLoginText}
                                    name="call"
                                />
                            </TouchableOpacity>
                            <View
                                style={{flexDirection:"column", justifyContent:"center"}}
                            >
                                <Text style={{color:"#5a7fdf", fontWeight:"bold"}}>Or </Text>
                            </View>
                            <TouchableOpacity
                                onPress={()=>{this.props.navigation.navigate("Login")}}
                                style={[styles.anotherLoginButton,{backgroundColor:colorsFonts.COLOR_PRIMARY}]}
                            >
                                <Icon 
                                    style={styles.anotherLoginText}
                                    name="mail"
                                />
                            </TouchableOpacity>
                        </View>
                    </Animatable.View>
                </ImageBackground>                
                {this.state.loader && <Loader />}
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    imageBackground:{
        flex:1
    },
    logoContentArea:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    logoContent: {
        backgroundColor:"white",
        width:150,
        height:150,
        alignItems:"center",
        justifyContent:"center"
    },
    logoText:{
        fontWeight:"bold",
        fontSize:26
    },
    primaryLoginArea:{
        backgroundColor:"white"
    },
    primaryLogin: {
        paddingHorizontal:25,
        alignItems:"flex-start"
    },
    loginInput:{
        flexDirection:"row",
        paddingHorizontal:25,
        marginTop:25,
        alignItems:"center"
    },
    passwordInput:{
        marginTop:5,
        flexDirection:"row",
        paddingHorizontal:25,
        alignItems:"center"
    },
    indiaImage:{
        width:24,
        height:24,
        resizeMode:"contain"
    },
    passwordImage:{
        width:24,
        height:24,
        resizeMode:"contain"
    },
    backArrowArea:{
        position:"absolute",
        height:60,
        width:60,
        top:60,
        left:25,
        zIndex:100
    },
    forwardArrowStyle:{
        position:"absolute",
        width:60,
        height:60,
        borderRadius:30,
        right:10,
        zIndex:100,
        backgroundColor:"#54575e",
        alignItems:"center",
        justifyContent:"center"
    },
    titleText:{
        fontSize:colorsFonts.MEDIUM,
        color:colorsFonts.SITE_GRAY1
    },
    anotherLogin:{
        height:70,
        flexDirection:"row",
        backgroundColor:"white",
        justifyContent:"center",
        paddingHorizontal:25,
        paddingVertical:15,
        borderTopWidth:1,
        borderTopColor:"#e8e8ec"
    },
    anotherLoginButton:{
        backgroundColor:"red",
        width:50,
        height:50,
        borderRadius:25,
        flexDirection:"column",
        justifyContent:"center",
        marginHorizontal:15
    },
    anotherLoginText:{
        fontSize:colorsFonts.MEDIUM,
        color:"white",
        textAlign:"center"
    }
});

//make this component available to the app
export default SignUp;
 