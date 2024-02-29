import {ADD_TO_CART} from '../Actions/AddToCart'
import {REMOVE_FROM_CART} from '../Actions/RemoveFromCart'
const INITIAL_VALUE = {
    cart: [],
    isCartMap: {}
};

export default function cartReducer(state = INITIAL_VALUE, action){
    switch (action.type) {
        case ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, action.payload],
                isCartMap: {
                    ...state.isCartMap,
                    [action.payload.id]: true, 
                },
            };
        case REMOVE_FROM_CART:
            const updatedCart = state.cart.filter((product) => product.id !== action.payload);
            const updatedIsCartMap = { ...state.isCartMap };
            delete updatedIsCartMap[action.payload]; 
            return {
                ...state,
                cart: updatedCart,
                isCartMap: updatedIsCartMap,
            };
        default:
            return state;
    }

}