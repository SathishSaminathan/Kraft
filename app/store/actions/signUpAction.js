import { SIGN_UP,LOGIN,LOGOUT, ADDIMAGE } from "./actionTypes";

export const signUp = (userFirstName) =>{
    return{
        type: SIGN_UP,
        userDetails: userFirstName
    }
}

export const login =(userFirstName)=>{
    return{
        type:LOGIN,
        userDetails:userFirstName
    }
}

export const logout=(userDetails)=>{
    return{
        type:LOGOUT,
        userDetails:userDetails
    }
}

export const addImage=(pickedImage)=>{
    return{
        type:ADDIMAGE,
        userImage: pickedImage
    }
}