import React, { useEffect } from "react";
import { Form} from "react-bootstrap";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./AddProduct.css";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { clearupdate } from "../Redux/actions/productActions";
import { formAddProduct } from "../Redux/actions/productActions";
import axios from "axios";
import { LinkContainer } from "react-router-bootstrap";


function AddProduct() {

  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);
  const [imageCloud, setImageCloud] = useState("");

  const formAddProductInfo = useSelector((state) => state.formAddProduct);
  const { error, loading, serverMsg } = formAddProductInfo;

  if (serverMsg) {
    console.log("helloooooowepoew");
  }
  const pop = serverMsg;

  const dispatch = useDispatch();



  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearupdate());
    
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [pop, error, dispatch]);
  useEffect(() => {

    if (imageCloud) {
      setForm((prevForm) => ({
        ...prevForm,
        image: imageCloud,
      }));
    }
  }, [imageCloud]);

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (!!errors[field])
      setErrors({
        ...errors,
        [field]: null,
      });
  };

  const validateForm = () => {
    const { name, price, quantity, category, description, weight } = form;
    const newErrors = {};

    if (!name || name === "") newErrors.name = "Please enter the product name";
    if (!category || category === "")
      newErrors.category = "Please enter the product price";
    if (!price || price === "")
      newErrors.price = "Please enter the product description";
    if (!quantity || quantity === "")
      newErrors.quantity = "Please enter the product location";
      if (!description || description === "")
      newErrors.description = "Please enter the product location";
      if (!weight || weight === "")
      newErrors.weight = "Please enter the product location";

    return newErrors;
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      console.log("form submitted");
      // console.log(`product: ${form}`)
      console.log(form);
      console.log(imageCloud);

      const transformedForm = {
        product: {
          name: form.name,
          quantity: parseInt(form.quantity), // Convert quantity to a number
        },
        product_info: {
          description: form.description,
          price: parseFloat(form.price), // Convert price to a number
          image_url: form.image || imageCloud,
          weight: parseFloat(form.weight), // Convert weight to a number
          category: form.category,
        },
      };

      console.log(transformedForm);
      dispatch(formAddProduct(transformedForm));
      // fetch("http://localhost:8080/product/add",{
      //   method:"POST",
      //   headers:{"Content-Type":"application/json"},
      //   body:JSON.stringify(form)

      // }).then(()=>{
      //   console.log("New Product added")
      // })
    }
  };

  const preset_key = "ff2nd3vj";
  const cloud_name = "drvu9dhnp";

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset", preset_key);

    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        formData,
        config
      );

      console.log(data.url);
      setImageCloud(data.url);
      setUploading(false);
    } catch (error) {
      setUploading(false);
    }
  };
  console.log("this is image " + imageCloud);
  return (
    <div>
      <div className="pb-2">
       
      </div> 
     


      <section id="contact" class="contact"><LinkContainer
                              to={`/addproduct`}
                            >
                              <button
                                className="go-back-button"
                               style={{margin:'130px'}}
                              >
                                Go Back
                              </button>
                            </LinkContainer>
      <div class="container" data-aos="fade-up" style={{marginLeft:'420px'}}>

        <div class="section-title">
          <h2>FORM</h2>
          <p>FORM OPTION</p>
        </div>
        <div className="message-loader">
          {pop ? (<div style={{width:'600px'}}>
            <Message variant="success" >
              Form Submitted Successfully!
              </Message>
              </div>
            
          ) : error ? (<div style={{width:'600px'}}><Message variant="danger">{error}</Message></div>
            
          ) 
          : (
            // loading && <Loader />
            <div style={{position:'absolute', top:'-160px', marginLeft:'140px'}}>{loading && <Loader />}</div>

          )
          }
                      

        </div>
       

        <div class="row mt-5">


          <div class="col-lg-8 mt-5 mt-lg-0">

            <form class="php-email-form">
              <div class="row">
                <div class="col-md-6 form-group">
                  <input type="text" name="name" class="form-control" id="name" placeholder="Product Name" isInvalid={!!errors.name} required  onChange={(e) => {
              setField("name", e.target.value);
            }}
            
            />
            {errors.name && <div class="invalid-feedback">{errors.name}</div>}
                </div>
                <div class="col-md-6 form-group mt-3 mt-md-0">
                  <input type="price" class="form-control" name="price" id="price" placeholder="Price" isInvalid={!!errors.price} required  onChange={(e) => {
              setField("price", e.target.value);
            }}/>
                </div>
                <div class="col-md-6 form-group mt-3 mt-md-0">
                  <input type="quantity" class="form-control" name="quantity" id="quantity" placeholder="Quantity" isInvalid={!!errors.quantity} required   onChange={(e) => {
              setField("quantity", e.target.value);
            }}/>
                </div>
                <div class="col-md-6 form-group mt-3 mt-md-0">
                  <input type="weight" class="form-control" name="weight" id="weight" placeholder="Weight" isInvalid={!!errors.weight} required  onChange={(e) => {
              setField("weight", e.target.value);
            }}/>
                </div>
              </div>
              {/* <div class="col-md-6 form-group mt-3 mt-md-0">
                <input type="text" class="form-control" name="subject" id="subject" placeholder="Quantity" required  onChange={(e) => {
              setField("quantity", e.target.value);
            }} />
              </div> */}
              <div class="form-group mt-3">
                <textarea class="form-control" name="message" rows="5" placeholder="Description" isInvalid={!!errors.description} required  onChange={(e) => {
              setField("description", e.target.value);
            }}></textarea>
              </div>
              <div class="my-3">
                <div class="loading">Loading</div>
                <div class="error-message"></div>
                <div class="sent-message">Your message has been sent. Thank you!</div>

              </div>
              <div className="input-div">
                <div style={{display:'flex'}}>
                  <Form.Group controlId="item">
            <Form.Label>Item Type</Form.Label>
            <Form.Select type="submit" style={{width:'130px',height:'30px' }}
              value={form.item}
              isInvalid={!!errors.item}
              placeholder="Select category"
              onChange={(e) => {
                setField("category", e.target.value);
              }}
            >
              <option>Select a category</option>
              <option>Beverages</option>
              <option>Alcoholic Drinks</option>

              <option>Non-Alcoholic Drinks</option>
              <option>Gadgets and Electronics</option>
              <option>Cosmetics</option>
              <option>Health Care</option>
            </Form.Select>
          </Form.Group>

          <div div className="input-div">
          <label class="choose-image-container">
            <input
              type="file"
              //  onChange={changeHandler}
              style={{}}
              onChange={uploadFileHandler}
            />
            {/* {uploading && <Loader />} */}
            <div className="message-product" style={{marginLeft:'-450px'}}>
              {/* {error && <Message variant="danger">{error}</Message>} */}
              {uploading && <Loader />}
              {/* <Loader style={{height:'10px',width:'10px'}}/> */}
            </div>

            <span
              className="choose-file-button"
              style={{ 
               textAlign:'center', whiteSpace: "nowrap" }}
            >
                {/* <Loader /> */}
              Choose Image
            </span>
          </label>
        </div>
          </div>
          
        </div>
              <div class="text-center"><button className="submit-button" onClick={formSubmitHandler}>Submit</button></div>
            </form>

          </div>

        </div>

      </div>
    </section>
    </div>
  );
}

export default AddProduct;
