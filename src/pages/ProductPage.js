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

// import InputBase from '@mui/material'
// import Search

function ProductPage() {
  
  const {
     products,
      error, loading } = useSelector(
    (state) => state.productList
  );
  // const products = ProductTest
  const [edit, setEdit] = useState(true);
  const [filterText, setFilterText] = useState("");

  // const userLogin = useSelector(state => state.userLogin)

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const dispatch = useDispatch();
  //

  useEffect(() => {
    dispatch(listProducts());
  }, []);
  // console.log("heyyy this is me " + [product.name]);
  console.log("this is products " + products)

  const [editing, setEditing] = useState({});

  // Function to handle the edit button click
  const editClickHandler = (product) => {
    setEditing((prevState) => ({
      ...prevState,
      [product.name]: true,
    }));
  };

  // Function to handle changes in the input fields
  const handleChange = (e, product) => {
    const { name, value } = e.target;
    setEditing((prevState) => ({
      ...prevState,
      [product.name]: {
        ...prevState[product.name],
        [name]: value,
      },
    }));
  };

  // Function to handle the submit button click
  const handleSubmit = (product) => {
    // dispatch(editProduct(product.name, editing[product.name]));
    setEditing((prevState) => ({
      ...prevState,
      [product.name]: undefined,
    }));
  };

  const filteredItems = 
  products.filter(
    (product) =>
      // product.name.toString().toLowerCase().includes(filterText.toLowerCase()) ||
      product.category.toString().toLowerCase().includes(filterText.toLowerCase()) 
      // ||
      // product.price.toLowerCase().includes(filterText.toLowerCase())
  );

  const handlesearch = (e) => setFilterText(e.target.value);

  const itemsToDisplay = filterText ? filteredItems : products;
  // console.log('okay ' + filteredItems)


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
          <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search"  onChange={handlesearch}/>
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
              <th>PHOTO</th>
              <th>CATEGORY</th>
              <th>ITEMS IN STOCK</th>
              <th>UNIT PRICE</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            <div className="message-product">
              {error && <Message variant='danger'>{error}</Message>}
              {loading && <Loader />}
            </div>
            {!filteredItems.length && (
              <div>
                There are no items to display adjust your filter criteria
              </div>
            )}
            {
            error ? (
              <Message variant="danger">{error}</Message>
            ) : (

              
              itemsToDisplay.map((product) => (
                <tr >
                  <td>
                    {editing[product.name] ? (
                      <input
                        type="text"
                        name="name"
                        value={editing[product.name]?.name || product.name}
                        onChange={(e) => handleChange(e, product)}
                      />
                    ) : (
                      <LinkContainer to={`/products/${product.id}/details`}>
                        <span className="span-caret">{product.name}</span>
                      </LinkContainer>
                    )}
                  </td>
                  <td>
                    {editing[product.name] ? (
                      <input
                        type="text"
                        name="photo"
                        value={editing[product.name]?.photo || product.photo}
                        onChange={(e) => handleChange(e, product)}
                      />
                    ) : (
                      <LinkContainer to={`/products/${product.id}/details`}>
                        <span className="span-caret">{product.photo}</span>
                      </LinkContainer>
                    )}
                  </td>
                  <td>
                    {editing[product.name] ? (
                      <input
                        type="text"
                        name="category"
                        value={
                          editing[product.name]?.category || product.category
                        }
                        onChange={(e) => handleChange(e, product)}
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
                          editing[product.name]?.quantity || product.quantity
                        }
                        onChange={(e) => handleChange(e, product)}
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
                        value={editing[product.name]?.price || product.price}
                        onChange={(e) => handleChange(e, product)}
                      />
                    ) : (
                      <LinkContainer to={`/products/${product.id}/details`}>
                        <span className="span-caret">{product.price}</span>
                      </LinkContainer>
                    )}
                  </td>

                  <td>
                    {editing[product.name] ? (
                      <button
                        className="edit-button"
                        onClick={() => handleSubmit(product)}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="edit-button"
                        onClick={() => editClickHandler(product)}
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )
            }
          </tbody>
        </Table>
      </div>{" "}
    </div>
  );
}

export default ProductPage;
