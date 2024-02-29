import {ADD_TO_WISHLIST} from '../Actions/AddToWishList'
import {REMOVE_FROM_WISHLIST} from '../Actions/RemoveFromWishList'

const INITIAL_VALUE = {
    wishlist: [],
    iswishlistMap: {}
};

export default function wishlistReducer(state = INITIAL_VALUE, action){
    switch (action.type) {
        case ADD_TO_WISHLIST:
            return {
                ...state,
                wishlist: [...state.wishlist, action.payload],
                iswishlistMap: {
                    ...state.iswishlistMap,
                    [action.payload.id]: true, 
                },
            };
        case REMOVE_FROM_WISHLIST:
            const updatedWishlist = state.wishlist.filter((product) => product.id !== action.payload);
            const updatedIswishlistMap = { ...state.iswishlistMap};
            delete updatedIswishlistMap[action.payload]; 
            return {
                ...state,
                wishlist: updatedWishlist,
                iswishlistMap: updatedIswishlistMap,
            };
        default:
            return state;
    }

}