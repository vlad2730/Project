import {Provider, connect} from 'react-redux';
import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';

const Links = ({url, text, className = "links"}) => {
    return (

            <Link className = {className} to={url}><li key = {`${url}${Math.random() || Math.random()}`}>{text}</li></Link>

    )
}

export default Links;