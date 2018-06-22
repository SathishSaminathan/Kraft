//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ImageBackground, TextInput, Dimensions, TouchableOpacity,StatusBar,ToastAndroid } from 'react-native';
import { Icon } from "native-base";

import images from "../assets/img/image";
import Loader from "../components/Loader";
import colors from "../assets/styles/common";
import customStyles from "../assets/styles/styles";
import { connect } from "react-redux";
import { signUp } from "../store/actions";
import { LOGIN } from "../store/actions/actionTypes";

const {width,height} = Dimensions.get("window");

// create a component
class Login extends Component {

    constructor(props){
        super(props);
        this.state={
            passwordShow:false,
            email:"",
            password:"",
            loader:false
        }
    }
    static navigationOptions={
        header:null
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.isloggedIn){
            ToastAndroid.showWithGravity(
                "LoggedIn Successfully",
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM
              );              
            this.props.navigation.navigate("Home")
        }
    }

    loginHandler=()=>{
        this.refs.emailInput.blur();
        this.refs.passwordInput.blur();
        const authData={
            email:this.state.email,
            password:this.state.password
        }
        this.props.signUpFun(authData,LOGIN);
    }

    render() {
        return (
            <ImageBackground style={styles.container}
                source={images.loginBackground}
            >
                <StatusBar 
                    backgroundColor="transparent"
                    barStyle="dark-content" 
                    translucent    
                />
                <View
                    style={styles.inputArea}
                >
                    <View
                        style={styles.textArea}
                    >
                        <Icon
                            style={styles.iconStyle}
                            name="person"
                        />
                        <TextInput
                            ref="emailInput"
                            style={styles.textBox}
                            onChangeText={(email)=>{this.setState({email})}}
                            underlineColorAndroid="transparent"
                            blurOnSubmit={false}
                            returnKeyType="next"
                            keyboardType="email-address"
                            placeholder="enter the email"
                            onSubmitEditing={()=>{this.refs.passwordInput.focus()}}
                        />
                    </View>
                    <View
                        style={styles.textArea}
                    >
                        <Icon
                            style={styles.iconStyle}
                            name="lock"
                        />
                        <TextInput
                            ref="passwordInput"
                            style={styles.textBox}
                            underlineColorAndroid="transparent"
                            secureTextEntry={this.state.passwordShow?false:true}
                            maxLength={9}
                            onChangeText={(password)=>this.setState({password})}
                            // value={this.props.userFirstNames}
                            returnKeyType="done"
                            placeholder="password"
                        />
                        <Icon
                            style={styles.eyeStyle}
                            name={this.state.passwordShow?"eye":"eye-off"}
                            onPress={()=>{this.setState({passwordShow:!this.state.passwordShow})}}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.loginButton}
                        onPress={this.loginHandler}
                    >
                        <Text style={styles.loginText}>Login</Text>
                    </TouchableOpacity>
                    <View
                        style={styles.createAccountStyle}
                    >
                        <TouchableOpacity>
                        <Text 
                                style={[styles.createAccountTextStyle]}
                                onPress={()=>this.props.navigation.navigate("SignUp")}
                            >create an account
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={[styles.createAccountTextStyle,{color:colors.SITE_GRAY1}]}
                            >forgot password
                            </Text>
                        </TouchableOpacity>
                    </View>                    
                    <TouchableOpacity
                        style={styles.skipButton}
                        onPress={()=>{this.props.navigation.navigate("Home")}}
                    >
                        <Text style={styles.SkipText}>Skip to Home</Text>
                    </TouchableOpacity>
                </View>               
                {this.props.isLoading && <Loader />}
            </ImageBackground>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center"
    },
    inputArea:{
        width:width/1.1,
        height:height/2,
        justifyContent:"center"
    },
    textArea:{
        flexDirection:"row",
        alignItems:"center",
        marginLeft:5,
        backgroundColor:colors.PINK_TRANSPARENT,
        borderRadius:25,
        margin:15,
        paddingHorizontal:24,
        borderColor:colors.BUTTON_PINK,
        borderWidth:1
    },
    iconStyle:{
        color:colors.SITE_GRAY1,
        width:"10%"
    },
    textBox:{
        color:"white",
        fontSize:colors.SMALL,
        width:"80%",
        marginHorizontal:5
    },
    loginButton:{
        marginLeft:5,
        backgroundColor:colors.BUTTON_PINK,
        borderRadius:25,
        margin:15,
        paddingHorizontal:24,
    },
    loginText:{
        fontSize:colors.MEDIUM,
        color:"white",
        textAlign:"center",
        padding:10,
        fontFamily:"vincHand"
    },
    skipButton:{
        marginLeft:5,
        backgroundColor:colors.BUTTON_PINK,
        borderRadius:25,
        width:"50%",
        alignSelf:"center"
    },
    SkipText:{
        fontSize:colors.LARGE,
        color:"white",
        textAlign:"center",
        padding:5,
        fontFamily:"vincHand"
    },
    eyeStyle:{
        width:"10%",
        color:colors.SITE_GRAY1
    },
    createAccountStyle:{
        flexDirection:"row",
        paddingHorizontal:3,
        margin:15,
        justifyContent:"space-between"
    },
    createAccountTextStyle:{
        fontSize:colors.MEDIUM,
        color:"white",
        fontFamily:"vincHand",
        borderBottomWidth:1,
        borderColor:colors.BUTTON_PINK
    }
});

const mapStateToProps = (state) => {
    return {
        isloggedIn: state.logIn.isloggedIn,
        isLoading : state.ui.isLoading,
    };
};

const mapDispatchToProps = dispatch => {
return{
        signUpFun: (authData, authmode) => dispatch(signUp(authData, authmode))
    };
};

//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(Login)
