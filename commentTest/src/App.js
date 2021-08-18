import React, {Component,useState} from 'react';
import './App.css';
import ReactDOM from "react-dom";
import axios from "axios";


import Comment from "./Comment";
import CommentGroup from "./CommentGroup";
import CommentAdd from "./CommentAdd";

function App(){
  return(
    <>
      <CommentGroup/>
      <Comment/>
     
    </>
  )
}
export default App;