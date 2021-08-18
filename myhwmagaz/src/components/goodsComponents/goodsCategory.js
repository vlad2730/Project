import {Provider, connect} from 'react-redux';
import {createStore, combineReducers, applyMiddleware, bindActionCreators} from 'redux';
import thunk from 'redux-thunk';
import {actionPromise} from "../index"
import {gql, actionGoods, actionNewGoodOrderAdd, actionWishAdd, getData, actionCartAdd, actionWishDelete} from "../../reducers/index";
import { useEffect } from 'react';
import {OneGood, CGoodsList} from "../index";


  
  const mapStateToProps = state => ({
    state: state,
    goods: getData(state, "goods", "GoodFind"),
    status: state.promiseRed && state.promiseRed.goods &&
    state.promiseRed.goods.payload && state.promiseRed.goods &&
    state.promiseRed.goods.status,
    wishes: state.wishListReducer

  });
  
  const mapDispatchToProps = dispatch => bindActionCreators({
    getData: actionGoods,
    onAdd: actionCartAdd,
    onAddtoOrder: actionNewGoodOrderAdd,
    addWish: actionWishAdd,
    delWish: actionWishDelete
  }, dispatch);
  


const GoodsCategory = ({state, goods, wishes, id, tittle = "Товари", addWish, delWish,  onAddtoOrder, getData, onAdd}) => {
  // console.log(state)
  useEffect(() =>  getData(id), [id])
  return(
      <>
        
        <div className = "goodsWrapper">
            <CGoodsList arr = {goods} isWish = {wishes.goods} onAdd = {onAdd} wishAdd = {addWish} wishDelete = {delWish} onAddtoOrder = {onAddtoOrder}/>
        </div>
      </>
  )
}

const CGoodsCategory = connect(mapStateToProps, mapDispatchToProps)(GoodsCategory);




  export default CGoodsCategory;