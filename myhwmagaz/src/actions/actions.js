import {Provider, connect} from 'react-redux';
import {createStore, combineReducers, applyMiddleware,compose,bindActionCreators} from 'redux';
import thunk from 'redux-thunk';
import {BrowserRouter as Router, Route, Link, Switch, Redirect, useHistory} from 'react-router-dom';
import React, {Component, useState, useEffect} from 'react';
import jwt_decode from "jwt-decode";
import { orderUpdateReducer,cartReducer,authReducer, wishListReducer, actionWishAdd, actionWishDelete} from "../reducers/";


//actionPromise
//--//
const actionPromise = (name, promise) => { //прикрутить имя промиса строковое 
    const actionPending = () => ({type : 'PROMISE', status: 'PENDING', name}) //имя должно попадать в объект action
    const actionResolved = (payload) => ({
        type : 'PROMISE',  //поэтому имя параметр или имя name берется из замыкания
        status: 'RESOLVED', 
        payload, 
        name,
    });
    const actionRejected = (error) => ({
        type : 'PROMISE', 
        status: 'REJECTED', 
        error, 
        name
    });
    return async dispatch => {
        dispatch(actionPending())
        let payload
        try {
            payload = await promise
            dispatch(actionResolved(payload))
        }
        catch (e){
            dispatch(actionRejected(e))
        }
        return payload;
    }
}
//gql
const getGQL = (url) => async (query, variables={}) => 
  await (
    await fetch(url, {
      method: 'POST',
      headers:{        
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...(localStorage.authToken && localStorage.authToken != 'null' ? {Authorization: `Bearer ${localStorage.authToken}`} : {})
    },
    body: JSON.stringify({ query, variables }),
})
).json();
//--//
const gql=getGQL("http://shop-roles.asmer.fs.a-level.com.ua/graphql");
//загрузка, нужна ли она?
//--//
const urlUpload="http://shop-roles.asmer.fs.a-level.com.ua";

//actionCategory
//--//
const actionCategoryCard=()=>{
    return async dispatch=>{
        await dispatch(actionPromise("categories",gql(`
            query categories {
                CategoryFind(query:"[{}]") {
                    _id name 
                    subCategories {
                        name,
                        _id
                    }
                }
            }`,)))
    }
};
//actionsGoods
//--//
const actionGoods=(_id)=>{
    return async dispatch=>{
        const queryJsonGoods=JSON.stringify([{
            "categories._id": `${_id}`
        }]);

        await dispatch(actionPromise(`goods`, gql (
            `query goods($query: String) {
              GoodFind(query: $query )  {
                name, price,
                images{url}, _id,
                description
                categories {
                _id
                createdAt
                name
                }
              }
            }` ,{ query:  queryJsonGoods })))
    }
};

//actionGoodCard
//--//
const actionGoodCard=(_id)=>{
    return async dispatch=>{
        const queryJsonGoodCard=JSON.stringify([{
            "_id":`${_id}`
        }]);
    await dispatch(actionPromise(`goodCard`,gql(
        `query oneGood($query: String) {
            GoodFindOne(query: $query) {
                _id
                createdAt
                name
                description
                price
                images{url _id}
            }
          } 
        `,{query:queryJsonGoodCard})))
    }
}

//actionGoodUpdate
//--//
const actionGoodUpdate=(data)=>{
    return async dispatch=>{
        const queryJsonGoodUpdate=JSON.stringify(
            {
                good:data
            }
        )
        await dispatch(actionPromise("newGood", gql(
            `mutation updateGood($good:GoodInput) {
                GoodUpsert(good: $good) {
                    _id
                    name
                    description
                    price
                    images{url}
                    
                }
              }`, queryJsonGoodUpdate
        )))
    }
};
//actionAuthLog
//--//
const actionAuthLogin = (jwt) => ({type: 'LOGIN', jwt})
//--//
const actionAuthLogout = () =>  ({type: 'LOGOUT'})
//--//
const newAuth=(jwt)=>{
    return async dispatch=>{
        dispatch(actionAuthLogin(jwt));
    }
};

