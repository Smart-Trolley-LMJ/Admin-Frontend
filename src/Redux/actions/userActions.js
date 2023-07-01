import axios from 'axios'

import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
 }
    from '../constants/userConstants'


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const obj = { 'username': email, 'password': password }
        const myJson = JSON.stringify(obj)
// console.log('this is my ' + myJson)
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const { data } = await axios.post(
            'https://smtrolley.onrender.com/admin/login',
            myJson,
            config,
        )
     
        

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })
    
        console.log('okay okay ' + data.msg)
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        dispatch({ 
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                :error.message,
        })
    }

  
}
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT})
}
