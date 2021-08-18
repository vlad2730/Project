import {BrowserRouter as Router, Route, Link, Switch, Redirect, useHistory} from 'react-router-dom';
import {Provider, connect} from 'react-redux';
import React, {Component, useState, useEffect} from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import jwt_decode from "jwt-decode"
import { bindActionCreators } from 'redux';
import {actionLogin, authReducer, actionAuthLogout, actionRegister} from "../../reducers";

const actionClearLogin = () => ({
    
    type: "PROMISE",
    status: "CLEAR",
    name: "login"
})

const ButtonLogout = ({onLogout, isLoggedIn}) => 
    <button onClick={onLogout}
        disabled={!isLoggedIn}>Logout</button>

 const CButtonLogout = connect(s => ({isLoggedIn: s.auth.payload}),{onLogout: actionAuthLogout})(ButtonLogout)

// const DashboardLink = ({login}) =>{
// console.log(login)
// return(
// <div className = "DashboardLink">{login ? <Link to='/dashboard'>{login}</Link> : <Link to='/login'>Anon</Link>}</div>
// )
// }
// const CDashboardLink = connect(s => ({login: s.auth.payload && s.auth.payload.sub.login, }))(DashboardLink)




const PasswordConfirm = ({status, loginStatus, state, login, isLoggedIn, onLogin = null, clearLogin}) => {
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");
    const history = useHistory();
    useEffect(() => {

        if(login) {
            history.push(`/profile/` + login) 
            return
        }
        history.push(`/login`);
        clearLogin()
        },[login]
)


    function Login() {
        
            onLogin(pass1, pass2)

            if(status == "RESOLVED" && !loginStatus){
                history.push("/loginError")
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


const FormReg = ({onReg, onLogin, login, state, isReg}) => {
    const [pass1, setPass1] = useState("");
    const [pass2, setPass2] = useState("");
    const history = useHistory();
    useEffect(() => login ?  history.push(`/profile/`) : history.push(`/login`),[login])


    return (
        <>
            <div>
                <input
                    type="text"
                    placeholder = "login"
                    onChange={(e) => {
                        setPass1(e.target.value);
                    }}
                    onKeyDown = {(e) => {
                        if (e.keyCode == 13 ) {
                            onReg(pass1, pass2)
                            if(!isReg) {
                                onLogin(pass1, pass2)
                            } else {
                                history.push('/loginError')
                            }
                        }
                    }}
                />
                <input
                    type="password"
                    placeholder = "password"
                    onChange={(e) => {
                        setPass2(e.target.value);
                    }}
                    onKeyDown = {(e) => {
                        if (e.keyCode == 13 ) {
                            onReg(pass1, pass2)
                            //debugger
                            if(!isReg) {
                                onLogin(pass1, pass2)
                            } else {
                                history.push('/loginError')
                            }
                        }
                    }}
                />
            </div>
            <div>
                <button disabled = {!pass2 || !pass1} onClick={() => {
                        onReg(pass1, pass2)

                        if(!isReg) {
                            onLogin(pass1, pass2)
                        } else {
                            history.push('/loginError')
                        }
                    }
                }>Сохранить</button>

            </div>

        </>

    )
}


const CFormReg = connect((state) => ({
    state: state, 
    login: state.auth.payload && state.auth.payload.sub.login,
    isReg: state.promiseRed && state.promiseRed.registration &&
    state.promiseRed.registration.payload &&
    state.promiseRed.registration.payload.errors

    }), {
    onReg:actionRegister,
    onLogin:actionLogin})(FormReg);



const CFormLogin = connect((s) => ({
    state: s, isLoggedIn: s.auth.payload, 
    login: s.auth.payload && s.auth.payload.sub.loginь,
    status: s.promiseRed.login && s.promiseRed.login.status,
    loginStatus: s.promiseRed.login && s.promiseRed.login.payload &&
    s.promiseRed.login.payload.data &&  s.promiseRed.login.payload.data.login
    }), {
    onLogin: actionLogin, clearLogin: actionClearLogin})(PasswordConfirm);


const LoginForm = ({}) => {

    return(
    <>  
        <div className = "loginWrapper">
            <h2>Ввойдите в аккаунт</h2>
            <div className = "loginForm">
                
                {/* <CDashboardLink/> */}
                <CFormLogin />

            </div>
            <h2>Зарегестрируйтесь, чтобы совершать покупки</h2>
            <div className = "loginForm">
                <CFormReg/>
            </div>
        </div>
    </>
    )
}


export default LoginForm;