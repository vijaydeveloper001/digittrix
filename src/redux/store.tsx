import { configureStore } from "@reduxjs/toolkit"
import userdataSlice from './reducers/reducersdata'
import userCartData  from "./reducers/cartreducers"
export const store = configureStore({
    reducer:{
        userdata:userdataSlice,
        cartdata:userCartData
    }
})