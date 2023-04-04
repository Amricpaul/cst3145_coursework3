const mutations = {
    SET_LESSONS: (state, payload) =>{
        state.lessons = payload;
    },
    setSiteName(state, payload){
        state.siteName = payload;
    },
    setCurrency(state, payload){
        state.storeCurrency = payload;
    },
    SET_CART: (state, payload) =>{
        state.cart.push(payload);
    },
    DELETE_CART: (state, payload) =>{
        state.cart = payload;
    },
    SET_ORDER_INIT: (state, payload) =>{
        state.orderState = payload;
    }
}

export default mutations;