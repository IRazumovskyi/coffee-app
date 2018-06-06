import {SWITCH_COLOR} from "../actions/actionTypes";


const initialState = {isChanged:false};

export default (state = initialState, action) => {
    switch (action.type) {
        case SWITCH_COLOR:  
            return  {
                ...state,
                isChanged: !state.isChanged
            };
    
        default: return state;
    }
};

