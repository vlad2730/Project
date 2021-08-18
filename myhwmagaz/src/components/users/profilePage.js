import {CUsersList, SearchUserInput, CUpdateAdminForm} from "../index";
import {gql, urlUpload, actionPromise, actionGoodCard, getGoods,
    actionUserUpdateFindOne, actionUpdateImg, actionAuthLogin, actionAuthLogout,
    actionUserUpdate, actionOrdersFind, getData, actionLogin } from "../../reducers/index";
import {createStore, combineReducers, applyMiddleware, bindActionCreators} from 'redux';
import { connect } from "react-redux";
import { useEffect, useState, useRef } from "react";

import {BrowserRouter as Router, Route, Link, Switch, Redirect, useHistory} from 'react-router-dom';
import { NewAuth } from "../../actions/actions";


const YourProfile = ({state, orders, loginStatus = {}, updateStatus, updatedUser = {}, newImg, token, onLogin, onLogout, updateImg, 
                        updateUser, isUserAdmin = {}, status, data = {}, getData, 
                        match:{params:{_id}}, isAdmin = [], isOwner = {}, newPicture = "clear"}) => {

    const history = useHistory();

    const [nick, changeNick] = useState(null);
    const [newLogin, changeLogin] = useState(null);
    const [nowPassword, superPassword] = useState(null);
    const [password, changePassword] = useState(null);
    const [password2, changePassword2] = useState(null);
    const [isUpdateImg, changeImg] = useState(false);

    const date = new Date(data ? +data.createdAt : 0);
    const [showUpdate, onShow] = useState(false);
    const [searchInput, changeValue] = useState("Search");


    useEffect( async () =>   {
      if(history.location.pathname.includes(`/profile/`)) {
       await getData(`${isOwner.id}`);
       await orders(`${isOwner.id}`) ;
      }
      else {
       await getData(`${_id}`);
       if(isAdmin) {
       await orders(`${_id}`) ;
       }
      }
   },[history.location.pathname])

    



     useEffect( 
       async() => {

       if(updateStatus == "RESOLVED" && updatedUser && updatedUser.data && updatedUser.data.UserUpsert) {
                           
          if(!isAdmin || (isAdmin && isOwner.id == data._id)){

              await onLogin(newLogin|| data.login, password || nowPassword);

           } 
           onShow(false)
           window.location.reload()

      }
    }, [updateStatus])
     
     


     

        return (
          
          <>
          { (status == "RESOLVED" && data) &&
            <>
            <div className = "userSearch">
                <input type = "text" placeholder = "Search Users" onChange = {e => changeValue(e.target.value)} onKeyDown = {(e) => e.keyCode == 13 && history.push(`/searchUser/${searchInput}`)}/>
                <Link to = {"/searchUser/" + searchInput}>
                    <button>Search</button>
                </Link>
            </div>

                <div className = "profilePage">
                    
                  
                    
                    { (isOwner.id == data._id) ? <h2>Добро пожаловать, {data.nick}!</h2> : <h2>{data.nick || data.login}</h2>}

                    <img src={data.avatar ? `${urlUpload}/${data.avatar.url}`: '/chernyy-kot.png'} />
                    <span>
                        Profile created {`${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()} о ${date.getHours()}: ${date.getMinutes()}: ${date.getSeconds()}  `}
                    </span>
                    {( (isOwner.id == data._id) || (isAdmin && !isUserAdmin))  &&
                    <span>
                        <button  onClick = {() => onShow(!showUpdate)}>Редактировать</button>
                    </span>
                    }
                    {showUpdate && 
                    <div className = "updateWrapper">
                    <h4>Изменнение</h4>
                    
                    {((loginStatus.status && loginStatus.status == "RESOLVED" && !loginStatus.payload.data.login) 
                    ||(updatedUser && updatedUser.errors && updatedUser.errors.length > 0))
                     && <p>Неправильный логин или пароль</p>}
                    

                    {(!isAdmin  || (isAdmin && isOwner.id == data._id))&&
                    <input type = "password" onBlur = {() => onLogin(data.login, nowPassword)} onChange = {(e) => superPassword(e.target.value)} placeholder = "Пароль"/>}
                    
                    <input onChange = {(e) => changeNick(e.target.value)} placeholder = "Новый nick"/>
                    <input onChange = {(e) => changeLogin(e.target.value)} placeholder = "Новый login"/>
                    <input type = "password" onChange = {(e) => changePassword(e.target.value)} placeholder = "Новый password"/>
                    <input type = "password" onChange = {(e) => changePassword2(e.target.value)} placeholder = "Повторите password"/>
                    <input type="file"  name="photo" id='photo' 
                      onChange={(ev) => {
                        updateImg(ev.target.files[0])
              
                        changeImg(true);
                      }
                        }/>
                    <button disabled = {
                      (newPicture == "PENDING") ||
                      ( !isAdmin && (!nowPassword || (Object.keys(loginStatus).length == 0))) || 
                       (((isAdmin &&  isOwner.id && data._id && isOwner.id == data._id) && (!nowPassword  || (Object.keys(loginStatus).length == 0)))
                        &&
                       (Object.keys(loginStatus).length == 0) ) ||
                       (loginStatus.status && loginStatus.status == "RESOLVED" && !loginStatus.payload.data.login) 
                      }  
                         onClick = {
                        async () => {

                            let newUser = {};
                            newUser._id = data._id;
                            if(nick){
                              newUser.nick = nick;
                            }
                            if (newLogin){
                              newUser.login = newLogin;
                            }
                            if (password && password == password2) {
                              newUser.password = password;
                            } else if (password !== password2) {
                              history.push("/loginError");
                              return
                            }
                            if(isUpdateImg) {

                              newUser.avatar = {};
                              newUser.avatar._id = newImg._id;
                              newUser.avatar.url = newImg._url;
                            }
                              updateUser(newUser);



                    }}>Сохранить</button>
                  </div>

                        
                    }
                    

                    
                </div>
            </>
          }

          </>
        )
       
}

