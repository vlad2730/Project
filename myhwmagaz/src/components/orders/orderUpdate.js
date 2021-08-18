import { actionOrdersFind, actionOrderUpdate, actionOrderClear, actionOneOrderFind, urlUpload, actionDeleteOneOrder, actionAddOneOrder} from "../../reducers";
import { connect } from "react-redux";
import {OneGood, GoodsNotFound} from "../index";
import { useEffect, useState, useRef } from "react";
import {BrowserRouter as Router, Route, Link, Switch, Redirect, useHistory} from 'react-router-dom';
import {createStore, combineReducers, applyMiddleware, bindActionCreators} from 'redux';
import { actionUserUpdateFindOne } from "../../actions/actions";



const OrderUpdate = ({orderFind, orderUpdated, orderUpdate, onAddOne, orderClear, onDelete, orderObj, goodsArr, orderId, state, match:{params:{_id}}}) => {
    //const [orderData, findOrder] = useState(_id);
    //useEffect(() => orderFind(orderData), [])
    const history = useHistory();
    // console.log(state)
    // console.log(orderId)
    // useEffect(() => )
    

    return (
        <div className = "orderUpdateWrapper">
            <div className = "goods">
                {goodsArr.length > 0 ? goodsArr.map((good) => 
                    
                    <div key = {good._id} className = "oneGood">
                        <OneGood id = {good._id}  name = {good.good.name} price = {good.price} 
                        image = {good.good.images ? `${urlUpload}/${good.good.images[0].url}` : `https://pythonru.com/wp-content/uploads/2018/12/random-module-icon.png`}
                        
                    />
                            <div className = "basketButoons">
                            <button 
                            onClick = {() => onAddOne(good.good._id)}
                                >+</button> 
                            <h4>{good.count}</h4>    
                            <button 
                            onClick = {() =>  { 

                                onDelete(good.good._id)}}
                                >-</button>   
                        </div> 
                    </div>
                ) : 
                <h4>У вас нету товаров, выберете товар из каталога</h4>
                } 
            </div>
            <h4>{orderObj.total}грн</h4>
            <div className = "orderUpdateBottom">
                <button onClick = {() =>  { 
                    let id = orderId;
                    orderClear()
                    orderUpdate(id)
                }
                }>Отменить заказ</button>
                <button onClick = {async () =>  {
                    // await orderFind(orderId)
                    await orderUpdate(orderId, arrForUpdate(goodsArr));
                    let ownerId = orderObj.owner;
                    await orderClear();
                    history.push("/user/"+ownerId)
                }} >Сохранить заказ</button>
            </div>
        </div>
    )
}

function arrForUpdate(arr) {
    var newArr = [];
    for(let key of arr) {
        let oneObj = {};
        oneObj.count = key.count;
        oneObj.good = {};
        oneObj.good._id = key.good._id;
        newArr.push(oneObj)
    }
    return newArr;
}

function arrFromObj(obj) {
    
    var newArr = [];
    for (let key in obj) {
            newArr.push(obj[key])
    }
    return newArr;
}


const mapStateToProps = state => ({
    state: state,

    order: state.promiseRed && state.promiseRed.oneOrder &&
    state.promiseRed.oneOrder.payload && state.promiseRed.oneOrder.payload.data &&
    state.promiseRed.oneOrder.payload.data.OrderFindOne,

    orderUpdated: state.promiseRed && state.promiseRed.orderUpdated &&
    state.promiseRed.orderUpdated.payload && state.promiseRed.orderUpdated.payload.data &&
    state.promiseRed.orderUpdated.payload.data.OrderUpsert,
    
    orderObj: state.orderUpdateReducer,

    goodsArr: arrFromObj(state.orderUpdateReducer.goods),
    
    orderId: state.orderUpdateReducer.id
 });


 
 const mapDispatchToProps = dispatch => bindActionCreators({
    onDelete: actionDeleteOneOrder,
    onAddOne: actionAddOneOrder,
    orderFind: actionOneOrderFind,
    orderClear: actionOrderClear,
    orderUpdate: actionOrderUpdate
 }, dispatch);


 const COrderUpdate = connect(mapStateToProps, mapDispatchToProps)(OrderUpdate);


 export default COrderUpdate;

