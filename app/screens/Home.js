//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image,Dimensions, TouchableHighlight, Modal, StatusBar,ToastAndroid } from 'react-native';
import { Container, Content, Left, Right, Header, Icon, Item, Card, CardItem, Button } from "native-base";
import FAIcon from "react-native-vector-icons/FontAwesome";
import Swiper from "react-native-swiper";
import { connect } from "react-redux";
import { getProduct } from "../store/actions";
import * as firebase from "firebase";

import RecommendationsCards from "../components/RecommendationsCards";
import Loader from "../components/Loader";
import images from "../assets/img/image";
import customStyles from "../assets/styles/styles";
import colorFonts from "../assets/styles/common";
import SpeechAndroid from 'react-native-android-voice';

const {width,height} = Dimensions.get("window");

// create a component
class Home extends Component {

    static navigationOptions = {
        header:null,
        drawerIcon:(
            <Icon                 
                style={{fontSize:colorFonts.MEDIUM,color:colorFonts.SITE_GRAY1}}
                name="ios-home"
            />
        )
    }

    constructor(props){
        super(props);
        this.state = {
            searchProduct:"",
            modalVisible: false,
            selectedProduct:[
                {
                    itemName:"",
                    itemCreator:"",
                    itemPrice:"",
                    itemDescription:"",
                    savings:"",
                    imageUri:null,
                    rating:null,
                    index:null
                }
            ],
            // product:[
            //     {
            //         itemName:"Bangles",
            //         itemCreator:"Sachu",
            //         itemPrice:"20",
            //         itemDescription:"",
            //         savings:"2.5",
            //         imageUri:require("../assets/img/jewelry_1.png"),
            //         rating:5,
            //         index:null
            //     },
            //     {
            //         itemName:"Bangles sachu",
            //         itemCreator:"Sachu",
            //         itemPrice:"20",
            //         itemDescription:"",
            //         savings:"2.5",
            //         imageUri:require("../assets/img/jewelry_2.png"),
            //         rating:5,
            //         index:null
            //     },
            //     {
            //         itemName:"Bangles",
            //         itemCreator:"Sachu",
            //         itemPrice:"20",
            //         itemDescription:"",
            //         savings:"2.5",
            //         imageUri:require("../assets/img/jewelry_3.png"),
            //         rating:5,
            //         index:null
            //     },
            //     {
            //         itemName:"Bangles",
            //         itemCreator:"Sachu",
            //         itemPrice:"20",
            //         itemDescription:"",
            //         savings:"2.5",
            //         imageUri:require("../assets/img/jewelry_4.png"),
            //         rating:5,
            //         index:null
            //     },
            //     {
            //         itemName:"Bangles",
            //         itemCreator:"Sachu",
            //         itemPrice:"20",
            //         itemDescription:"",
            //         savings:"2.5",
            //         imageUri:require("../assets/img/jewelry_5.png"),
            //         rating:5,
            //         index:null
            //     },
            //     {
            //         itemName:"Bangles",
            //         itemCreator:"Sachu",
            //         itemPrice:"20",
            //         itemDescription:"",
            //         savings:"2.5",
            //         imageUri:require("../assets/img/jewelry_6.png"),
            //         rating:5,
            //         index:null
            //     },
            // ],
            product:[]
        };
    }   

    componentWillMount(){
        var that =this;
        // this.props.onLoadProduct();
        // alert("willMount")   
        firebase.database().ref("/product1").on("child_added",function(){
            that.props.onLoadProduct()
        })   
    }
    
