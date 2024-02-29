import {ADD_TO_FAVORITES} from '../Actions/AddToFavorite'
import {REMOVE_FROM_FAVORITES} from '../Actions/RemoveFromFavorite'
const INITIAL_VALUE = {
    favorites: [],
    isFavoriteMap: {}
};

export default function favoritesReducer(state = INITIAL_VALUE, action){
    switch (action.type) {
        case ADD_TO_FAVORITES:
            return {
                ...state,
                favorites: [...state.favorites, action.payload],
                isFavoriteMap: {
                    ...state.isFavoriteMap,
                    [action.payload.id]: true, 
                },
            };
        case REMOVE_FROM_FAVORITES:
            const updatedFavorites = state.favorites.filter((product) => product.id !== action.payload);
            const updatedIsFavoriteMap = { ...state.isFavoriteMap };
            delete updatedIsFavoriteMap[action.payload]; 
            return {
                ...state,
                favorites: updatedFavorites,
                isFavoriteMap: updatedIsFavoriteMap,
            };
        default:
            return state;
    }

}