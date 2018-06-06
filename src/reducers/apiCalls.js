import {FETCH_COFFEE_LIST, FETCH_COFFEE_DETAILS} from "../actions/actionTypes";


const initialState = {list:[], details:[], coffee:{}};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COFFEE_LIST:   
            return  {
                ...state,
                list:action.data.data
            };
        case FETCH_COFFEE_DETAILS:            
            return  {
                ...state,
                details:action.data.data,
                coffee:action.data.product
            };
    
        default: return state;
    }
};

