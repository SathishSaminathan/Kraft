import {
    SIGN_UP,
    LOGIN,
    LOGOUT,
    ADDIMAGE,
    UPLOAD_PRODUCT,
    SET_PRODUCT
} from "./actionTypes";
import {
    uiStartLoading,
    uiStopLoading
} from "../actions/index";

const API_KEY = "AIzaSyCC61D-A1l7ZOiMgHMXZcpauezKrwp1xKw";

export const signUp = (authData, authMode) => {
    return dispatch => {
        let url =
            "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
            API_KEY;

        if (authMode === SIGN_UP) {
            url =
                "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=" +
                API_KEY;
        }
        dispatch(uiStartLoading());
        fetch(url, {
                method: "POST",
                body: JSON.stringify({
                    email: authData.email,
                    password: authData.password,
                    returnSecureToken: true
                }),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(res => res.json())
            .then(parsedRes => {
                console.log(parsedRes)
                if (parsedRes.error) {
                    if (parsedRes.error.message === "EMAIL_EXISTS") {
                        alert("Email is already taken.. please try with others!");
                    } else {
                        alert("Authentication failed, please try again!");
                    }
                } else {
                    dispatch(authSuccess(authMode, true))
                }
                dispatch((uiStopLoading()));
            })
            .catch(err => {
                console.log(err);
                alert("Authentication failed, please try again!");
                dispatch((uiStopLoading()));
            })
    }
}

export const authSuccess = (authMode, value) => {
    return {
        type: authMode,
        value: value
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
        fetch("https://us-central1-kraft-4d5f3.cloudfunctions.net/storeImage", {
                method: "POST",
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
                    productImage: parsedRes.imageUrl,
                    productDescription: productDescription,
                    productPrice: productPrice,
                    productCatagory: productCatagory
                }
                return fetch("https://kraft-4d5f3.firebaseio.com/product.json", {
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

export const getProduct = () => {
    return dispatch => {
        dispatch(uiStartLoading());
        fetch("https://kraft-4d5f3.firebaseio.com/product.json")
            .then(res => res.json())
            .then(parsedRes => {
                const product = [];
                for (let key in parsedRes) {
                    product.push({
                        ...parsedRes[key],
                        id: key,
                        image: {
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

export const setProduct = (product) => {
    return {
        type: SET_PRODUCT,
        product: product
    }
}