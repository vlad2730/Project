import {Footer, Links} from "./index"
import {BrowserRouter as Router, Route, Link, Switch, Redirect, useHistory} from 'react-router-dom';
import {Provider, connect} from 'react-redux';
import React, {Component, useState, useEffect} from 'react';
import {actionAuthLogout, actionUserUpdateFindOne} from "../reducers"
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';






const HeaderMenu = ({className = "standartMenu", getCat = null}) => {


    return (
        <>
            <ul className = {className}>

                <Links url = {"/catalog"} text = {"Catalog"}/>
                <Links url = {"/about"} text = {"About us"}/>
                <Links url = {"/contacts"} text = {"Contacts"}></Links>

            </ul>
        </>
    )
}



const MobileMenu = ({}) => {
    const [show, setShow] = useState(false)
    const divStyle = "mobileMenu"
    function onClick() {

        setShow(!show)
    }

    return (
        <>
            
            <svg onClick = {onClick} xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-justify-left" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"/>
            </svg>
            {show && <HeaderMenu className = {divStyle}/>}
        </>
    )
}

const ToLoginPage = ({login, onLogout, getData, NickName = "User", loginId}) => {

    const history = useHistory();

    
    useEffect(() =>  history.location.pathname.includes(`/profile/`) && (login ?  history.push(`/profile/`) : history.push(`/login`)),[login])
    return(
        <>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
        </svg>
        <Link to = {login ? "/profile/": "/login"} >
            <span className = "link">{login ? login : "Login"}</span>
            </Link>
            {login && <button onClick = {() =>  { onLogout()
                    window.location.reload()}}>Logout</button>}

        </>
    )
}

const CToLoginPage = connect(s => ({
    login: s.auth.payload && s.auth.payload.sub.login,
    loginId: s.auth.payload && s.auth.payload.sub._id,
    NickName: s.promiseRed && s.promiseRed.user &&
    s.promiseRed.user.payload && s.promiseRed.user.payload.data &&
    s.promiseRed.user.payload.data.UserFindOne &&
    s.promiseRed.user.payload.data.UserFindOne.login,
}), {onLogout: actionAuthLogout,
     getData: actionUserUpdateFindOne,
}) (ToLoginPage);


const Wishes = ({wishesCount}) => {

    return(
        <div>
            <Link to = "/wishes">
               <img src="https://pics.freeicons.io/uploads/icons/png/7800621811554352300-512.png" width="25" height="25" alt="Запомнить"  />
                <span>Сохраненные покупки({wishesCount})</span>
            </Link>
            
        </div>
    )
}

const CWishes = connect(s => ({wishesCount: s.wishListReducer.count}), {})(Wishes)


const Basket = ({basketCount, className = "basket"}) => {

    return(
    <div className = {className}>
        <Link to = "/basket">
            <img src="https://pics.freeicons.io/uploads/icons/png/15804769121549346286-512.png" width="25" height="25" alt="КОРЗИНА" />
            <span>{basketCount || "0"}грн</span>
        </Link>
    </div>
    )
}
const CBasket = connect(s => ({data: s.basket, basketCount: s.basket.price}), {})(Basket)



const Header = ({}) => {

    return(
        <>
            <div className = "header">
                
                <div className = "tabletMenu">
                    <MobileMenu/>
                </div>
                <HeaderMenu/>

                <div className = "rightSide">
                    <CWishes/>
                    <div>
                        <CToLoginPage/>

                    </div>
                    <CBasket/>

                </div>
            </div>          
        </>
    )
}

export default Header;