//actionReg
//--//
  const actionRegister = (login, password) =>{
    return async dispatch => {

        await dispatch(actionPromise('registration', gql(
            `mutation reg ($login:String, $password:String){
                UserUpsert(user: {login:$login, password: $password}) {
                  _id, createdAt
                }
              }`,{login, password})
        ))
    }
}

//registration
//actionLogin
//--//
const actionLogin=(login,password)=>
    async dispatch=>{
        const result = gql(
            `query login($login:String, $password:String){
              login(login:$login,password:$password)
            }`, { login, password } );

    
        let loginData = await dispatch(actionPromise('login', result))
    
    
    
        if (loginData && loginData.data && loginData.data.login){
    
             dispatch(actionAuthLogin(loginData.data.login));
    
        }
    }

    //loginOnPage
const actionClearLogin=()=>({
        type:"PROMISE",
        status:"CLEAR",
        name:"login"
})
    
const ButtonLogout = ({onLogout, isLoggedIn}) => 
    <button onClick={onLogout}
        disabled={!isLoggedIn}>Logout</button>

const CButtonLogout=connect(l=>({isLoggedIn:l.auth.payload}),{onLogout:actionAuthLogout})(ButtonLogout)

const PasswordConfirm = ({status, loginStatus, state, login, isLoggedIn, onLogin = null, clearLogin}) => {
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");
    const historyLoginOnPage = useHistory();
    useEffect(() => {

        if(login) {
            historyLoginOnPage.push(`/profile/` + login) 
            return
        }
        historyLoginOnPage.push(`/login`);
        clearLogin()
        },[login]
)


    function Login() {
        
            onLogin(pass1, pass2)

            if(status == "RESOLVED" && !loginStatus){
                historyLoginOnPage.push("/loginError")
            }
        
    }

    return (
        <>
            <div>
                <input
                    type="text"
                    placeholder = "login"
                    onChange={(e) => {
                        setPass1(e.target.value);
                    }}
                    onKeyDown = {(e) =>  {
                        if (e.keyCode == 13) {
                            Login()
                        } 
                    }}
                />
                <input
                    type="password"
                    placeholder = "password"
                    onChange={(e) => {
                        setPass2(e.target.value);
                    }}
                    onKeyDown = {(e) =>  {
                        if (e.keyCode == 13) {
                            Login()
                        } 
                    }}
                />
            </div>
            <div>
                <button disabled = {isLoggedIn} onClick={() => Login()}
                >Login</button>
                <CButtonLogout />
            </div>

        </>
    );
};

const RegisterForm =({onReg, onLogin,login,state,isReg})=>{
    const [password1, setPassword1]=useState("");
    const [password2, setPassword2]=useState("");
    const historyRegisterForm=useHistory();
    useEffect(()=>login ? historyRegisterForm.push(`/profile/`):historyRegisterForm.push(`/login`),[login])

    return(
        <>
            <div>
                <input type="text" placeholder="login" onChange={(e)=>{
                    setPassword1(e.target.value);
                 }}
                onKeyDown={(e)=>{
                    if(e.keyCode==13){
                        onReg(password1,password2)
                        if(!isReg){
                            onLogin(password1,password2)
                        }else{
                            historyRegisterForm.push('/loginError')
                        }
                    }
                }}
                />
                <input 
                    type="password" placeholder="password" onChange={(e)=>{
                        setPassword2(e.target.value);
                    }}
                    onKeyDown={(e)=>{
                        if(e.keyCode==13){
                            onReg(password1,password2)
                            if(!isReg){
                                onLogin(password1,password2)
                            }else{
                                historyRegisterForm.push('/loginError')
                            }
                        }
                    }}
                />
            </div>
            <div>
                <button disabled={!password2 || !password1} onClick={()=>{
                    onReg(password1,password2)
                    if(!isReg){
                        onLogin(password1,password2)
                    }else{
                        historyRegisterForm.push('/loginError')
                    }
                }}>Registration</button>
            </div>
        </>
    )
}

