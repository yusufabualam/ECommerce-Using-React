import { combineReducers } from "redux";
import wishlistReducer from "./wishListReducer";
import favoritesReducer from "./favoriteReducer";
import cartReducer from "./cartReducer";
import updateQuantityReducer from "./updateQuantityReducer";

export default combineReducers ({
    wish:wishlistReducer,
    favor: favoritesReducer,
    cart: cartReducer,
    item: updateQuantityReducer
})