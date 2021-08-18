import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {actionPromise,gql,urlUpload,actionGoods,getData,actionSearch,actionLogin,actionAuthLogout,actionGoodCard,actionAuthLogin, actionWishes,actionOrderUpdate,actionOneOrderFind,actionOrdersFind,actionUpdateImg,actionOrder,actionRegister,actionUserUpdateFindOne,actionUserUpdate,actionSearchUser,actionGoodUpdate,} from "../actions/actions";

import authReducer from "./authReducer";

import { actionCartClear, actionCartDelete, actionCartAdd,cartReducer} from "./cartReducer";

import {orderUpdateReducer, actionOrderClear, actionNewGoodOrderAdd, actionAddOneOrder, actionOrderAdd, actionDeleteOneOrder} from "./orderUpdateReduser"

import {wishListReducer, actionWishAdd, actionWishDelete} from "./wishListReducer";
// import actionWishes from "../actions/actions";


function promiseReducer(state={}, action){

    if (action.type === 'PROMISE'){
        const { name="default", status, payload, error} = action
        if (status){
            return {
                ...state, [name]: {status, payload: (status === 'PENDING' && state[name] && state[name].payload) || payload, error}
            }
        }
    }
    return state;
  }
  
  
  const store = createStore(combineReducers({
      promiseRed: promiseReducer, 
      auth: authReducer,
      basket: cartReducer,
      orderUpdateReducer,
      wishListReducer
  }), compose(applyMiddleware(thunk)))

export {actionPromise, actionWishes, actionOrdersFind,  gql, actionGoods, getData, promiseReducer, store, actionSearch,
   actionLogin, authReducer, actionAuthLogin, actionAuthLogout, urlUpload, actionGoodCard, 
   actionUpdateImg, actionCartAdd, actionOrderClear, actionCartDelete, actionCartClear, actionOrder,
    actionRegister, actionOrderUpdate, actionUserUpdateFindOne, wishListReducer, actionWishAdd, actionWishDelete,actionNewGoodOrderAdd , actionAddOneOrder, orderUpdateReducer,actionOrderAdd , actionDeleteOneOrder, actionOneOrderFind, actionUserUpdate, actionSearchUser, actionGoodUpdate};