const CRegisterForm =connect((state) => ({
    state: state, 
    login: state.auth.payload && state.auth.payload.sub.login,
    isReg: state.promiseReducer && state.promiseReducer.registration &&
    state.promiseReducer.registration.payload &&
    state.promiseReducer.registration.payload.errors

    }), {
    onReg:actionRegister,
    onLogin:actionLogin})(RegisterForm);

const CLoginForm = connect((l) => ({
    state: l, isLoggedIn: l.auth.payload, 
    login: l.auth.payload && l.auth.payload.sub.login,
    status: l.promiseReducer.login && l.promiseReducer.login.status,
    loginStatus: l.promiseReducer.login && l.promiseReducer.login.payload &&
    l.promiseReducer.login.payload.data &&  l.promiseReducer.login.payload.data.login
        }), {
        onLogin: actionLogin, clearLogin: actionClearLogin})(PasswordConfirm);
//--//
const LoginForm=({})=>{
    return(
        <>
            <div className = "loginSection">
                <h2>Sign In</h2>
                <div className = "loginForm">
                    <CLoginForm />

                </div>
                <h2>Registration</h2>
                <div className = "loginForm">
                    <CRegisterForm/>
                </div>
            </div>
        </>
    )
}
//actionOrder
//--//
const actionOrder=(order)=>{
    return async dispatch=>{
        const queryJsonOrder=JSON.stringify({
            order:{orderGoods:order}
        })
        await dispatch(actionPromise(`order`,gql(
            `mutation newOrder($order: OrderInput) {
                OrderUpsert(order: $order) {
                  _id
                  createdAt
                  total
                }
              }`,  queryJsonOrder
        )))
    }
}
//actionUpdateOrder
//--//
const actionOrderUpdate=(id,arrGoods=[])=>{
    return async dispatch=>{
        const queryJsonOrderUpdate=JSON.stringify({
            newOrder:{
                _id:id,
                orderGoods:arrGoods
            }
        });
        await dispatch(actionPromise("orderUpdated", gql (
            `mutation orderChange($newOrder: OrderInput) {
                OrderUpsert(order: $newOrder) {
                  
                  total
                  orderGoods {good {name}}
                  owner {_id, login}
                }
              }`, queryJsonOrderUpdate
        )))
    }
}
//actionOrderFind
//--//
const actionOrdersFind =(data)=>{
    return async dispatch=>{
        const queryJsonOrdersFind=JSON.stringify([{"owner":data}])

        await dispatch(actionPromise("ordersFind", gql (
            `query orders ($query: String) {
                OrderFind(query: $query){
                  total
                  _id
                  orderGoods {count, _id, price, good {name, _id, price, images {url}}}
                  createdAt
                  owner {
                    login
                    _id
                  }
                  
                }
            }`, {query: queryJsonOrdersFind}
        )))
    }
}
//--//
const actionOneOrderFind=(_id)=>{
    return async dispatch =>{
        const queryJsonOneOrderFind=JSON.stringify([{"_id":`${_id}`}]);

        await dispatch(actionPromise("oneOrder", gql(
            `query oneOrder($query: String) {
                OrderFindOne(query: $query) {
                  total
                  _id
                  orderGoods {count, _id, price, good {name, _id, price, images {url}}}
                  createdAt
                }
            }`, {query: queryJsonOneOrderFind}
        )))
    }
}
//actionUserUpdate
//--//
const actionUserUpdate =(data)=>{
    return async dispatch=>{
        const queryJsonUserUpdate=JSON.stringify({user:data})

        await dispatch(actionPromise('newUser', gql(
            `mutation updateUser($user:UserInput){
                UserUpsert(user: $user){
                  _id
                  nick
                  login
                  avatar{
                  url
                  }
                }
              }`, queryJsonUserUpdate
        )))
    }
}

