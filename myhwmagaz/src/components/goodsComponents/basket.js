import { useEffect, useState } from "react";
import { connect } from "react-redux";
import{OneGood} from "..";
import {createStore, combineReducers, applyMiddleware, bindActionCreators} from 'redux';
import {gql, urlUpload, actionPromise, actionGoodCard, getGoods, actionGoods, 
    actionCartAdd, actionCartDelete, actionCartClear, actionOrder} from "../../reducers";
import { useHistory } from "react-router-dom";
import COrderPage from "../orders/orderDonePage";



function ObjFilter(obj, filterKey) {
    var newObj = {};
    for (let key in obj) {

        if(key !== filterKey){
            newObj[key] = obj[key]
        }
    }
    return newObj;
}
function arrFromObj(obj) {

    var newArr = [];
    for (let key in obj) {
            newArr.push(obj[key])
    }
    return newArr;
}

function orderArr(goods) {
    var orderGoods = [];
    for(let key of goods){
        let oneGood = {};
        oneGood.count = key.count;
        oneGood.good = {};
        oneGood.good._id = key.id;
        orderGoods.push(oneGood)
    }
    return orderGoods
}


const mapStateToProps = state => ({
    state: state,
    basket: state.basket,
    GoodsArr: arrFromObj(ObjFilter(state.basket, "price")),
    order: orderArr(arrFromObj(ObjFilter(state.basket, "price"))),
    orderDone: state.promiseRed && state.promiseRed.order && 
    state.promiseRed.order.payload && 
    state.promiseRed.order.payload.data.OrderUpsert
  });


  
  const mapDispatchToProps = dispatch => bindActionCreators({
    onAdd: actionCartAdd,
    onDel: actionCartDelete,
    onClear: actionCartClear,
    onOrder: actionOrder
  }, dispatch);
  

const BasketPage = ({state, orderDeal, orderDone, basket, GoodsArr, onAdd, onDel, onClear, onOrder, order}) => {
    const history = useHistory();



    if(!basket.price && !orderDone){
        return(
            <div className = "basketNoGoods"><h2>Купите товар </h2><button onClick = {() => history.push("/catalog/")}>В каталог</button></div>
        )
    } else if(basket.price) {
    return (
        
            <div  className = "basketInner">
                <div className = "basketgoodsInner">
                    {GoodsArr.map((good) => 
                    <div key = {Math.random()} className = "oneGood"><OneGood id = {good.id}
                    name = {good.name} price = {good.price} image = {good.image ? `${urlUpload}/${good.image[0].url}` : ``}/>
                    <div className = "basketButoons">
                        <button onClick = {
                            () => onAdd(good.name, good.price, good.id,  good.description, good.image)}>+</button> 
                        <h4>{good.count}</h4>    
                        <button onClick = {
                            () => onDel(good.name, good.price, good.id,  good.description, good.image)}>-</button>   
                    </div>    


                    </div>
                    )}
                </div>
                <h2 className = "total">{basket.price}грн</h2>
                <div className = "basketBottom">

                    <button onClick = {() => { 
                                            if(localStorage.authToken) {
                                                onOrder(order);
                                                onClear(basket);
                                                // history.push("./order")
                                            } else{
                                                history.push("./login")
                                            }
                                        }}>
                        Заказать
                    </button>
                    <button onClick = {() => onClear(basket)}>Cancel</button>
                </div>
            </div>
        
    )} else if(orderDone) {
        return(
            <>
                <COrderPage key = {Math.random()}/>
                <div key = {Math.random()} className = "basketNoGoods"><h2>Купите товар </h2><button  onClick = {() => history.push("/catalog/")}>В каталог</button></div>

            </>
        )
    }
}


const CBasketPage = connect(mapStateToProps, mapDispatchToProps)(BasketPage);

export default CBasketPage;