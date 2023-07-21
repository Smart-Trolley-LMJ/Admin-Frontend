import { 
    PRODUCT_FORM_SUBMIT_FAIL,
     PRODUCT_FORM_SUBMIT_REQUEST,
    PRODUCT_FORM_SUBMIT_SUCCESS,
    PRODUCT_CLEAR_FORM_SUBMIT_STATE,
    
    PRODUCT_UPDATE_FAIL,
     PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_CLEAR_UPDATE_STATE,

    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,} from "../constants/productConstants";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";



export const formAddProduct = (transformedForm) => async (dispatch, getState) => {
try{
    dispatch({ type: PRODUCT_FORM_SUBMIT_REQUEST})
    
    // console.log(' ' + transformedForm)

    const {
        userLogin: { userInfo },
    } = getState()

    const config = {
        headers: {
            'Content-type': 'application/json',
            Authorization: `${userInfo.token}`
        }
    }

    const { data } = await axios.post(
        `https://smtrolley.onrender.com/inventories`,
        transformedForm,
        config,
    )

    dispatch({
        type: PRODUCT_FORM_SUBMIT_SUCCESS,
        payload: data

    })
}

    catch (error) {
        dispatch({
            type: PRODUCT_FORM_SUBMIT_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }


}


export const addProduct = (csvfile) => async (dispatch) => {
    try{
        dispatch({ type: PRODUCT_UPDATE_REQUEST})
        
        console.log('CSV file object ' + csvfile)
 
        // console.log(' ' + obj)

        const config = {
            headers: {
                'Content-type': 'multipart/form-data'
                // Authorization: `Bearer ${userInfo.token}`

            }
        }

        const { data } = await axios.post(
            `https://smtrolley.onrender.com/inventories/bulk`,
            csvfile,
            config,
            )
            // console.log('okay okay jejeosodlmfmdkm;sakdmkddf')


        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        })

        
    }
   
    catch (error) {
      
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })

    }

}

export const clearupdate = () => (dispatch) => {
    try{
       const data = null
        dispatch({
            type: PRODUCT_CLEAR_UPDATE_STATE,
            payload: data
        })
    }
    catch{}
}

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST })

        const { data } = await axios.get(`https://smtrolley.onrender.com/inventories`)

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

export const getProductByName = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST })

        const { data } = await axios.get(`https://smtrolley.onrender.com/inventory/get-product-by-name/${id}`)

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