//actionFindOneUser
//--//
const actionUserUpdateFindOne=(user)=>{
    return async dispatch=>{
        const queryJsonUserUpdateFindOne=JSON.stringify([{"_id":user}]);

        await dispatch(actionPromise(`user`,gql(
            `query userOne ($query: String){
                UserFindOne(query: $query){
                  login
                  _id
                  createdAt
                      avatar {_id url}
                  acl
                  nick
                }
              }`, {query: queryJsonUserUpdateFindOne}
        )))
    }
}

//Search
//actionsearch
//--//
let toSearch=(str)=>{
    str = str.replace(/ +/g, " ").trim();
    str = "/" + str.split(" ").join("|") + "/";
    return str;
};
//--//

let QuerytoSearch=(str,fields=["name","description"])=>{
    str = toSearch(str);
    let arr = fields.map((l) => {
        return { [l]: str };
    });
    return { $or: arr };
};

//--//
function actionSearch(queryString){
    return actionPromise('search', gql(
        `query goods($query: String) {
          GoodFind(query: $query)  {
            name, price,
            images{url}, _id
            categories {
              _id
              createdAt
              name
            }
          }
        }`, {query: JSON.stringify([QuerytoSearch(queryString)])}))
}

//actionSearchUser

let toSearchUser=(str)=>{
    str = str.replace(/ +/g, " ").trim();
    str = "/" + str.split(" ").join("|") + "/";
    return str;
};

let QuerytoSearchUser=(str,fields=["login","nick","_id"])=>{
    str = toSearchUser(str);
    let arr = fields.map((l) => {
        return { [l]: str };
    });
    return { $or: arr };
}

//--//
function actionSearchUser(queryString){
    return actionPromise("FoundUser", gql(
        `query userOne($query: String) {
            UserFind(query: $query){
              login
              _id
              createdAt
                  avatar {_id url}
              acl
              nick
            }
          }`, {query: JSON.stringify([ QuerytoSearchUser(queryString)])}
    ))
}

//actionWishSearch
//--//
const actionWishes=(arr)=>{
    return async dispatch =>{
        const queryJsonWishes=JSON.stringify([{"$or":arr}]);

        await dispatch(actionPromise("wishesSearch",gql(
            `query wishesGoods($query: String) {
                GoodFind(query: $query) {
                  name 
                  _id
                  images{url}
                  price
                 }
              }`, {query: queryJsonWishes}
        )))
    }
}

//actionUpdateImg
const actionOneImg=(_id)=>{
    const queryJsonOneImg=JSON.stringify([{"_id":`${_id}`}]);

    return (actionPromise('image',gql(
        `query findImg($query: String)  {
            ImageFindOne(query: $query) {
              _id
              createdAt
              url
            }
          }`, {query: queryJsonOneImg}
    )))
}

//--//
const actionUpdateImg=selectedFile=>{
    const formData=new FormData();
    formData.append('photo',selectedFile);

    return actionPromise("photo",fetch(`${urlUpload}/upload`,{
        method: 'POST',
        headers: localStorage.authToken ? {Authorization: 'Bearer ' + localStorage.authToken} : {},
        body: formData,
    }).then((response) => response.json()))
};

//getData
//--//
const getData = (state, key, funk) => {
      //debugger(откладчик)
     if (state.promiseRed[key] && state.promiseRed[key].payload) {
                                 return state.promiseRed[key].payload.data[funk];
      }

    }
export {actionPromise,gql, urlUpload,actionCategoryCard,actionGoods,actionGoodCard,actionGoodUpdate,actionAuthLogin,actionAuthLogout,newAuth,actionRegister,actionLogin,LoginForm,actionOrder,actionOrderUpdate,actionOrdersFind, actionOneOrderFind,actionUserUpdate,toSearch,QuerytoSearch,actionSearch,actionSearchUser,actionWishes, actionUpdateImg,getData,actionUserUpdateFindOne };