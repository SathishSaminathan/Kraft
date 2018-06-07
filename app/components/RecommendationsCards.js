//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card, CardItem, Right } from "native-base";
import StarRating from "react-native-star-rating";

import images from "../assets/img/image";
// create a component
class RecommendationsCards extends Component {

    state={
        modalState: true
    }
    
    onSelectHandler=()=>{
        this.props.getTheProductDetails(this.props,this.state.modalState);
    }

    render() {
        return (
            <TouchableOpacity
                onPress={this.onSelectHandler}>
                <CardItem>
                    <View>
                        <Image 
                            style={styles.imageStyle}
                            source={this.props.imageUri}/>
                    </View>
                    <Right
                        style={styles.rightStyle}>
                        <Text>{this.props.itemName}</Text>
                        <Text style={styles.itemCreator}>{this.props.itemCreator}</Text>
                        <Text style={styles.itemPrice}>{this.props.itemPrice}</Text>
                        <Text >
                            <Text style={styles.youSave}>You save</Text>
                            <Text> ${this.props.savings}</Text>
                        </Text>
                        <StarRating
                            disabled={true}
                            maxStars={5}
                            rating={this.props.rating}
                            starSize={12}
                            fullStarColor="orange"
                            emptyStarColor="orange"
                        />
                    </Right>
                </CardItem>
            </TouchableOpacity>
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
    imageStyle:{
        height:50,
        width:50
    },
    rightStyle:{
        flex:1,
        alignItems:"flex-start",
        height:90,
        height:90,
        paddingHorizontal:20
    },
    itemCreator:{
        color: "grey",
        fontSize:11
    },
    itemPrice:{
        fontSize: 14,
        fontWeight:"bold",
        color:"#c4402f"
    },
    youSave:{
        color:"grey",
        fontWeight:"300",
        fontSize:11
    }
});

//make this component available to the app
export default RecommendationsCards;
