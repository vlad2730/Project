import {Provider, connect} from 'react-redux';
import {createStore, combineReducers, applyMiddleware, bindActionCreators} from 'redux';
import thunk from 'redux-thunk';
import {actionPromise} from "../index"
import {gql, actionGoods, actionWishDelete, actionWishAdd, getData, actionSearch, actionCartAdd} from "../../reducers/index";
import { useEffect } from 'react';
import {OneGood, CGoodsList} from "../index";




const mapStateToProps = state => ({
    state: state,
    search: getData(state, "search", "GoodFind"),
    wishes: state.wishListReducer
  });
  
  const mapDispatchToProps = dispatch => bindActionCreators({
    getData: actionSearch,
    onAdd: actionCartAdd,
    addWish: actionWishAdd,
    delWish: actionWishDelete
  }, dispatch);

  const GoodsSearch = ({search, wishes, addWish, delWish, name, getData, onAdd}) => {
    useEffect(() =>  getData(name), [name])
    return(
    <>
            <div className = "goodsWrapper">
              <CGoodsList arr = {search} isWish = {wishes.goods} wishDelete = {delWish} wishAdd = {addWish}  onAdd = {onAdd}/>
            </div>
    </>
    )
  }
   const CGoodsSearch = connect(mapStateToProps, mapDispatchToProps)(GoodsSearch);


  export default CGoodsSearch;