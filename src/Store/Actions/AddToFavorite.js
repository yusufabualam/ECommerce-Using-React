export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';

export const addToFavorites = (product) => ({
    type: ADD_TO_FAVORITES,
    payload : product 
});