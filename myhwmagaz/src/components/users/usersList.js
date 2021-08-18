import { connect } from "react-redux";
import { actionSearchUser, urlUpload } from "../../reducers";
import { useEffect, useState, useRef } from "react";
import {SearchUserInput} from "../index";
import {BrowserRouter as Router, Route, Link, Switch, Redirect, useHistory} from 'react-router-dom';
import {createStore, combineReducers, applyMiddleware, bindActionCreators} from 'redux';


const OneUserIcon = ({nick, img, login, id, isUserAdm}) => {

    return(
        
            <div className = "oneUser" key = {`${id}`}>
                <Link to = {"/user/" + id }>
                    <div>
                    <img src={img ? img : 'https://pngicon.ru/file/uploads/picca-1.png'} />
                    </div>
                    <div>
                    <span>{nick || login}</span>
                    {isUserAdm && 
                    <span className = "adminSmile">
                    <img src="#" />
                    {/* <span>admin</span> */}
                    </span>
                    }
                    </div>
                </Link>
            </div>
        
    )
}

const UsersList = ({match:{params:{users}}, state, getData, usersList}) => {
    useEffect(() =>  getData(`${users}`),[users]);
    if(usersList) {
    return(
        <>
            <SearchUserInput/>
           

            <div className = "usersList">
                {usersList.map((user) => 
                    
                    <OneUserIcon key = {user._id} isUserAdm = {user.acl.indexOf("admin") > -1} id = {user._id }nick = {user.nick} login = {user.login} img = {user.avatar ? (`${urlUpload}/${user.avatar.url}`) : ('/pizza_profile.png')}/>
                )}
            </div>
        
        </>
    )} else {
        return  (
        <>
         <SearchUserInput/>
        </>
        )
    }
}

const mapStateToProps = state => ({
    state: state,
    usersList: state.promiseRed && state.promiseRed.FoundUser &&
    state.promiseRed.FoundUser.payload && state.promiseRed.FoundUser.payload.data &&
    state.promiseRed.FoundUser.payload.data.UserFind
 });


 
 const mapDispatchToProps = dispatch => bindActionCreators({
   getData: actionSearchUser,
 }, dispatch);

 const CUsersList = connect(mapStateToProps, mapDispatchToProps)(UsersList);

 export default CUsersList;