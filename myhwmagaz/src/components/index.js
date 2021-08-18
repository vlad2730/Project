import React, { useState } from 'react';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import Header from "./header";
import Footer from "./footer";
import Main from "./Main";
// import actionCategoryCard from "../actions/actions";
import Links from "./links";
// import CGoodsCategory from "./goods/goodsCategory";
// import OneGood from './goods/oneGood';
// import CGoodsList from "./goods/goodsList";
import {SearchInput, SearchUserInput} from "./goodsComponents/searchInput";
import CGoodsSearch from "./goodsComponents/goodsSearch";
// import GoodsNotFound from "./goods/goodsNotFound";
import LoginForm from "./users/loginOnPage";
import {CGoodCard, CGoodsCategory, CGoodsList, GoodsNotFound, OneGood} from "./goodsComponents/index";
import CYourProfile from "./users/profilePage";
import CBasketPage from "./goodsComponents/basket";
import COrderPage from "./orders/orderDonePage";
import CUsersList from "./users/usersList";
import COrdersList from "./orders/ordersList";
import COrderUpdate from "./orders/orderUpdate";
import CWishesPage from "./goodsComponents/wishesPage";


export {Header,Footer,  Main, Links, CGoodsCategory, OneGood, CGoodsList, SearchInput, CGoodsSearch, GoodsNotFound, 
LoginForm, CGoodCard, CWishesPage, CYourProfile, COrderUpdate, CBasketPage, COrdersList, COrderPage, CUsersList, SearchUserInput};



