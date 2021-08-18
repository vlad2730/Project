import {OneGood, GoodsNotFound} from "../index";
import {createStore, combineReducers, applyMiddleware, bindActionCreators} from 'redux';
import {getData, actionGoods, actionOrderAddNewGood, urlUpload} from "../../reducers/index";
import {Provider, connect} from 'react-redux';
import {BrowserRouter as Router, Route, Link, Switch, Redirect, useHistory} from 'react-router-dom';





const GoodsList = ({arr = [], isWish, className = "goods", wishAdd, wishDelete, onAdd, onAddtoOrder}) => {
  const history = useHistory();

  if(arr.length == 0) {
    return(
        <>
        <GoodsNotFound/>
        </>
    )
}
  return (
    <div className = {className}>          
      {arr.map((good) => 
      
      <div key = {`${Math.random}${good._id}`}className = "oneGood">
        <OneGood  id = {good._id} name = {good.name} price = {good.price} 
        image = {good.images ? `${urlUpload}/${good.images[0].url}` : `https://images.ua.prom.st/2259265311_korobka-syurpriz-dlya.jpg`}
        />
        <div>
          {isWish.indexOf(good._id) == -1 ? 
          <div className = "miniWish">
          <span>Save!</span>
          <svg onClick = {() => wishAdd (good._id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
            <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
          </svg>
          </div>
           :
           <div className = "miniWish">
             <span>No save!</span>
          <svg onClick = {() => wishDelete (good._id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
          </svg>
          </div>
          }


          </div>
        <div>
           {(history.location.pathname.includes(`/catalog/`) || history.location.pathname.includes(`/search/`) || history.location.pathname.includes(`/wishes`)) && <button onClick = {() => onAdd(good.name, good.price, good._id,  good.description, good.images)}>BUY</button>}
           {history.location.pathname.includes(`/orderPage/`) && <button onClick = {() => onAdd(good._id, good.price,  good.name, good.images, )}>Добавить в корзину</button>} 
        </div>
      </div>
      
      )}

    </div>
  )
}



 export default GoodsList;