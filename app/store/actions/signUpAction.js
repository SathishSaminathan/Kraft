import {
    SIGN_UP,
    LOGIN,
    LOGOUT,
    ADDIMAGE,
    UPLOAD_PRODUCT,
    SET_PRODUCT
} from "./actionTypes";
import { uiStartLoading, uiStopLoading } from "../actions/index";

export const signUp = (userFirstName) => {
    return {
        type: SIGN_UP,
        userDetails: userFirstName
    }
}

export const login = (userFirstName) => {
    return {
        type: LOGIN,
        userDetails: userFirstName
    }
}

export const logout = (userDetails) => {
    return {
        type: LOGOUT,
        userDetails: userDetails
    }
}

export const addImage = (pickedImage) => {
    return {
        type: ADDIMAGE,
        userImage: pickedImage
    }
}

export const uploadProduct = (productName, productDescription, productPrice, productCatagory, productImage) => {
    // return {
    //     type: ADDIMAGE,
    //     productName: productName,
    //     productImage: productImage
    // }

    return dispatch => {
        dispatch(uiStartLoading());
        fetch("https://us-central1-kraft-4d5f3.cloudfunctions.net/storeImage",{
            method:"POST",
            body: JSON.stringify({
                image: productImage.base64
            })
        })
        .then(res => res.json())
        .catch(err => {
            console.log(err);
            dispatch(uiStopLoading())
        })
        .then((parsedRes) => {            
            const productData = {
                productName: productName,
                productImage:parsedRes.imageUrl,
                productDescription:productDescription,
                productPrice:productPrice,
                productCatagory:productCatagory
            }
            return fetch("https://kraft-4d5f3.firebaseio.com/product.json",{
                method: "POST",
                body: JSON.stringify(productData)
            })
        })        
        .then(res => res.json())
        .then((parsedRes => {
                console.log(parsedRes);
                dispatch(uiStopLoading());
        }))
        .catch(err => {
            console.log(err);
            dispatch(uiStopLoading())
        })
    }
}

export const getProduct = ()=>{
    return dispatch =>{     
        dispatch(uiStartLoading()); 
        fetch("https://kraft-4d5f3.firebaseio.com/product.json")
        .then(res => res.json())
        .then(parsedRes =>{
            const product=[];
            for(let key in parsedRes){
                product.push({
                    ...parsedRes[key],
                    id:key,
                    image:{
                        uri: parsedRes[key].productImage
                    }
                })
                //alert(parsedRes[key].productImage)
            }
            dispatch(setProduct(product));  
            dispatch(uiStopLoading())  
        })
        .catch(err => {
            alert("Something Went Wrong... Please try again Later:!");
            console.log(err);
            dispatch(uiStopLoading())
        })
    }
}

export const setProduct =(product)=>{
    return {
        type: SET_PRODUCT,
        product: product
    }
}