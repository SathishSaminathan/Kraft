import {
    SIGN_UP,
    LOGIN,
    LOGOUT,
    ADDIMAGE,
    UPLOAD_PRODUCT
} from "./actionTypes";

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

export const uploadProduct = (productName, productImage) => {
    // return {
    //     type: ADDIMAGE,
    //     productName: productName,
    //     productImage: productImage
    // }

    return dispatch => {
        fetch("https://us-central1-kraft-4d5f3.cloudfunctions.net/storeImage",{
            method:"POST",
            body: JSON.stringify({
                image: productImage.base64
            })
        })
        .then(res => res.json())
        .catch(err => console.log(err))
        .then((parsedRes) => {            
            const productData = {
                productName: productName,
                productImage:parsedRes.imageUrl
            }
            return fetch("https://kraft-4d5f3.firebaseio.com/product.json",{
                method: "POST",
                body: JSON.stringify(productData)
            })
        })        
        .then(res => res.json())
        .then((parsedRes => {
                console.log(parsedRes)
        }))
        .catch(err => console.log(err))
    }
}