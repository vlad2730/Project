import { Provider, connect } from 'react-redux';
import { useEffect, useState } from 'react'
import { Header, Footer, MainImg, Links } from "../index"
import thunk from 'redux-thunk';
import { bindActionCreators } from 'redux';
import {actionCategoryCard} from "../../actions/actions";
import {BrowserRouter as Router, Route, Link, Switch, Redirect, useHistory} from 'react-router-dom';


const CatalogSubLink = ({name, arr}) => {
    const [show, changeValue] = useState(false);
    const history = useHistory();
    return(
        <li><span  onClick = {() =>changeValue(!show)}>{name} </span>{<ul className="subCatalog">{ show && arr.map(key =>
            <Links className = {"subLink"} key={`${key._id}${Math.random()}`} 
            url={(history.location.pathname.includes(`/catalog`) || history.location.pathname.includes(`/search`)) ? `/catalog/` + key._id : `/orderPage/` + key._id }
            text={key.name}> </Links>)}</ul>}</li>

    )
}


const Catalog = ({ state, status, categories = [], getData = () => console.log("no") }) => {
    useEffect(() => categories.length == 0 && getData(), []);
    const history = useHistory();

    return (
            <>

            <ul className="catalog">
                {categories.map(category =>
                
                    category.subCategories == null ?
                    
                        <Links 
                        key={`${category._id}${Math.random()}`} 
                        url={(history.location.pathname.includes(`/catalog`) || history.location.pathname.includes(`/search`)) ? `/catalog/` + category._id : `/orderPage/` + category._id }
                         text={category.name}> </Links> :

                         <CatalogSubLink name = {category.name} key = {`${category.subCategories._id}${Math.random()}`}arr = {category.subCategories}/>



                )}
            </ul>
            </>
        
    )
}

const getCategories = state => {
    // console.log("state", state)
    if (state.promiseRed.categories && state.promiseRed.categories.payload) {
        return state.promiseRed.categories.payload.data.CategoryFind
    }

    return [];
};

const mapStateToProps = state => ({
    state: state,

    status: state.promiseRed && state.promiseRed.categories &&
    state.promiseRed.categories.payload && state.promiseRed.categories &&
    state.promiseRed.categories.status,

    categories: getCategories(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getData: actionCategoryCard
}, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Catalog);