const mapStateToProps = state => ({
     state: state,

     status: state.promiseRed && state.promiseRed.user &&
     state.promiseRed.user.payload && state.promiseRed.user &&
     state.promiseRed.user.status,

     data: state.promiseRed && state.promiseRed.user &&
     state.promiseRed.user.payload && state.promiseRed.user.payload.data &&
     state.promiseRed.user.payload.data.UserFindOne,

     newPicture: state.promiseRed && state.promiseRed.photo &&
     state.promiseRed.photo.status,
     
     token: state.auth && state.auth.token,

     updatedUser: state.promiseRed && state.promiseRed.newUser &&
     state.promiseRed.newUser.payload && state.promiseRed.newUser.payload.data &&
     state.promiseRed.newUser.payload,

     loginStatus: state.promiseRed && state.promiseRed.login,

     updateStatus: state.promiseRed && state.promiseRed.newUser &&
     state.promiseRed.newUser.status,

     isUserAdmin: state.promiseRed && state.promiseRed.user &&
     state.promiseRed.user.payload && state.promiseRed.user.payload.data &&
     state.promiseRed.user.payload.data.UserFindOne && 
     state.promiseRed.user.payload.data.UserFindOne.acl &&
     state.promiseRed.user.payload.data.UserFindOne.acl.indexOf("admin") > -1,

     isOwner: state.auth && state.auth.payload && state.auth.payload.sub &&
     state.auth.payload.sub,

     newImg: state.promiseRed && state.promiseRed.photo &&
     state.promiseRed.photo.payload && state.promiseRed.photo.payload,

     isAdmin: state.auth && state.auth.payload && state.auth.payload.sub &&
     state.auth.payload.sub.acl && state.auth.payload.sub.acl.indexOf("admin") > -1,

     
  });


  
  const mapDispatchToProps = dispatch => bindActionCreators({
    getData: actionUserUpdateFindOne,
    updateImg: actionUpdateImg,
    updateUser: actionUserUpdate,
    onLogout: actionAuthLogout,
    onLogin: actionLogin,
    orders: actionOrdersFind
  }, dispatch);

const CYourProfile = connect(mapStateToProps, mapDispatchToProps)
(YourProfile)
export default CYourProfile;

