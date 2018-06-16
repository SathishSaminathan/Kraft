import { SIGN_UP,LOGIN,LOGOUT, ADDIMAGE } from "../actions/actionTypes";
import images from "../../assets/img/image";

const initialState = {
    loggedIn: false,
    userFirstName:"Guest",
    userLastName:"Saminathan",
    profileImage:images.drawerImage
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SIGN_UP:
            return{
                ...state,
                userFirstName:action.userDetails
            }
        return;
        case LOGIN:
            return{
                ...state,
                userFirstName:action.userDetails
            }
    return;
        return;
        case LOGOUT:
        
        return;
        case ADDIMAGE:
            return{
                ...state,
                profileImage:action.userImage
            }
    
        default:
            return state;
    }
}

export default reducer;