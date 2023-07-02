import React, { useEffect } from 'react'
import FormContainer from '../components/loginComponents/FormContainer'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from '../theme';
import { useState } from "react";
import Papa from "papaparse";
import { addProduct } from '../Redux/actions/productActions';
import { useDispatch, useSelector } from 'react-redux'
import './AddProduct.css'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { clearupdate } from '../Redux/actions/productActions';





function AddProduct() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

 

    const [csvfile, setCsvFile] = useState(null);

    const addProductInfo = useSelector(state => state.addProduct)
    const {error, loading, serverMsg} = addProductInfo


if(serverMsg) {
  console.log('helloooooowepoew')
}
const pop = serverMsg
console.log( "hey ther pop " + JSON.stringify(pop))




    const dispatch = useDispatch()
  
    const changeHandler = (e) => {
      setCsvFile(e.target.files[0])

    }

      const handleOnSubmit = (event) => {
        event.preventDefault();

 
    const formData = new FormData();
    formData.append('file', csvfile);


dispatch(addProduct(formData))


    };

    useEffect(() => {
      const timer = setTimeout(() => {
        dispatch(clearupdate()) 
    },5000)

    return () => {
      clearTimeout(timer)
    }
  }, [pop, error])

  return (
    <div>

      <div className='message-loader'>
      {pop ? 
        <Message variant='success'>{pop.msg}</Message> :
       error ? <Message variant='danger'>{error}</Message> :
            loading && <Loader />}
            </div>
            <div className='div-div'>
            <div className='info'>CLICK CHOOSE FILE TO ADD CSV FILE</div>

      <label class='choose-file-container'>
      <input
        type="file"
        onChange={changeHandler}
        style={{  }}
      />
      <span className='choose-file-button'>Choose file</span>
      </label>
      <br />
      {csvfile ? <button variant='light' className='upload-button'  style={{ display: "block", marginLeft: "675px",   }} 
      onClick={ handleOnSubmit }>
         UPLOAD CSV
       </button> : null
      
}
     

       </div>
    </div>
  )
}

export default AddProduct
