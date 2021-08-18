import { connect } from "react-redux";
import {gql, urlUpload, actionGoodUpdate, actionPromise, actionGoodCard, actionUpdateImg, getData, actionCartAdd} from "../../reducers";
import {createStore, combineReducers, applyMiddleware, bindActionCreators} from 'redux';
import { useEffect, useState, useRef } from 'react';
import {BrowserRouter as Router, Route, Link, Switch, Redirect, useHistory} from 'react-router-dom';





  const mapStateToProps = state => ({
    state: state,
    basket: state.basket,
    ///появляеться редактирование товара, если ник админ
    isAdmin: state.auth && state.auth.payload && state.auth.payload.sub && state.auth.payload.sub.acl && state.auth.payload.sub.acl.indexOf("admin") > -1,
    goodCard: getData(state, "goodCard", "GoodFindOne"),
    newPictureStatus: state.promiseRed && state.promiseRed.photo &&
    state.promiseRed.photo.status,
    newImg: state.promiseRed && state.promiseRed.photo &&
    state.promiseRed.photo.payload && state.promiseRed.photo.payload,
    updateStatus: state.promiseRed && state.promiseRed.newGood &&
    state.promiseRed.newGood.status,
  });
  
  const mapDispatchToProps = dispatch => bindActionCreators({
    getGood: actionGoodCard,
    onAdd: actionCartAdd,
    updateImg: actionUpdateImg,
    goodUpdate: actionGoodUpdate
  }, dispatch);
  






  const EditGoodCard = ({id, updateStatus = {}, newPictureStatus = {}, newImg, goodUpdate, goodCard = null, updateImg, getGood, state, onAdd, getData, className = "goodCard", isAdmin}) => {
    const history = useHistory();
    useEffect(() =>  getGood(id), [id]);

    useEffect(() => updateStatus == "RESOLVED" && window.location.reload(), [updateStatus])



    const [width, setWidth] = useState(window.innerWidth);
    const [startWidth, setStartwidth] = useState(true);
    const [finallyWidth, setFinallyWidth] = useState(true);


    const [isUpdateImg, changeImg] = useState(false);
    const [showUpdate, onShow] = useState(false);
    const [description, changeDescription] = useState(null);
    const [price, changePrice] = useState(null);
    const [name, changeName] = useState(null);


     return(
        <> 
        { goodCard &&
          <div className = {className}>
            <h2>{goodCard.name}</h2>
            <img src = {goodCard.images ? `${urlUpload}/${goodCard.images[0].url}`: `https://pythonru.com/wp-content/uploads/2018/12/random-module-icon.png`}/>
            <span>{`${goodCard.price}грн`}</span>
            <p>{goodCard.description}</p>
            <button onClick = {() => onAdd(goodCard.name, goodCard.price, goodCard._id,  goodCard.description, goodCard.images)}>BUY</button>
            {isAdmin && <button onClick = {() => onShow(!showUpdate)}>Редактировать</button>}
              
            {showUpdate && 
            <div className = "updateWrapper">
              <input onChange = {(e) => changeName(e.target.value)} placeholder = "Change name"/>
              <textarea  onChange = {(e) => changeDescription(e.target.value)} placeholder = "Change description"/>
              <input onChange = {(e) => changePrice(e.target.value)} type = "number" placeholder = "Change price"/>
              <input type="file"  name="photo" id='photo' 
                  onChange={(ev) => {
                    updateImg(ev.target.files[0])
                
                    changeImg(true);
                  }
                  }/>
              <button disabled = {newPictureStatus == "PENDING"}
                onClick = {
                  () => {
                    let newGood = {};
                    newGood._id = goodCard._id;
                    if (name) {
                      newGood.name = name;
                    }
                    if (description) {
                      newGood.description = description;
                    }
                    if (price) {
                      newGood.price = +price;
                    }
                    if(isUpdateImg) {
                      newGood.images = [];

                      newGood.images[0] = {

                         _id: newImg._id
                      }


                    }
                    goodUpdate(newGood);


                  }
                }
              >
                
                Save

              </button>
            </div>
          }
          </div>
        }

        </>
    )
  }
  


  const CEditGoodCard = connect(mapStateToProps, mapDispatchToProps)(EditGoodCard)

  export default CEditGoodCard;



