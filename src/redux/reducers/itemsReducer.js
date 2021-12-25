import {
   SET_ALL_ITEMS,
   SELECT_ITEM,
   REMOVE_ITEM
} from '../types/itemsTypes';

const initialState = {
    all: [],
    selected: null
};

const itemsReducer = (state = initialState , action) => {
    switch (action.type) {
        case SET_ALL_ITEMS:
            return {...state, all: action.payload};
        case SELECT_ITEM:
            return {...state, selected: action.payload || null};       
        case REMOVE_ITEM:
            return {...state, all: state.all.filter(item => item._id !== action.payload)};       
        default:
            return state;
    }
}

export default itemsReducer