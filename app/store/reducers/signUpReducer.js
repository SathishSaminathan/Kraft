import { SIGN_UP,LOGIN,LOGOUT, ADDIMAGE, UPLOAD_PRODUCT } from "../actions/actionTypes";
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
    productImage:images.uploadIcon
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_UP:
            return{
                ...state,
                userFirstName:action.userDetails
            }
        break;
        case LOGIN:
            return{
                ...state,
                userFirstName:action.userDetails
            }
        break;
        case LOGOUT:
        
        return;
        case ADDIMAGE:
            return{
                ...state,
                profileImage:action.userImage
            }
        break;
        case UPLOAD_PRODUCT:
        return{
            ...state,
            productName:action.productName,
            image:action.productImage.uri,
            productDescription:productDescription,
            productPrice:productPrice,
            productCatagory:productCatagory
        }
        default:
            return state;
    }
}

export default reducer;