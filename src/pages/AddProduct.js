import React, { useEffect } from "react";
import FormContainer from "../components/loginComponents/FormContainer";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useState } from "react";
import Papa from "papaparse";
import { addProduct } from "../Redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import "./AddProduct.css";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { clearupdate } from "../Redux/actions/productActions";
import { formAddProduct } from '../Redux/actions/productActions'
// import { formAddProduct } from "../Redux/actions/productActions";



function AddProduct() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [csvfile, setCsvFile] = useState(null);
  const [form, setForm] = useState({})
  const [errors, setErrors] = useState({})


  const addProductInfo = useSelector((state) => state.addProduct);
  const formAddProductInfo = useSelector((state) => state.formAddProduct)
  const { error, loading, serverMsg } = formAddProductInfo
  // const { error, loading, serverMsg } = addProductInfo;

  if (serverMsg) {
    console.log("helloooooowepoew");
  }
  const pop = serverMsg;
  // console.log("hey ther pop " + JSON.stringify(pop));

  const dispatch = useDispatch();

  const changeHandler = (e) => {
    setCsvFile(e.target.files[0]);
  };

  // const formSubmitHandler = (event) => {
  //   event.preventDefault();

  //   console.log(form)
  // }

  const handleOnSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", csvfile);

    dispatch(addProduct(formData));
  };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     dispatch(clearupdate());
  //   }, 5000);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [pop, error]);

  
  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value
    })

    if(!!errors[field])
      setErrors({
        ...errors,
        [field]:null,
      }) 
  }

  const validateForm = () => {
    const {name, price, quantity, category, description, weight} = form
    const newErrors = {}

    if(!name || name === '') newErrors.name = 'Please enter the product name'
    if(!category || category === '') newErrors.category = 'Please enter the product price'
    if(!price || price === '') newErrors.price = 'Please enter the product description'
    if(!quantity || quantity === '') newErrors.quantity = 'Please enter the product location'

    return newErrors
  }

  const formSubmitHandler = (e) => {
    e.preventDefault()

    const formErrors = validateForm()
if(Object.keys(formErrors).length > 0){
  setErrors(formErrors)
    }
    else {
      console.log('form submitted')
      // console.log(`product: ${form}`)
      console.log(form)

      const transformedForm = {
        product: {
          name: form.name,
          quantity: parseInt(form.quantity), // Convert quantity to a number
        },
        product_info: {
          description: form.description,
          price: parseFloat(form.price), // Convert price to a number
          image_url: form.image,
          weight: parseFloat(form.weight), // Convert weight to a number
          category: form.category,
        },
      };

      console.log(transformedForm);
      dispatch(formAddProduct(transformedForm))
      // fetch("http://localhost:8080/product/add",{
      //   method:"POST",
      //   headers:{"Content-Type":"application/json"},
      //   body:JSON.stringify(form)

      // }).then(()=>{
      //   console.log("New Product added")
      // })
    }

    
  }

  return (
    <div>
      <div className="form-side-div">
       <h5>Product Name</h5> 
        <div className="input-div">
          <input
            className="input-field"
            type="text"
            placeholder="Enter Name"
            onChange={(e) =>{
              setField('name', e.target.value)
            }}
            // value={'hellods'}
          />
        </div>
       Product Price
        <div div className="input-div">
          <input
            className="input-field"
            type="text"
            placeholder="Enter Price"
            onChange={(e) =>{
                setField('price', e.target.value)
              }}
            // value={'hellods'}
                          
          />
        </div>
        Product Quantity
        <div div className="input-div">
          <input
            className="input-field"
            type="text"
            placeholder="Enter Quantity"
            // value={'hellods'}
            onChange={(e) =>{
              setField('quantity', e.target.value)
            }}
          />
        </div>
        Product Image
        <div div className="input-div">
          <input
            className="input-field"
            type="text"
            placeholder="Enter image"
            // value={'hellods'}
            onChange={(e) =>{
              setField('image', e.target.value)
            }}
          />
        </div>
        Product Weight
        <div div className="input-div">
          <input
            className="input-field"
            type="text"
            placeholder="Enter Weight"
            // value={'hellods'}
            onChange={(e) =>{
              setField('weight', e.target.value)
            }}
          />
        </div>
        Product Description
        <div div className="input-div">
          <input
            className="input-field"
            type="text"
            placeholder="Enter Description"
            // value={'hellods'}
            onChange={(e) =>{
              setField('description', e.target.value)
            }}
          />
        </div>
        <div className="input-div">
        <Form.Group controlId='item'>
              <Form.Label>Item Type</Form.Label>
              <Form.Select
              value={form.item}
              isInvalid={!!errors.item}
              placeholder='Select category'
              onChange={(e) =>{
                setField('category', e.target.value)
              }}
              >
                <option>Select a category</option>
                <option>Drinks</option>
                <option>Food</option>
                <option>Soap</option>
              </Form.Select>
            </Form.Group>
            </div>
        <div div className="input-div">
          <label class="choose-image-container">
            <input type="file"
            //  onChange={changeHandler} 
             style={{}}
              />
            <span className="choose-file-button"  style={{paddingBottom: '50px'}}>Choose Image</span>
          </label>
        </div>

        <button onClick={formSubmitHandler}>Submit Form</button>
      </div>
      <div className="csv-side-div">
        <div className="message-loader">
          {pop ? (
            <Message variant="success">{pop.msg}</Message>
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            loading && <Loader />
          )}
        </div>
        <div className="div-div">
          <div className="info">CLICK CHOOSE FILE TO ADD CSV FILE</div>

          <label class="choose-file-container">
            <input type="file" onChange={changeHandler} style={{}} />
            <span className="choose-file-button">Choose file</span>
          </label>
          <br />
          {csvfile ? (
            <button
              variant="light"
              className="upload-button"
              style={{ display: "block", marginLeft: "675px" }}
              onClick={handleOnSubmit}
            >
              UPLOAD CSV
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
