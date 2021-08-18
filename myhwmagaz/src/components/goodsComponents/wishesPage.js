import { Provider, connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { useHistory } from "react-router-dom";
import {actionSearch, actionNewGoodOrderAdd, actionWishes, actionWishDelete, actionWishAdd, actionCartAdd, getData, actionAuthLogout, actionUserUpdateFindOne} from "../../reducers"
import React, {Component, useState, useEffect} from 'react';
import {OneGood, CGoodsList} from "../index";

const WishesPage = ({arr, state, getGoods, goods = [], wishes, onAdd, addWish, delWish, onAddtoOrder}) => {
    const history = useHistory();
    useEffect(async () =>   { 
        let newArr = [];
        for (let key of arr) {
            let oneObj = {}
            oneObj._id = key
            newArr.push(oneObj)
        }
        // console.log(newArr)
        await getGoods(newArr) 
    }, [wishes])
    return(

        <div className = "goodsWrapper">
            {goods.length > 0 ?
            <CGoodsList arr = {goods} isWish = {wishes.goods} onAdd = {onAdd} wishAdd = {addWish} wishDelete = {delWish} onAddtoOrder = {onAddtoOrder}/> :
            <div className = "basketNoGoods"><h2>У вас нету сохранненых товаров </h2><button onClick = {() => history.push("/catalog/")}>In Catalog</button></div>
            }
            
        </div>
    )
}



const mapStateToProps = state => ({
    state: state,
    arr: state.wishListReducer.goods,
    goods: getData(state, "wishesSearch", "GoodFind"),
    wishes: state.wishListReducer,

 });


 
 const mapDispatchToProps = dispatch => bindActionCreators({
    getGoods: actionWishes,
    onAdd: actionCartAdd,
    addWish: actionWishAdd,
    delWish: actionWishDelete,
    onAddtoOrder: actionNewGoodOrderAdd,
 }, dispatch);

const CWishesPage = connect(mapStateToProps, mapDispatchToProps)(WishesPage)

export default CWishesPage;
    