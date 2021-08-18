import jwt_decode from "jwt-decode";
import { connect } from "react-redux";
import {actionGoodCard} from "./index";


function cartReducer(state, { type, count, id, image,  name, description,  price,}) {
    if(state === undefined){
        if(localStorage.authToken && localStorage.basket) {
            state =  JSON.parse(localStorage.basket);
        }
        else { 
            state = {};
        }
    }

    
    if (type === "CART_ADD") {

        state = {
            ...state,
            
            price: price + (state.price || 0),
             [id]:{ price: price,
                    id: id,
                    description: description,
                    image: image,
                    name, name,
                    count: ((state[id] ? state[id].count : 0) + 1  )},
        };
    }

    if (type === "CART_DELETE") {
        if((state[id].count - 1) == 0) {
            state = {
                ...state,
                price: state.price - price,
            
            }
            delete state[id]
            state.price == 0 && delete state.price;
        } else {
            state = {
                ...state,
                price: state.price - price,
                [id] : {
                    price: price,
                    id: id,
                    description: description,
                    image: image,
                    name, name,
                    count: (state[id].count - 1) 
                },

            }
        }




    }
    if (type === "CART_CLEAR") {
        state = {}
    }
    if(!state.price){
        localStorage.removeItem("basket");
    } else {

        localStorage.basket = JSON.stringify(state)
    }

    return state;
}
    



const actionCartAdd = (name, price, id, description, image, count = 0) => ({
    type: "CART_ADD",
    id,
    count,
    price,
    name,
    description,
    image
    
});

const actionCartDelete = (name, price, id, description, image, count) => ({
    type: "CART_DELETE",
    id,
    count: count ,
    price,
    name,
    description,
    image
});

const actionCartClear = (count, price) => ({
    type: "CART_CLEAR",
    count,
    price
});

export {cartReducer, actionCartAdd, actionCartDelete, actionCartClear};