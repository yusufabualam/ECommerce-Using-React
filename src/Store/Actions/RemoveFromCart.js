export const REMOVE_FROM_CART= 'REMOVE_FROM_CART';

export const removeFromCart= (productId)  => ({
    type: REMOVE_FROM_CART,
    payload: productId
});