import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { tokens } from "../theme";
import { Box, useTheme, IconButton } from "@mui/material";
import "./ProductPage.css";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../Redux/actions/productActions";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { editProduct } from "../Redux/actions/productActions";
import { useParams } from "react-router-dom";
import axios from "axios";

// import InputBase from '@mui/material'
// import Search

function ProductPage() {
  const { id } = useParams();
  // console.log(id)

  const { products, error, loading } = useSelector(
    (state) => state.productList
  );
  // const products = ProductTest
  const [filterText, setFilterText] = useState("");
  const [form, setForm] = useState({});
  // const [uploading, setUploading] = useState(false);
  const [imageCloud, setImageCloud] = useState("");
  const setUploading = false
  // console.log(JSON.stringify(products))
  // const userLogin = useSelector(state => state.userLogin)

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  //

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);
  // console.log("heyyy this is me " + [product.name]);
  // console.log("this is products " + products)

  const [editing, setEditing] = useState({});

  // Function to handle the edit button click
  const editClickHandler = (product) => {
    setEditing((prevState) => ({
      ...prevState,
      [product.name]: true,
    }));
  };

  // Function to handle changes in the input fields
  // const handleChange = (field, e, product) => {
  //   const { name, value } = e.target;
  //   setEditing((prevState) => ({
  //     ...prevState,
  //     [product.name]: {
  //       ...prevState[product.name],
  //       [name]: value,
  //     },
  //   }));
  //   setForm((prevForm) => ({
  //     ...prevForm,
  //     [product.name]: {
  //       ...prevForm[product.name],
  //       [name]: value,
  //     },
  //     // [product.product_info_id] : product.product_info_id
  //   }));
  // };

  // Function to handle the submit button click
  const handleSaveSubmit = (product) => {
    // dispatch(editProduct(product.name, editing[product.name]));
    setEditing((prevState) => ({
      ...prevState,
      [product.name]: undefined,
    }));

    dispatch(editProduct(form, id));
    console.log("hey there formmmm" + JSON.stringify(form));
    // window.location.reload();
  };

  const filteredItems = products
    ? products.filter(
        (product) =>
          product.name
            .toString()
            .toLowerCase()
            .includes(filterText.toLowerCase()) ||
          product.category
            .toString()
            .toLowerCase()
            .includes(filterText.toLowerCase())
      )
    : false;

  const handlesearch = (e) => setFilterText(e.target.value);

  const itemsToDisplay = filterText ? filteredItems : products;
  // console.log('okay ' + filteredItems)

  const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    // if(!!errors[field])
    //   setErrors({
    //     ...errors,
    //     [field]:null,
    //   })
  };

  useEffect(() => {
    // This useEffect runs whenever imageCloud changes.
    // Check if imageCloud is not empty and update form.image
    if (imageCloud) {
      setForm((prevForm) => ({
        ...prevForm,
        image_url: imageCloud,
      }));
    }
  }, [imageCloud]);

  const preset_key = "ff2nd3vj";
  const cloud_name = "drvu9dhnp";

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    // console.log(file)
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

  return (
    <div className="allproduct-div">
      {/* <ProductDetails name='tripp'/> */}
      {/* <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0", marginLeft: "432px", marginBottom: "20px" }}
      >
        ALL PRODUCTS IN THE STORE
      </Typography> */}
      <div>
        <div style={{ marginLeft: "18px" }}>
          <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="3px"
            style={{ width: "300px", border: "1px solid #ccc" }}
          >
            <InputBase
              sx={{ ml: 2, flex: 1 }}
              placeholder="Search"
              onChange={handlesearch}
            />
            <IconButton
              type="button"
              sx={{ p: 1 }}
              style={{ marginRight: "10px" }}
            >
              <SearchIcon style={{ marginLeft: "10px" }} />
            </IconButton>
          </Box>
        </div>
        {/* <Table
          striped
          bordered
          hover
          responsive
          className="table-sm text-success"
        >
          <thead>
            <tr>
              <th>NAME</th>
              <th>IMAGE</th>
              <th>CATEGORY</th>
              <th>ITEMS IN STOCK</th>
              <th>UNIT PRICE</th>
              <th>WEIGHT</th>

              <th></th>
            </tr>
          </thead>

          <tbody>
            <div className="message-product">
              {loading && <Loader />}
            </div>
            {products && !loading && !filteredItems.length && (
              <div>
                There are no items to display adjust your filter criteria
              </div>
            )}
            {error ? (
              <Message variant="danger">{error}</Message>
            ) : (
              itemsToDisplay.map((product) => (
                <tr>
                  <td>
                   

                    <LinkContainer to={`/products/${product.product_info_id}/details`}>
                      <span className="span-caret">{product.name}</span>
                    </LinkContainer>
                  </td>
                  <td>
                    {editing[product.name] ? (
                    
                      <input type="file"
                       style={{}}
                       onChange={uploadFileHandler}
          
                        />

                    ) : (
                
                      <LinkContainer to={`/products/${product.product_info_id}/details`}>
                        <div className="product-image-container">
                        <img src={`${product.image_url}`} className="product-image"></img>

                        </div>
                       </LinkContainer>

                    )}
                  </td>
                  <td>
                    {editing[product.name] ? (
                      <input
                        type="text"
                        name="category"
                        value={
                          // editing[product.name]?.category || product.category
                          form.category
                        }
                        onChange={(e) => {
                          setField("category", e.target.value);
                        }}

                        
                      />
                    ) : (
                      <LinkContainer to={`/products/${product.product_info_id}/details`}>
                        <span className="span-caret">{product.category}</span>
                      </LinkContainer>
                    )}
                  </td>
                  <td>
                    {editing[product.name] ? (
                      <input
                        type="text"
                        name="quantity"
                        value={
                          form.quantity
                        }

                        onChange={(e) => {
                          setField("quantity", e.target.value);
                        }}
                      />
                    ) : (
                      <LinkContainer to={`/products/${product.product_info_id}/details`}>
                        <span className="span-caret">{product.quantity}</span>
                      </LinkContainer>
                    )}
                  </td>
                  <td>
                    {editing[product.name] ? (
                      <input
                        type="text"
                        name="price"
                        value={
                          form.price
                        }
                        onChange={(e) => {
                          setField("price", e.target.value);
                        }}

                       
                      />
                    ) : (
                      <LinkContainer to={`/products/${product.product_info_id}/details`}>
                        <span className="span-caret">{product.price}</span>
                      </LinkContainer>
                    )}
                  </td>
                  <td>
                    {editing[product.name] ? (
                      <input
                        type="text"
                        name="weight"
                        value={
                          // editing[product.name]?.weight || product.weight
                          form.weight
                        }
                        onChange={(e) => {
                          setField("weight", e.target.value);
                        }}

                        // onChange={(e) =>{
                        //   setField('weight', e.target.value)
                        // }}
                      />
                    ) : (
                      <LinkContainer to={`/products/${product.product_info_id}/details`}>
                        <span className="span-caret">{product.weight}</span>
                      </LinkContainer>
                    )}
                  </td>

                  <td>
                    {editing[product.name] ? (
                      <button
                        className="edit-button"
                        onClick={() => handleSaveSubmit(product)}
                      >
                        Save
                      </button>
                    ) : (
                      <LinkContainer
                        to={`/products/edit/${product.product_info_id}`}
                      >
                        <button
                          className="edit-button"
                          onClick={() => editClickHandler(product)}
                        >
                          Edit
                        </button>
                      </LinkContainer>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table> */}
        <div class="col-12" style={{ marginTop: "20px" }}>
          <div className="message-product">
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
          </div>
          <div class="card top-selling overflow-auto">
            {/* <div class="filter">
                  <a class="icon" href="#" data-bs-toggle="dropdown"><i class="bi bi-three-dots"></i></a>
                  <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                    <li class="dropdown-header text-start">
                      <h6>Filter</h6>
                    </li>

                    <li><a class="dropdown-item" href="#">Today</a></li>
                    <li><a class="dropdown-item" href="#">This Month</a></li>
                    <li><a class="dropdown-item" href="#">This Year</a></li>
                  </ul>
                </div> */}

            <div
              class="card-body pb-0"
              style={{backgroundColor:'#f6f9ff'}}
            >
              <h3 class="card-title">
                Our Products <span>| Today</span>
              </h3>

              <table class="table table-border" striped>
                <thead class="table table-borderless">
                  <tr>
                    <th scope="col">
                      <h5>Image</h5>
                    </th>
                    <th scope="col">
                      <h5>Product</h5>
                    </th>
                    <th scope="col">
                      <h5>Category</h5>
                    </th>
                    <th scope="col">
                      <h5>Quantity</h5>
                    </th>

                    <th scope="col">
                      <h5>Price(¢)</h5>
                    </th>
                    <th scope="col">
                      <h5>Weight(g)</h5>
                    </th>
                    <th scope="col">
                      <h5>Exp Date</h5>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {products && !loading && !filteredItems.length && (
                    <div>
                      There are no items to display adjust your filter criteria
                    </div>
                  )}
                  {error ? (
                    <Message variant="danger">{error}</Message>
                  ) : (
                    itemsToDisplay.map((product) => (
                      <tr>
                        
                        <th scope="row">
                          <div>
                            {" "}
                            {editing[product.name] ? (
                              <input
                                type="file"
                                style={{}}
                                onChange={uploadFileHandler}
                              />
                            ) : (
                              <LinkContainer
                                to={`/products/${product.product_info_id}/details`}
                              >
                                <div className="product-image-container">
                                  <img
                                    src={`${product.image_url}`}
                                    className="product-image" alt=""
                                  ></img>
                                </div>
                              </LinkContainer>
                            )}
                          </div>
                        </th>
                        <td>
                          <span href="#" class="text-primary fw-bold">
                            {" "}
                            <LinkContainer
                              to={`/products/${product.product_info_id}/details`}
                            >
                              <span className="span-caret-name">
                                {product.name}
                              </span>
                            </LinkContainer>
                          </span>
                        </td>

                        <td class="fw-bold">
                          {" "}
                          {editing[product.name] ? (
                            <input
                              type="text"
                              name="category"
                              value={
                                // editing[product.name]?.category || product.category
                                form.category
                              }
                              onChange={(e) => {
                                setField("category", e.target.value);
                              }}

                              // onChange={(e) =>{
                              //   setField('category', e.target.value)
                              // }}
                            />
                          ) : (
                            <LinkContainer
                              to={`/products/${product.product_info_id}/details`}
                            >
                              <span className="span-caret">
                                {product.category}
                              </span>
                            </LinkContainer>
                          )}
                        </td>
                        <td>
                          {" "}
                          {/* {editing[product.name] ? (
                            <input
                              type="text"
                              name="quantity"
                              value={
                                // editing[product.name]?.quantity ||
                                form.quantity
                              }
                              // onChange={(e) => handleChange(e, product)}

                              onChange={(e) => {
                                setField("quantity", e.target.value);
                              }}
                            />
                          ) : (
                            <LinkContainer
                              to={`/products/${product.product_info_id}/details`}
                            >
                              <span className="span-caret">
                                {product.quantity}
                              </span>
                            </LinkContainer>
                          )} */}
                          <span>
                          <LinkContainer
                              to={`/products/${product.product_info_id}/details`}
                            >
                              <span className="span-caret">
                                {product.quantity}
                              </span>
                            </LinkContainer>
                          </span>
                        </td>
                        <td>
                          {editing[product.name] ? (
                            <input
                              type="text"
                              name="price"
                              value={
                                // editing[product.name]?.price || product.price
                                form.price
                              }
                              onChange={(e) => {
                                setField("price", e.target.value);
                              }}

                              // onChange={(e) =>{
                              //   setField('price', e.target.value)
                              // }}
                            />
                          ) : (
                            <LinkContainer
                              to={`/products/${product.product_info_id}/details`}
                            >
                              <span className="span-caret">
                                {product.price}
                              </span>
                            </LinkContainer>
                          )}
                        </td>
                        <td>
                          {" "}
                          {editing[product.name] ? (
                            <input
                              type="text"
                              name="weight"
                              value={
                                // editing[product.name]?.weight || product.weight
                                form.weight
                              }
                              onChange={(e) => {
                                setField("weight", e.target.value);
                              }}

                              // onChange={(e) =>{
                              //   setField('weight', e.target.value)
                              // }}
                            />
                          ) : (
                            <LinkContainer
                              to={`/products/${product.product_info_id}/details`}
                            >
                              <span className="span-caret">
                                {product.weight}
                              </span>
                            </LinkContainer>
                          )}
                        </td>
                        <td>
                          {" "}
                          {editing[product.name] ? (
                            <input
                              type="date"
                              name="date"
                              value={
                                // editing[product.name]?.weight || product.weight
                                form.expiry_date
                              }
                              onChange={(e) => {
                                setField("expiry_date", e.target.value);
                              }}

                              // onChange={(e) =>{
                              //   setField('weight', e.target.value)
                              // }}
                            />
                          ) : (
                            <LinkContainer
                              to={`/products/${product.product_info_id}/details`}
                            >
                              <span className="span-caret">
                                {product.expiry_date}
                              </span>
                            </LinkContainer>
                          )}
                        </td>
                        <td>{ product.quantity === 0 ? (<div style={{color:'green', fontSize:'15px'}}>Out Of stock!</div>) : product.quantity < 2 ? (<div style={{color:'red', fontSize:'15px'}}>Stock Almost Empty</div>) : (<div style={{color:'green', fontSize:'15px'}}>In Stock</div>)}
                          
                        </td>
                        <td>
                          {editing[product.name] ? (
                            <button
                              className="edit-button"
                              onClick={() => handleSaveSubmit(product)}
                            >
                              Save
                            </button>
                          ) : (
                            <LinkContainer
                              to={`/products/edit/${product.product_info_id}`}
                            >
                              <button
                                className="edit-button"
                                onClick={() => editClickHandler(product)}
                              >
                                Edit
                              </button>
                            </LinkContainer>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}

export default ProductPage;
