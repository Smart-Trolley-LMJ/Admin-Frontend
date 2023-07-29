import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useState, useEffect } from "react";
import { addProduct } from "../Redux/actions/productActions";
import { Link } from "react-router-dom";
import { clearupdate } from '../Redux/actions/productActions';





function AddCsv() {
  const addProductInfo = useSelector((state) => state.addProduct);


  const { error, loading, serverMsg } = addProductInfo;
  const pop = serverMsg;

  const [csvfile, setCsvFile] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearupdate());
      // pop = false
      // setErrors(false)
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [pop, error]);


  const dispatch = useDispatch();



const changeHandler = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", csvfile);

    dispatch(addProduct(formData));
  };

  return (
    <div>
      <div className='pb-2'>
          <Link to='/addproduct' className="btn btn-dark btn-lg p-3">Go back</Link>
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
  )
}

export default AddCsv
