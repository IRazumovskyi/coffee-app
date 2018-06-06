import {OPEN_MODAL, CLOSE_MODAL} from "../actions/actionTypes";


const initialState = {isShow:false};

export default (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MODAL:              
            return  {
                ...state,
                isShow: true
            };
        case CLOSE_MODAL:              
            return  {
                ...state,
                isShow: false
            };
    
        default: return state;
    }
};

