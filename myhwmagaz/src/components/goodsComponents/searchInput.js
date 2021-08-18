import {useState} from "react";
import {store, actionSearch} from "../../reducers";
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';
import { useHistory } from "react-router-dom";




const SearchInput = ({ className = "search", input = "Search goods"}) => {
    const [name, changeValue] = useState("ПSearch");
    const history = useHistory();
 
    return(
      <>
        <div className = {className}>
            <input type = "text" placeholder = {input} onChange = {e => changeValue(e.target.value)} onKeyDown = {(e) => e.keyCode == 13 && history.push(`/search/${name}`)}/>
            <Link to = {"/search/" + name}>
                <button id = "searchButton">Search</button>
            </Link>
        </div>
      </>
    )
  }

  const SearchUserInput = ({}) => {
    const history = useHistory();
    const [searchInput, changeValue] = useState("Пошук");
    return (
    <div className = "userSearch">
      <input type = "text" placeholder = "Search Users" onChange = {e => changeValue(e.target.value)} onKeyDown = {(e) => e.keyCode == 13 && history.push(`/searchUser/${searchInput}`)}/>
      <Link to = {"/searchUser/" + searchInput}>
          <button>Search</button>
      </Link>
    </div>
    )


  }

  export {SearchInput, SearchUserInput};