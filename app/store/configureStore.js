import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import { AsyncStorage } from "react-native";
import { persistStore, autoRehydrate } from "redux-persist";

import signUpReducer from "./reducers/signUpReducer";
import uiReducer from "./reducers/uiReducer";

const rootReducer = combineReducers({
    logIn:signUpReducer,
    ui: uiReducer
});

const configureStore=()=>{
    var store= createStore(rootReducer,compose(applyMiddleware(thunk),
        autoRehydrate()
    ))
    persistStore(store, {storage: AsyncStorage})
    return store;
}

export default configureStore;