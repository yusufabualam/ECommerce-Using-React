import { UPDATE_QUANTITY } from '../Actions/UpdateQuantity';

const initialState = {
    items: [],
};

const updateQuantityReducer = (state = initialState, action) => {
    switch (action.type) {
          case UPDATE_QUANTITY:
            return {
              ...state,
              cart: state.cart.map((item) =>
                item.id === action.payload.productId
                  ? { ...item, stock: item.stock - (action.payload.newQuantity - item.quantity) }
                  : item
              ),
            };
          default:
            return state;
        }
      };
      

export default updateQuantityReducer;
