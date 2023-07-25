import {
    PRODUCT_FORM_SUBMIT_FAIL,
    PRODUCT_FORM_SUBMIT_REQUEST,
   PRODUCT_FORM_SUBMIT_SUCCESS,
   PRODUCT_CLEAR_FORM_SUBMIT_STATE,

    PRODUCT_UPDATE_SUCCESS, 
    PRODUCT_UPDATE_REQUEST,
     PRODUCT_UPDATE_FAIL,
     PRODUCT_CLEAR_UPDATE_STATE,
    
     PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,

    PRODUCT_EDIT_FAIL,
    PRODUCT_EDIT_REQUEST,
   PRODUCT_EDIT_SUCCESS,
   PRODUCT_CLEAR_EDIT_STATE,
   PRODUCT_EDIT_RESET,} from '../constants/productConstants'



    export const formAddProductReducer = (state = {}, action) => {
        switch (action.type) {
            case PRODUCT_FORM_SUBMIT_REQUEST:
                return { loading: true }
    
            case PRODUCT_FORM_SUBMIT_SUCCESS:
                return { loading: false, serverMsg: action.payload }
    
            case PRODUCT_FORM_SUBMIT_FAIL:
                return { loading: false, error: action.payload }
    
            case PRODUCT_CLEAR_FORM_SUBMIT_STATE:
                    return { loading: false, serverMsg: action.payload}
    
            default:
                return state
        
    }
}

export const addProductReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true }

        case PRODUCT_UPDATE_SUCCESS:
                return { loading: false, serverMsg: action.payload }
    
            case PRODUCT_UPDATE_FAIL:
                return { loading: false, error: action.payload }

            case PRODUCT_CLEAR_UPDATE_STATE:
                    return { loading: false, serverMsg: action.payload}
    
            default:
                return state
        }
    }

  export const productListReducer = (state = { products: [] }, action) => {
        switch (action.type) {
            case PRODUCT_LIST_REQUEST:
                return { loading: true, products: [] }
    
            case PRODUCT_LIST_SUCCESS:
                return {
                    loading: false,
                    products: action.payload,
                    page: action.payload.page,
                    pages: action.payload.pages
                }
    
            case PRODUCT_LIST_FAIL:
                return { loading: false, error: action.payload }
    
            default:
                return state
        }
    }

    export const productDetailsReducer = (state = { products: [] }, action) => {
        switch (action.type) {
            case PRODUCT_DETAILS_REQUEST:
                return { loading: true, products: [] }
    
            case PRODUCT_DETAILS_SUCCESS:
                return {
                    loading: false,
                    products: action.payload.products,
                    page: action.payload.page,
                    pages: action.payload.pages
                }
    
            case PRODUCT_DETAILS_FAIL:
                return { loading: false, error: action.payload }
    
            default:
                return state
        }
    }
    
    export const productEditReducer = (state = { products: {} }, action) => {
        switch (action.type) {
            case PRODUCT_EDIT_REQUEST:
                return { loading: true }
    
            case PRODUCT_EDIT_SUCCESS:
                return { loading: false, success: true, product: action.payload }
    
            case PRODUCT_EDIT_FAIL:
                return { loading: false, error: action.payload }
    
            case PRODUCT_EDIT_RESET:
                return { product: {} }
    
            default:
                return state
        }
    }
    