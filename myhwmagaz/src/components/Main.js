import {BrowserRouter as Router, Route, Link, Switch, Redirect, useHistory} from 'react-router-dom';
// import createHistory from "history/createBrowserHistory";
import { useState } from 'react';
import {Provider, connect} from 'react-redux';
import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import store from "../reducers";
import Catalog from "./goodsComponents/catalog";
import {actionCatalogCard, CBasketPage, searchInput, CGoodsCategory, 
    SearchInput, CGoodsSearch, LoginForm, CGoodCard, CYourProfile,
    COrderPage, CUsersList, COrdersList, COrderUpdate, CWishesPage, CGoodsList} from "./index";


  
const Main = ({className = "MainImg" }) => {
    return (
        <>

        <div className = {className}>
            <div className = "catalogHead">
                <Switch>
                    <Route path = "/orderPage/" component = {MainCatalog}/>
                <SearchInput/>
                </Switch>
            </div>
                <div className = "catalogInput">

                    <aside>
                        <Switch>
                            <Route path = "/catalog/" component={Catalog} />
                            <Route path = "/search/"component={Catalog} />
                            <Route path = "/good/:id" component={(window.innerWidth > 900) && Catalog} />
                            <Route path = "/orderPage/" component = {Catalog}/>
                            <Route component = { Empty } exact/>
                        </Switch>
                    </aside>


                <div className = "content">
                    <Switch>
                        <Route path = "/" component = {About} exact/>
                        <Route path = "/catalog/" component={MainCatalog} exact/>
                        <Route path = "/catalog/:id" component= {({match}) => <CGoodsCategory id = {match.params.id} /> }/>
                        <Route path = "/search/:name" component = {({match}) => <CGoodsSearch name = {match.params.name}/>}/>
                        <Route path = "/good/:id" component = {({match}) => <CGoodCard id = {match.params.id}/>}/>
                        <Route path = "/order/" component = {COrderPage} exact/>
                        <Route path = "/login/" component = {LoginForm}/>
                        <Route path = "/searchUser/:users" component = {CUsersList}/>
                        <Route path = "/profile/" component = {CYourProfile}/>
                        <Route path = "/user/:_id" component = {CYourProfile}/>
                        <Route path = "/basket" component = {CBasketPage}/>
                        <Route path = "/wishes" component = {CWishesPage}/>
                        <Route path="/about" component = {About} exact/>
                        <Route path = "/orderPage/" component = {MainCatalog} exact/>
                        <Route path = "/orderPage/:id" component = {({match}) => <CGoodsCategory id = {match.params.id}/>}/>
                        <Route path = "/contacts" component = {Contacts} />
                        <Route path = "/loginError" component={LoginError} />
                        <Route component = { NotFound } exact/>
                    </Switch>
                </div>
            </div>
        </div>
        <div className = "bottom">
                    <Switch>
                        <Route path = "/profile/" component = {COrdersList}/>
                        <Route path = "/user/:_id" component = {COrdersList}/>
                        <Route path = "/orderPage/:_id" component = {COrderUpdate}/>
                    </Switch>
        </div>
        </>
    )
  }

const LoginError = () => { 
    const history = useHistory();
    return(
        <>
        <div className = "loginWrapper">
            <h4>Упс, щось пішло не так. 
                Можливо це ім'я вже зайнято, або ви ввели невірні дані.
                 Спробуйте ще.</h4>
            <button onClick = {() => history.push("/login")}>Перейти на сторінку регістрації</button>
        </div>
        </>
    )}

const About = () => 
    <div className = "basketNoGoods">

            <h4>Добро пожаловать в наш магазин!</h4>
            <p>
                В нашем магазине вы найдете любой товар на ваш вкус и сможете заказать его в любое время
            </p>
            <p>
                Закажите товар и мы его доставим вам в течение 2-3 часов.
            </p>

    </div>
const NotFound = () => {
    return(
        <>
            <div className = "basketNoGoods">
                <h4>Errors, Page Not Found</h4>
            </div>
        </>
    )
}
{/* <div> <h5 className = "profilePage">Ой, щось пішло не так. Мабудь цієї сторінки немає, або сталася помилка. Спробуйте ще.</h5></div> */}
const MainCatalog = () => <div></div>
const Empty = () => <div className = "empty"></div>
const Contacts = () => 
    <div className = "order">
        <h4>Контакты:</h4>
        <p> телефон: + 38 095 727 9573</p>
        <p> instagram: <a href = "https://www.instagram.com/ua" target="_blank">Insta </a> </p>
        <p> Facebook: <a href = "https://www.facebook.com/ua" target="_blank"> Facebook </a></p>
        <p>Адрес: пр. Науки 9Д, Харьков, Харьковская область, Украина 61022</p>
    </div>
  

export default Main;