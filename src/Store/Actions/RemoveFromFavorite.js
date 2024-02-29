export const REMOVE_FROM_FAVORITES = 'REMOVE_FROM_FAVORITES';

export const removeFromFavorites = (productId)  => ({
    type: REMOVE_FROM_FAVORITES,
    payload: productId
});