import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { addProductReducer, productListReducer } from './Redux/reducers/productReducers'
import {userLoginReducer,} from './Redux/reducers/userReducer'
import {productDetailsReducer} from './Redux/reducers/productReducers'
import { formAddProductReducer} from './Redux/reducers/productReducers' 

const reducer = combineReducers({

  formAddProduct: formAddProductReducer,
   addProduct: addProductReducer,
    userLogin: userLoginReducer,
productList: productListReducer,
productDetails: productDetailsReducer,


})



const initialState = {}

const middleware = [thunk]


  const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))
  
   export default store