import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Card, Image } from 'react-bootstrap'
import ProductTest from '../ProductTest'
import { tokens } from '../theme'
import { Typography, Box, useTheme } from "@mui/material";
import './ProductPage.css'
import cosmetics from '../images/cosmetics.png'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../Redux/actions/productActions'



function ProductPage() {

    const product = useSelector(state => state.productList)
    // const product = ProductTest
    const {products} = product
    // const userLogin = useSelector(state => state.userLogin)

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

const dispatch = useDispatch()
// dispatch(listProducts())


// console.log('heyyy this is me')

  return (
    <div>
         <Typography
        variant="h2"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        Products
      </Typography>
 <div>
            
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
                                        <td>{products.itemsInStock}</td>
                                        <td>{products.unitPrice}</td>


                                        {/* <td>{user.isAdmin ? (
                                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                                        ) : (
                                                <i className='fas fa-check' style={{ color: 'red' }}></i>
                                            )}</td> */}

                                        <td>
                                            <LinkContainer to={`/products/${product.name}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    {/* <i className='fas fa-edit'></i> */}
                                                    edit
                                                </Button>
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
