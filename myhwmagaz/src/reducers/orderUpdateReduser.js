

function orderUpdateReducer(state, { type, total, id, owner, goods, Id, images, name, description,  price, count }) {
    if(state === undefined){

            state = {}

    }

    if (type === "ORDER_ADD") {
        state = {
            ...state,  
            owner: owner,
            total: total,        
            _id: id,
            goods: goods
                
        }

    }

    if (type === "DELETE_ONE_ORDER") {
        if((state.goods[Id].count - 1) == 0 ){
            state = {
                ...state,
                goods: {
                    ...state.goods,

                },
                total: +state.total - state.goods[Id].price  
            }
            delete state.goods[Id]
        }
        else {
            state = {
                ...state,
                goods : {
                    ...state.goods,
                    [Id]: {
                        ...state.goods[Id],
                        count: +[state.goods[Id].count] - 1,

                    }
                },
                total: +state.total - state.goods[Id].price                   
            }
        }
    }
    
    if (type === "ADD_ONE_ORDER") {

        state = {
            ...state,
            goods : {
                ...state.goods,
                [Id]: {
                    ...state.goods[Id],
                    count: +[state.goods[Id].count] + 1,

                }
            },
            total: +state.total + state.goods[Id].price                   
        }
    }

    if (type === "NEW_GOOD_ORDER_ADD") {

        if(state.goods[Id]){

            state = {
                ...state,
                goods : {
                    ...state.goods,
                    [Id]: {
                        ...state.goods[Id],
                        count: +[state.goods[Id].count] + 1,
    
                    }
                },
                total: +state.total + state.goods[Id].price                   
            }
        }
        else {

            state = {
                ...state,
                goods: {
                    ...state.goods,
                    [Id]: {
                        count: (state.goods && state.goods[Id] ? state.goods[Id] : 0) + 1,
                        good: {
                            name: name,
                            images: images,
                            price: price,
                            _id : Id,

                        },
                        
                        _id : Id,
                        price: price,
                    }

                },
                total: +state.total + price    
            }
        }
    }
    if (type === "ORDER_CLEAR") {

        state = {
            id: state.id,
            goods: {},
            total: 0,
            count: 0
            
        }
    }





    return state;
}
    



const actionOrderAdd = ( id, goods, total, owner, name, price, images, count = 0) => ({
    type: "ORDER_ADD",
    id,
    goods,
    count,
    owner,
    price,
    name,
    images,
    total
    
});

const actionDeleteOneOrder = (Id, id, goods, images) => ({
    type: "DELETE_ONE_ORDER",
    id,
    Id,
    goods,
    images

});
const actionAddOneOrder = (Id, id, goods, images) => ({
    type: "ADD_ONE_ORDER",
    id,
    Id,
    goods,
    images

});
const actionNewGoodOrderAdd = (Id, price,  name, images, ) => ({
    type: "NEW_GOOD_ORDER_ADD",
    Id,
    name,

    images,
    price

});

const actionOrderClear = () => ({
    type:"ORDER_CLEAR",

})


export {orderUpdateReducer, actionOrderClear, actionNewGoodOrderAdd, actionAddOneOrder, actionOrderAdd, actionDeleteOneOrder};