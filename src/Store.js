import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { addProductReducer, productListReducer } from './Redux/reducers/productReducers'
import {userLoginReducer,} from './Redux/reducers/userReducer'
import {productDetailsReducer} from './Redux/reducers/productReducers'
import { formAddProductReducer} from './Redux/reducers/productReducers' 
import { productEditReducer } from './Redux/reducers/productReducers'
import { transactionsListReducer } from './Redux/reducers/productReducers'

const reducer = combineReducers({

  productEdit: productEditReducer,
  formAddProduct: formAddProductReducer,
   addProduct: addProductReducer,
    userLogin: userLoginReducer,
productList: productListReducer,
productDetails: productDetailsReducer,
transactionsList: transactionsListReducer,


})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null


const initialState = {
  userLogin: { userInfo: userInfoFromStorage }
}

const middleware = [thunk]


  const store = createStore(reducer, initialState,
    composeWithDevTools(applyMiddleware(...middleware)))
  
   export default store