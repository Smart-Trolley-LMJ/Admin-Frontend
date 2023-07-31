import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useState, useEffect } from "react";
import { addProduct } from "../Redux/actions/productActions";
import { Link } from "react-router-dom";
import { clearupdate } from '../Redux/actions/productActions';
import { LinkContainer } from 'react-router-bootstrap';
import csvformat from '../images/csvformat.png'





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
       <section id="services" class="services"><LinkContainer
                              to={`/addproduct`}
                            >
                              <button
                                className="go-back-button"
                               style={{marginTop:'0px'}}
                              >
                                Go Back
                              </button>
                            </LinkContainer>
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>ADD A CSV</h2>
          <p>CSV OPTION</p>
        </div>
</div>
      <div className="csv-side-div">
        <div className='csv-look'>Expected Format For CSV</div>
        <div style={{justifyContent:"center", display:'flex'}}>  <img src={csvformat} alt=''></img></div>
      
        <div style={{marginTop:'0px'}}
></div>
        <div className="message-loader">
          {pop ? (<div style={{ display:'flex', justifyContent:'center', marginTop:'40px', position:'absolute', left: '50%', transform: 'translateX(-50%)'}}>
            <Message variant="success">
              {pop.msg}
            </Message></div>
          ) : error ? (<div style={{ display:'flex', justifyContent:'center',  marginTop:'40px', position:'absolute', left: '50%', transform: 'translateX(-50%)' }}>
          
            <Message variant="danger">
              {error}
              {/* hello eiie djsjdne */}
              
              </Message>
            </div> ) : (
          //  <div style={{marginLeft:'800px', zIndex:'0'}}>
          //   <Loader />
          //   </div>
          null
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
              className="submit-button"
              style={{ display: "block", marginLeft: "625px" }}
              onClick={handleOnSubmit}
            >
              UPLOAD CSV
            </button>
          ) : null}
         <div style={{position:'relative', marginLeft:'500px', top:'-120px'}}> {loading && <Loader />}</div>
        </div>
      </div>
      </section>
    </div>
  )
}

export default AddCsv
