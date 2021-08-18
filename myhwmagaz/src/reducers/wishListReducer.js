



function wishListReducer (state, {type, _id}) {
    if(state === undefined) {
        if(localStorage.authToken && localStorage.wishList) {
            state = JSON.parse(localStorage.wishList);
        }
        else {
            state = {
                count: 0,
                goods: []
            };
        }
    }

    if(type == "WISH_ADD") {

        state = {
            ...state,
            count: state.count + 1,
            goods: [...state.goods, _id]
        }
    }

    if(type == "WISH_DELETE") {
        let newGoodsArr = state.goods.splice(state.goods.indexOf(_id), 1)

        state = {
            ...state,
            count: state.count - 1,
            goods: state.goods

        }
    }
    localStorage.wishList = JSON.stringify(state)

    return state;

}


const actionWishAdd = (_id) => ({
    type: "WISH_ADD",
    _id
});

const actionWishDelete = (_id) => ({
    type: "WISH_DELETE",
    _id
});

 



export {wishListReducer, actionWishAdd, actionWishDelete};