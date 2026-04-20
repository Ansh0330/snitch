import { configureStore} from "@reduxjs/toolkit"
import authReducer from "../features/auth/state/auth.slice"
import productsReducer from "../features/products/state/products.slice" 

export const store = configureStore({
    reducer: {
        auth:authReducer,
        products:productsReducer
    }
})