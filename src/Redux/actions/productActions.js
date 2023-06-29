import { PRODUCT_UPDATE_FAIL,
     PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,

    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,} from "../constants/productConstants";
import axios from "axios";



export const addProduct = (csvfile) => async (dispatch) => {
    try{
        dispatch({ type: PRODUCT_UPDATE_REQUEST})
        
        console.log('CSV file object ' + csvfile)
 
        // console.log(' ' + obj)

        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post(
            `https://smtrolley.onrender.com/inventory/stock`,
            csvfile,
            config,
            )
            console.log('okay okay jejeosodlmfmdkm;sakdmkddf')

        dispatch({
            PRODUCT_UPDATE_SUCCESS,
            payload: data
        })


    }
    catch (error) {
        if (error.response) {
            // console.log(data.ms)
            console.log(error.response.data); // Response data from the server
            console.log(error.response.data.detail); // Status code of the response
            // console.log(error.response.headers); // Response headers
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request); // The XMLHttpRequest object used for the request
          } 
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })

    }

}

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })

        const { data } = await axios.get(`https://smtrolley.onrender.com/inventory/get-all`)

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })
        // console.log('eiii this data' + data)

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

export const getProductByName = (name) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`https://smtrolley.onrender.com/inventory/get-product-by-name/${name}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })
        console.log('eiii this data' + data)

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}