    componentDidMount(){
        var that =this;
        firebase.database().ref("/product").on("child_added",function(){
            that.props.onLoadProduct()
        })
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            product: nextProps.product
        })
    }
    
    async voiceSearch(){
        //ToastAndroid.show("inside" , ToastAndroid.LONG);
        try{
            //More Locales will be available upon release.
            var spokenText = await SpeechAndroid.startSpeech("Spell Your Needs..", SpeechAndroid.DEFAULT);
            // ToastAndroid.show(spokenText , ToastAndroid.LONG);
            this.setState({
                searchProduct:spokenText
            })
        }catch(error){
            switch(error){
                case SpeechAndroid.E_VOICE_CANCELLED:
                    ToastAndroid.show("Voice Recognizer cancelled" , ToastAndroid.LONG);
                    break;
                case SpeechAndroid.E_NO_MATCH:
                    ToastAndroid.show("No match for what you said" , ToastAndroid.LONG);
                    break;
                case SpeechAndroid.E_SERVER_ERROR:
                    ToastAndroid.show("Google Server Error" , ToastAndroid.LONG);
                    break;
                /*And more errors that will be documented on Docs upon release*/
            }
        }
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    productDetails=(productDetail,modalState)=>{
        this.setState({
            modalVisible:modalState,
            selectedProduct:{
                itemName:productDetail.itemName,
                itemCreator:productDetail.itemCreator,
                itemPrice:productDetail.itemPrice,
                itemDescription:productDetail.itemDescription,
                savings:productDetail.savings,
                imageUri:productDetail.imageUri,
                rating:productDetail.rating,
                key:productDetail.index
            }
        })
    }

    render() {
        return (
            <Container>
                 <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <Container>
                        <Header 
                            style={styles.modalHeaderStyle}>
                            <StatusBar 
                                backgroundColor={colorFonts.COLOR_PRIMARY_PINK}
                                barStyle="light-content"
                            />
                            <Left style={{flexDirection:"row",flex:0.5}}>
                                <TouchableOpacity
                                    onPress={() => {
                                    this.setModalVisible(!this.state.modalVisible);
                                    }}>
                                    <Icon style={{marginRight:10, color:"white", fontSize:50}} name="ios-close"/>
                                </TouchableOpacity>
                            </Left>
                            <View style={styles.modalHeaderTextArea}>
                                <Text style={styles.modalHeaderText}>Product Details</Text>
                            </View>
                            <Right style={{flex:0.5}}>
                                <Icon style={styles.iconStyle} name="ios-heart"/>
                            </Right>
                        </Header>
                        <Content>
                            <View style={styles.modalImageArea}>
                                <Image source={{uri:this.state.selectedProduct.imageUri}} style={styles.modalImageStyle}/>
                            </View>
                            <Card>
                                <CardItem>
                                    <View>
                                    <Text style={{color:"red"}}>&#8377;
                                        <Text style={[{fontWeight:"300"},customStyles.xxLarge,customStyles.primaryColor]}>{this.state.selectedProduct.itemPrice}</Text>
                                    </Text>
                                    <Text style={{color:"green", fontSize:20}}>
                                        In Stock
                                    </Text>
                                    </View>  
                                </CardItem>  

                                <CardItem style={{marginTop:30, borderTopWidth:1}}>
                                    <Left>
                                        <Text style={{color:"red"}}>&#8377;
                                            <Text style={[{fontWeight:"300"},customStyles.xLarge,customStyles.primaryColor]}>{this.state.selectedProduct.itemPrice}</Text>
                                        </Text>
                                    </Left>  
                                </CardItem>

                            </Card>
                        </Content>
                    </Container>
                        <TouchableOpacity>
                            <Text style={customStyles.successButton}>CLICK TO BUY</Text>
                        </TouchableOpacity>
                        {/* <View style={{flex:1, backgroundColor:"red"}}> */}
                        {/* <Button 
                           title="Learn More"
                           color="#841584"
                           style={{width:"100%"}}
                        /> */}
                        {/* </View> */}
                </Modal>
                <Header style={styles.headerStyle}>
                    <StatusBar 
                        backgroundColor={colorFonts.COLOR_PRIMARY}
                        barStyle="light-content"
                        translucent={false}
                    />
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
                                style={{ width:"75%",fontSize:20}} 
                                underlineColorAndroid='transparent'
                                placeholder="Search"
                                onChangeText={(searchProduct)=>this.setState({searchProduct})}
                                value={this.state.searchProduct}
                                returnKeyType="done"
                            />
                            <Right>
                                <Icon 
                                    name="mic"
                                    style={{fontSize:25,padding:5}} 
                                    onPress={()=>this.voiceSearch()}
                                />
                            </Right>
                        </Item>
                    </View>
                </View>
                <Content
                    style={{backgroundColor:"#d5d5d6",marginTop:70}}>
                    <View 
                        style={{backgroundColor:"white",paddingHorizontal:5, justifyContent:"space-between",alignItems:"center",flexDirection:"row",height:50}}>
                        <Text 
                            style={{fontSize:18}}
                            >Hello, {this.props.userFirstNames}</Text>
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
                                style={{flex:1,height:null,width:null}}
                                resizeMode="contain"
                                resizeMethod="resize"/>
                        </View>
                        <View 
                            style={{flex:1}}>
                             <Image 
                                source={require("../assets/img/swiper_2.jpg")}
                                style={{flex:1,height:null,width:null,resizeMode:"contain"}}/>
                        </View>
                    </Swiper>
                    <Card style={styles.cardStyle}>
                        <CardItem header 
                            style={styles.cardItemStyle}>
                            <Text>Your Recommendations</Text>
                        </CardItem>
                        {/* <RecommendationsCards 
                            getTheProductDetails={this.productDetails}
                            itemName="Bangles"
                            itemCreator="Sachu"
                            itemPrice="$20"
                            savings="2.5"
                            imageUri={require("../assets/img/jewelry_1.png")}
                            rating={5}
                        /> */}

                        {/*      static values....                   
                        {this.state.product.map((e, id)=>
                            <RecommendationsCards 
                                getTheProductDetails={this.productDetails}
                                itemName={e.itemName}
                                itemCreator={e.itemCreator}
                                itemPrice={e.itemPrice}
                                savings={e.savings}
                                imageUri={e.imageUri}
                                rating={e.rating}
                                key={id}
                                index={id}
                            />
                        )} */}

                         {/* values bgetting from firebase */}
                        {this.state.product.map((e, id)=>
                            <RecommendationsCards 
                                getTheProductDetails={this.productDetails}
                                itemName={e.productName}
                                itemCreator={"e.itemCreator"}
                                itemPrice={e.productPrice}
                                savings={"e.savings"}
                                imageUri={e.image.uri}
                                rating={3}
                                key={id}
                                index={id}
                            />
                        )}

                         {/* <RecommendationsCards
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
                        /> */}
                    </Card>
                </Content>
                {this.props.isLoading && <Loader />}
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
        backgroundColor:colorFonts.COLOR_PRIMARY,
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
        backgroundColor:colorFonts.COLOR_PRIMARY,
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
    },
    modalImageStyle:{
        width:width/1,
        height:height-20
    },
    modalImageArea:{
        flex:1,
        flexDirection:"column",
        alignItems:"center",
        backgroundColor:"white",
        borderBottomWidth:1,
        borderBottomColor:"#2c3e50",
        elevation:2
    },
    modalHeaderStyle:{
        backgroundColor:colorFonts.COLOR_PRIMARY,
        height:90,
        borderWidth:1,
        borderBottomColor:"#757575"
    },
    modalHeaderTextArea:{
        flex:1,
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"space-around"
    },
    modalHeaderText:{
        fontSize:30,
        color:"white",
        fontFamily:"vincHand",
        textAlign:"center"
    },
    buttonStyle:{
        backgroundColor:"red",
        padding:20,
        alignSelf:"center",
        width:"100%",
        textAlign:"center"
    },
    modalSuccessButton:{
        flex:1,   
    }
});

const mapStateToProps = (state) => {
    return {
        userFirstNames:state.logIn.userFirstName,
        product:state.logIn.product,
        isLoading : state.ui.isLoading,
    };
};

const mapDispatchToProps = dispatch => {
  return{
    onLoadProduct: () => dispatch(getProduct())
  };
};


//make this component available to the app
export default connect(mapStateToProps, mapDispatchToProps)(Home);