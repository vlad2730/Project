import { connect } from "react-redux";
import { useHistory } from "react-router-dom";


const mapStateToProps = state => ({
    
    state: state,
    order: state.promiseRed && state.promiseRed.order && 
        state.promiseRed.order.payload && 
        state.promiseRed.order.payload.data.OrderUpsert 
    // GoodsArr: arrFromObj(ObjFilter(state.basket, "price")),
    // order: orderArr(arrFromObj(ObjFilter(state.basket, "price")))

  });


const OrderPage = ({order = false,state}) => {
    const history = useHistory();
    
    //debugger
    const date =  order ? new Date(+order.createdAt) : 0;

    if(order) {
    return(
        <>
            <div className = "order">
                <h2>Заказ оформлен!</h2>
                <span>Order number: {order._id}</span>
                <div> Create: {`${date.getDate()}. ${date.getMonth() + 1}. ${date.getFullYear()} о ${date.getHours()}: ${date.getMinutes()}: ${date.getSeconds()}  `}</div>
                <div>Сума заказа: {order.total}грн</div>
            </div>
        </>
    )} else {
        return (
            <>
        {history.push("/error")}
        </>
        )
    }

}

const COrderPage = connect(mapStateToProps, {})(OrderPage);

export default COrderPage;