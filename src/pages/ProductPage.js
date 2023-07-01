import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Card, Image } from 'react-bootstrap'
import ProductTest from '../ProductTest'
import { tokens } from '../theme'
import { Typography, Box, useTheme, IconButton } from "@mui/material";
import './ProductPage.css'
import cosmetics from '../images/cosmetics.png'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../Redux/actions/productActions'
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";


// import InputBase from '@mui/material'
// import Search



function ProductPage() {

    const product = useSelector(state => state.productList)
    // const product = ProductTest
    const {products} = product
    // const userLogin = useSelector(state => state.userLogin)

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

const dispatch = useDispatch()
// 

useEffect(() => {
    dispatch(listProducts())
}, [])
// console.log('heyyy this is me')

  return (
    <div>
         <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0",  textAlign: "center",marginBottom: '20px' }}
      >
        ALL PRODUCTS IN THE STORE
      </Typography>
 <div>
 <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
        style={{ width: '300px'}}
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>
                        <Table striped bordered hover responsive className='table-sm text-success' >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>PHOTO</th>
                                    <th>CATEGORY</th>
                                    <th>ITEMS IN STOCK</th>
                                    <th>UNIT PRICE</th>
                                    <th></th>
                                </tr>
                            </thead>

                            <tbody>
                                {products.map(products => (

<LinkContainer to={`/products/${products.name}/details`}>

                                    <tr key={products.name}>
                                        <td>{products._id}</td>
                                        <td>{products.name}</td>
                                        {/* <td><Card.Img src={favicon} className="products-image" /></td> */}
                                        {/* <div className="products-image-container"> */}
                                        <td><Image src={cosmetics}  style={{ width: '30px', height: '30px' }} /></td>
                                        {/* </div> */}
                                        
                                        <td>{products.category}</td>
                                        <td>{products.quantity}</td>
                                        <td>{products.price}</td>


                                        {/* <td>{user.isAdmin ? (
                                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                                        ) : (
                                                <i className='fas fa-check' style={{ color: 'red' }}></i>
                                            )}</td> */}

                                        <td>
                                            <LinkContainer to={`/products/${product.name}/edit`}>
                                                <button className='edit-button'>
                                                    {/* <i className='fas fa-edit'></i> */}
                                                    edit
                                                </button>
                                                </LinkContainer>
{/* 
                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                                <i className='fas fa-trash'></i>
                                            </Button> */}
                                        </td>
                                    </tr>
                                    </LinkContainer>

                                ))}
                            </tbody>
                        </Table>
                    
        </div>    </div>
  )
}

export default ProductPage
