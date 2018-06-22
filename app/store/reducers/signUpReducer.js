import { SIGN_UP,LOGIN,LOGOUT, ADDIMAGE, UPLOAD_PRODUCT, SET_PRODUCT } from "../actions/actionTypes";
import images from "../../assets/img/image";

const initialState = {
    loggedIn: false,
    userFirstName:"Guest",
    userLastName:"Saminathan",
    profileImage:images.drawerImage,
    productName:"",
    productDescription:"",
    productPrice:"",
    productCatagory:"",
    productImage:images.uploadIcon,
    product:[],
    authData:{
        email:"",
        password:""
    },
    isSignedIn:false,
    isloggedIn:false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_UP:
            return{
                ...state,
                isSignedIn: action.value
            }
        case LOGIN:
            return{
                ...state,
                isloggedIn:action.value
            }
        case LOGOUT:
        
        return;
        case ADDIMAGE:
            return{
                ...state,
                profileImage:action.userImage
            }
        case UPLOAD_PRODUCT:
        return{
            ...state,
            productName:action.productName,
            image:action.productImage.uri,
            productDescription:action.productDescription,
            productPrice:action.productPrice,
            productCatagory:action.productCatagory
            }
        case SET_PRODUCT:
            return{
                ...state,
                product: action.product
            }
        default:
            return state;
    }
}

export default reducer;