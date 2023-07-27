import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Card, Image } from "react-bootstrap";
import ProductTest from "../ProductTest";
import { tokens } from "../theme";
import { Typography, Box, useTheme, IconButton } from "@mui/material";
import "./ProductPage.css";
import cosmetics from "../images/cosmetics.png";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../Redux/actions/productActions";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { editProduct } from "../Redux/actions/productActions";
import { useParams } from "react-router-dom";
import axios from 'axios'


// import InputBase from '@mui/material'
// import Search

function ProductPage() {
  const { id } = useParams();
  // console.log(id)

  const { products, error, loading } = useSelector(
    (state) => state.productList
  );
  // const products = ProductTest
  const [edit, setEdit] = useState(true);
  const [filterText, setFilterText] = useState("");
  const [form, setForm] = useState({});
  const [uploading, setUploading] = useState(false)
  const [imageCloud, setImageCloud] = useState('')
// console.log(JSON.stringify(products))
  // const userLogin = useSelector(state => state.userLogin)

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  //

  useEffect(() => {
    dispatch(listProducts());
  }, []);
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
  const handleChange = (field, e, product) => {
    const { name, value } = e.target;
    setEditing((prevState) => ({
      ...prevState,
      [product.name]: {
        ...prevState[product.name],
        [name]: value,
      },
    }));
    setForm((prevForm) => ({
      ...prevForm,
      [product.name]: {
        ...prevForm[product.name],
        [name]: value,
      },
      // [product.product_info_id] : product.product_info_id
    }));
  };

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

  const preset_key = 'ff2nd3vj'
  const cloud_name = 'drvu9dhnp'

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    // console.log(file)
    const formData = new FormData()

    formData.append('file', file)
    formData.append('upload_preset', preset_key)

    setUploading(true)

    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData, config)

console.log(data.url)
        setImageCloud(data.url)
        setUploading(false)

    } catch (error) {
        setUploading(false)
    }
}

  return (
    <div>
      <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0", marginLeft: "432px", marginBottom: "20px" }}
      >
        ALL PRODUCTS IN THE STORE
      </Typography>
      <div>
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
          style={{ width: "300px" }}
        >
          <InputBase
            sx={{ ml: 2, flex: 1 }}
            placeholder="Search"
            onChange={handlesearch}
          />
          <IconButton type="button" sx={{ p: 1 }}>
            <SearchIcon />
          </IconButton>
        </Box>
        <Table
          striped
          bordered
          hover
          responsive
          className="table-sm text-success"
        >
          <thead>
            <tr>
              {/* <th>ID</th> */}
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
              {/* {error && <Message variant="danger">{error}</Message>} */}
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
                    {/* {editing[product.name] ?
                     <input
                      type="text"
                      name="name"
                      value={editing[product.name]?.name || product.name}
                      onChange={(e) => handleChange(e, product)}
                    />
                    null : (
                      <LinkContainer to={`/products/${product.id}/details`}>
                        <span className="span-caret">{product.name}</span>
                      </LinkContainer>
                    )} */}

                    <LinkContainer to={`/products/${product.id}/details`}>
                      <span className="span-caret">{product.name}</span>
                    </LinkContainer>
                  </td>
                  <td>
                    {editing[product.name] ? (
                      // <input
                      //   type="text"
                      //   name="image"
                      //   value={editing[product.name]?.image_url || product.image_url}
                      //   onChange={(e) => handleChange(e, product)}
                      // />
                      <input type="file"
                      //  onChange={changeHandler} 
                       style={{}}
                       onChange={uploadFileHandler}
          
                        />

                    ) : (
                
                      <LinkContainer to={`/products/${product.id}/details`}>
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

                        // onChange={(e) =>{
                        //   setField('category', e.target.value)
                        // }}
                      />
                    ) : (
                      <LinkContainer to={`/products/${product.id}/details`}>
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
                          // editing[product.name]?.quantity ||
                          form.quantity
                        }
                        // onChange={(e) => handleChange(e, product)}

                        onChange={(e) => {
                          setField("quantity", e.target.value);
                        }}
                      />
                    ) : (
                      <LinkContainer to={`/products/${product.id}/details`}>
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
                      <LinkContainer to={`/products/${product.id}/details`}>
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
                      <LinkContainer to={`/products/${product.id}/details`}>
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
        </Table>
      </div>{" "}
    </div>
  );
}

export default ProductPage;
