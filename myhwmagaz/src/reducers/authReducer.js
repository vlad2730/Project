import jwt_decode from "jwt-decode";
import {actionLogin, store, actionAuthLogin} from "./index";

function authReducer(state,action){
    if (state===undefined){
        if(localStorage.authToken){
            return{token:localStorage.authToken, payload: jwt_decode(localStorage.authToken)}
        }
        return {}
    }
    if (action.type==="LOGIN"){
        localStorage.authToken=action.jwt;
        return {token:action.jwt, payload: jwt_decode(action.jwt)}
    }
    if(action.type==="LOGOUT"){
        localStorage.removeItem("authToken");
        localStorage.removeItem("basket");
        localStorage.removeItem("wishList");
        return{}
    }
    return state
}
export default authReducer;