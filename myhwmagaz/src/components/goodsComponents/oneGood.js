import {BrowserRouter as Router, Route, Link, Switch, Redirect} from 'react-router-dom';

const OneGood = ({className = "oneGoodInner", image,  name, price, id}) => {

    return (
      <>
      <div  className = {className}>
        <Link to = {`/good/` + id}>

            <h5>{name}</h5>
            <div className = "forOneGoodImg">
              <img width = "230px" src = {image}/>
            </div>
            <div>
              <span>{price}грн</span>

            </div>

        </Link>

          </div>
      </>
    )
  }

  export default OneGood;