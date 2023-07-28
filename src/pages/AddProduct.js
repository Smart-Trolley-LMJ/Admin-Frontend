import React, { useEffect } from "react";
import FormContainer from "../components/loginComponents/FormContainer";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useState } from "react";
import Papa from "papaparse";
import { useDispatch, useSelector } from "react-redux";
import "./AddProduct.css";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { clearupdate } from "../Redux/actions/productActions";
import { formAddProduct } from "../Redux/actions/productActions";
import axios from "axios";
import { Link } from "react-router-dom";

function AddProduct() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [csvfile, setCsvFile] = useState(null);
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
  // console.log("hey ther pop " + JSON.stringify(pop));

  const dispatch = useDispatch();

  // const formSubmitHandler = (event) => {
  //   event.preventDefault();

  //   console.log(form)
  // }

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearupdate());
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [pop, error]);
  useEffect(() => {
    // This useEffect runs whenever imageCloud changes.
    // Check if imageCloud is not empty and update form.image
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
        <Link to="/addproduct" className="btn btn-dark btn-lg p-3">
          Go back
        </Link>
      </div>
      <div className="form-side-div">
        <h5>Product Name</h5>
        <div className="input-div">
          <input
            className="input-field"
            type="text"
            placeholder="Enter Name"
            onChange={(e) => {
              setField("name", e.target.value);
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
            onChange={(e) => {
              setField("price", e.target.value);
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
            onChange={(e) => {
              setField("quantity", e.target.value);
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
            onChange={(e) => {
              setField("weight", e.target.value);
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
            onChange={(e) => {
              setField("description", e.target.value);
            }}
          />
        </div>
        <div className="input-div">
          <Form.Group controlId="item">
            <Form.Label>Item Type</Form.Label>
            <Form.Select
              value={form.item}
              isInvalid={!!errors.item}
              placeholder="Select category"
              onChange={(e) => {
                setField("category", e.target.value);
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
            <input
              type="file"
              //  onChange={changeHandler}
              style={{}}
              onChange={uploadFileHandler}
            />
            {uploading && <Loader />}

            <span
              className="choose-file-button"
              style={{ paddingBottom: "50px" }}
            >
              Choose Image
            </span>
          </label>
        </div>
        <button onClick={formSubmitHandler}>Submit Form</button>
      </div>


      <section id="contact" class="contact">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>FORM</h2>
          <p>FORM FILL</p>
        </div>

       

        <div class="row mt-5">


          <div class="col-lg-8 mt-5 mt-lg-0">

            <form action="forms/contact.php" method="post" role="form" class="php-email-form">
              <div class="row">
                <div class="col-md-6 form-group">
                  <input type="text" name="name" class="form-control" id="name" placeholder="Product Name" required  onChange={(e) => {
              setField("name", e.target.value);
            }}/>
                </div>
                <div class="col-md-6 form-group mt-3 mt-md-0">
                  <input type="email" class="form-control" name="email" id="email" placeholder="Price" required  onChange={(e) => {
              setField("price", e.target.value);
            }}/>
                </div>
                <div class="col-md-6 form-group mt-3 mt-md-0">
                  <input type="email" class="form-control" name="email" id="email" placeholder="Quantity" required   onChange={(e) => {
              setField("quantity", e.target.value);
            }}/>
                </div>
                <div class="col-md-6 form-group mt-3 mt-md-0">
                  <input type="email" class="form-control" name="email" id="email" placeholder="Weight" required  onChange={(e) => {
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
                <textarea class="form-control" name="message" rows="5" placeholder="Description" required  onChange={(e) => {
              setField("description", e.target.value);
            }}></textarea>
              </div>
              <div class="my-3">
                <div class="loading">Loading</div>
                <div class="error-message"></div>
                <div class="sent-message">Your message has been sent. Thank you!</div>
              </div>
              <div class="text-center"><button type="submit" onClick={formSubmitHandler}>Send Message</button></div>
            </form>

          </div>

        </div>

      </div>
    </section>
    </div>
  );
}

export default AddProduct;
