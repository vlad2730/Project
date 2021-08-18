
import './App.css';
import history from "./history"
import {Provider, connect} from 'react-redux';
import {Header, Footer, actionCatalogCard, Main, SearchInput} from "./components/index"
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
// import createHistory from "history/createBrowserHistory";
import {Catalog, UpdateForm} from "./components/"
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import {gql, actionPromise, store, promiseReducer, actionSearch, urlUpload, updateAction} from "./reducers";
import { useState, useRef } from 'react';


 







function App() {
  return (
    <>
      <Provider store={store}>
        <Router history = {history}>
          <Header/>
          <Main/>
          <Footer/>
        </Router>
      </Provider>
    </>
  );
}

export default App;
