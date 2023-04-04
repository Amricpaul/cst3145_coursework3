import api from '@/api';

const actions = {
    
    fetchLessons: async ({commit}, payload) => {
        const response = await api.lessons.getLessons();
        commit('SET_LESSONS', response);
    },
   
    addCart: ({commit}, payload) => {
        commit('SET_CART', payload);
    },

    removeAllCart: ({commit}, payload) => {
        commit('DELETE_CART', []);
    },
    setOrderInit : ({commit}, payload) => {
        let order = {
                name: '',
                email: '',
                phone: '',
                address: '',
                item: [],
                total: 0,
         };
        commit('SET_ORDER_INIT', order);
    },
    cartTotalAction: function(context){
        let  total = 0;
        context.state.cart.forEach(function(item){
            total += item.price * item.quantity;
        })
       context.state.order.total = total;
    },
   
}

export default actions;


