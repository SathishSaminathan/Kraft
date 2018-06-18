import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from "redux-thunk";
import { AsyncStorage } from "react-native";
import signUpReducer from "./reducers/signUpReducer";
import { persistStore, autoRehydrate } from "redux-persist";

const rootReducer = combineReducers({
    logIn:signUpReducer
});

const configureStore=()=>{
    var store= createStore(rootReducer,compose(applyMiddleware(thunk),
        autoRehydrate()
    ))
    persistStore(store, {storage: AsyncStorage})
    return store;
}

export default configureStore;