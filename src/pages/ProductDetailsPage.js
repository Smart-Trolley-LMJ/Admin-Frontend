import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Card } from 'react-bootstrap'
import ProductTest from '../ProductTest'
import { tokens } from '../theme'
import { Typography, Box, useTheme } from "@mui/material";

function ProductDetailsPage() {

    const product = ProductTest

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);



  return (

    <div> 
        <Typography
    variant="h2"
    color={colors.grey[100]}
    fontWeight="bold"
    sx={{ m: "0 0 5px 0" }}
  >
    Products Edit
  </Typography>
    <div>
      
      <Table striped bordered hover responsive className='table-sm text-success' >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    {/* <th>PHOTO</th> */}
                                    <th>CATEGORY</th>
                                    <th>ITEMS IN STOCK</th>
                                    <th>UNIT PRICE</th>
                                    <th>RFID</th>
                                </tr>
                            </thead>

                            <tbody>
                                {product.map(product => (
                                    <tr key={product.name}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>{product.itemsInStock}</td>
                                        <td>{product.unitPrice}</td>
                                        <td>{product.rfid}</td>
                                        <td>
                                            <LinkContainer to={`/products/${product.name}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    {/* <i className='fas fa-edit'></i> */}
                                                    edit RFID
                                                </Button>
                                                </LinkContainer>
{/* 
                                            <Button variant='danger' className='btn-sm' onClick={() => deleteHandler(user._id)}>
                                                <i className='fas fa-trash'></i>
                                            </Button> */}
                                        </td>

                                        

                                        {/* <td>{user.isAdmin ? (
                                            <i className='fas fa-check' style={{ color: 'green' }}></i>
                                        ) : (
                                                <i className='fas fa-check' style={{ color: 'red' }}></i>
                                            )}</td> */}

                                        
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
    </div>
    </div>
  )
}

export default ProductDetailsPage
