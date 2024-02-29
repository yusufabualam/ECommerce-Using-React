export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';

export const updateQuantity = (productId, newQuantity) => ({
    type: UPDATE_QUANTITY,
    payload: { productId, newQuantity },
});
