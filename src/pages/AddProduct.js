import React from 'react'
import FormContainer from '../components/loginComponents/FormContainer'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from '../theme';
import { useState } from "react";
import Papa from "papaparse";
import { addProduct } from '../Redux/actions/productActions';
import { useDispatch, useSelector } from 'react-redux'




function AddProduct() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [parsedData, setParsedData] = useState([]);

    //State to store table Column name
    const [tableRows, setTableRows] = useState([]);
  
    //State to store the values
    const [values, setValues] = useState([]);

    const [csvfile, setCsvFile] = useState(null);

    const dispatch = useDispatch()
  
    const changeHandler = (e) => {
      setCsvFile(e.target.files[0])
    // }
    // console.log( 'loloo ' + e.target.files[0])
    }

      const handleOnSubmit = (event) => {
        event.preventDefault();

      // const file = e.target.files[0];
      // console.log( 'loloo ' + e.target.files[0])
    const formData = new FormData();
    formData.append('file', csvfile);
// console.log("this is the event" + formData)


dispatch(addProduct(formData))


    };

  return (
    <div>
       {/* File Uploader */}
      <input
        type="file"
        // name="file"
        onChange={changeHandler}
        // accept=".csv"
        style={{ display: "block", margin: "10px auto" }}
      />
      <br />
      <Button variant='light' className=''  style={{ display: "block", marginLeft: "670px", borderRadius: '6px' }} onClick={
            handleOnSubmit
          }>
                                                    
                                                    UPLOAD CSV
                                                </Button>
      {/* <button
          onClick={
            handleOnSubmit
          }
        >
          IMPORT CSV
        </button> */}
      <br />
      {/* Table */}
      {/* <table>
        <thead>
          <tr>
            {tableRows.map((rows, index) => {
              return <th key={index}>{rows}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {values.map((value, index) => {
            return (
              <tr key={index}>
                {value.map((val, i) => {
                  return <td key={i}>{val}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      {parsedData.map((data, index) => (
  <div key={index}>
    <p>{JSON.stringify(data)}</p>
  </div>
))} */}


    </div>
  )
}

export default AddProduct
