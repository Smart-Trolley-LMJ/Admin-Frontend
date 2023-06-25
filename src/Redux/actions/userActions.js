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
console.log('this is my ' + myJson)
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
        // .then(response => {
        //     console.log(response.data)
        //     console.log('okay okay ' + data)

        // })
        console.log('okay okay ' + data.msg)
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            console.log(error.response.data); // Response data from the server
            console.log(error.response.data.detail); // Status code of the response
            console.log(error.response.headers); // Response headers
          } else if (error.request) {
            // The request was made but no response was received
            console.log(error.request); // The XMLHttpRequest object used for the request
          } 
    }

  
}
export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: USER_LOGOUT})
}
