import {createStore} from 'vuex';

import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default createStore({
    state:{
            siteName: 'Tutoria',
            storeCurrency: "AED",
            lessons: [],
            cart: [],
            orderState: false,
            order:{
                name: '',
                email: '',
                phone: '',
                address: '',
                item: [],
                total: 0,
            },
            filter: {
                  sortbyKey: 'default',
                  locationKey: 'all',
                  subjectKey: 'all',
                  searchValue: '',
            },
    },
    mutations,
    actions,
    getters,
    
});
