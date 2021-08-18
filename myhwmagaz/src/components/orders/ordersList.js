import { actionOrdersFind, urlUpload, actionOrderAdd} from "../../reducers";
import { connect } from "react-redux";
import { useEffect, useState, useRef } from "react";
import {BrowserRouter as Router, Route, Link, Switch, Redirect, useHistory} from 'react-router-dom';
import {createStore, combineReducers, applyMiddleware, bindActionCreators} from 'redux';


const OrderOneGood = ({img, name, count, keyprop, price}) => {

    return(
        <div key = {keyprop} className = "oneOrderGood">
            <div className = "goodInner">
            <img src={img ? `${urlUpload}/${img}`: 'https://fintolk.pro/wp-content/uploads/2020/10/chernyy-kot.png?x95644'} />
                <p>{name}</p>
                <span>{price}грн</span>
            </div>
            <div>
                <h5>{count}шт</h5>
            </div>
        </div>
    )
}



const OneOrder = ({price, total, _id, owner, img, onClick, isAdmin, keyprop, goodsArr = [], count,  createdAt}) => {
    const date =  new Date(+createdAt);
    const history = useHistory();





    function goodsObj(arr) {
        let oneObj = {};
        for(let i = 0; i < arr.length; i++) {
            oneObj[arr[i].good._id] = arr[i];
        }

        return oneObj
    }




    return(

        <div key = {keyprop} className = "oneOrder">
            <div key = {Math.random()}>
                <h5>
                Створено: {`${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()} о ${date.getHours()}: ${date.getMinutes()}: ${date.getSeconds()}  `}
                </h5>
                <div key = {Math.random()} className = "oneOrderInner">
                    <div className = "oneOrderGoods">
                        {(!goodsArr || goodsArr.length == 0 || !total) && <div key = {`${_id}${Math.random}`}>Заказ отменен</div>}
                        {goodsArr && total > 0 && goodsArr.map((good) =>  { 
                             if(good.good == null || good.good.name == null) {
                                 return(
                                    <div key = {`${Math.random()}`}>Товар исключен из списка</div>
                                 )
                             } else {
                                 
                                 return(

                                     
                             <OrderOneGood key = {Math.random()} name = {good.good ? good.good.name : "товар"} count = {good.count} price = {good.good ? good.good.price : ""} img = {good.good && good.good.images && good.good.images[0].url ? `${good.good.images[0].url}` : `https://pythonru.com/wp-content/uploads/2018/12/random-module-icon.png`}/>

                             
                                 ) 
                            }
                        })}
                    </div>
                    <div> {<h5>{(total && total > 0 && total != 0) ? `Сума заказа: ${total}грн` : ""}</h5>}
                    {isAdmin && goodsArr &&  total > 0 && <button onClick = {() =>  {
                        let newObj = goodsObj(goodsArr)
                        {onClick(_id, newObj, total, owner)}
                        history.push(`/orderPage/${_id}`) }}>
                            Редактировать</button>}
                    
                    </div>
                </div>


            </div>
            
        </div>
    )
}



const OrdersList = ({orders = [], onOrder, status, ordersFind, owner, isAdmin, match:{params:{_id}}}) => {
    const history = useHistory();

    function ordersOnPage(arr) {
        let newArr = arr.slice();
        newArr.reverse()
        //console.log(newArr)
        return newArr.map((order) => <OneOrder  owner = {order.owner._id} onClick = {onOrder} isAdmin = {isAdmin} key = {order._id} _id = {order._id} createdAt = {order.createdAt} goodsArr = {order.orderGoods} total = {order.total} />)}
    

    useEffect(() =>   {
        if(history.location.pathname.includes(`/profile/`)) {

            ordersFind(`${owner._id}`) ;
        }
        if(isAdmin) {
            ordersFind(`${_id}`) ;
        }
    },[])


    return(
        <div key = "ordersDiv">
        { (status == "RESOLVED" && orders) &&
        
        <div key = {Math.random} className = "ordersList">
                    <h4>Прошлые ваши заказы</h4>
                    {orders.length == 0 && 
                    <div className = "noOrders" onClick = {() => history.push("/catalog/")}>
                    <p>Нету заказа</p>
                    <button>In Catalog</button></div>}
                    {ordersOnPage(orders)}
            {/* {orders.reverse().map((order) => <OneOrder _id = {order._id} createdAt = {order.createdAt} goodsArr = {order.orderGoods} total = {order.total}/>)} */}

        </div>
        }
        </div>
    )
}



const mapStateToProps = state => ({
    state: state,

    orders: state.promiseRed && state.promiseRed.ordersFind &&
    state.promiseRed.ordersFind.payload && state.promiseRed.ordersFind.payload.data &&
    state.promiseRed.ordersFind.payload.data.OrderFind,
    
    token: state.auth && state.auth.token,

    status: state.promiseRed && state.promiseRed.ordersFind &&
    state.promiseRed.ordersFind.payload && state.promiseRed.ordersFind &&
    state.promiseRed.ordersFind.status,

    isUserAdmin: state.promiseRed && state.promiseRed.user &&
    state.promiseRed.user.payload && state.promiseRed.user.payload.data &&
    state.promiseRed.user.payload.data.UserFindOne && 
    state.promiseRed.user.payload.data.UserFindOne.acl &&
    state.promiseRed.user.payload.data.UserFindOne.acl.indexOf("admin") > -1,

    owner: state.auth && state.auth.payload && state.auth.payload.sub &&
    state.auth.payload.sub,

    isAdmin: state.auth && state.auth.payload && state.auth.payload.sub &&
    state.auth.payload.sub.acl && state.auth.payload.sub.acl.indexOf("admin") > -1,

    
 });


 
 const mapDispatchToProps = dispatch => bindActionCreators({
    onOrder: actionOrderAdd,
    ordersFind: actionOrdersFind
 }, dispatch);

 const COrdersList = connect(mapStateToProps, mapDispatchToProps)(OrdersList);

 export default COrdersList;