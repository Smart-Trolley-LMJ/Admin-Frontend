import { PRODUCT_UPDATE_SUCCESS, 
    PRODUCT_UPDATE_REQUEST,
     PRODUCT_UPDATE_FAIL,
    
     PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,} from '../constants/productConstants'

export const addProductReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return { loading: true }

        case PRODUCT_UPDATE_SUCCESS:
                return { loading: false }
    
            case PRODUCT_UPDATE_FAIL:
                return { loading: false, error: action.payload }
    
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
                    products: action.payload.products,
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
    