import React from 'react'
import { Table} from 'react-bootstrap'
import { tokens } from '../theme'
import { Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux'
import { getProductByName } from '../Redux/actions/productActions'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'


function ProductDetailsPage() {

    // const product = ProductTest
    // console.log(match.params.name)
const { id } = useParams()
console.log(id)

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const dispatch = useDispatch()

    const newproduct = useSelector(state => state.productDetails)
    const {products} = newproduct
console.log("from the store products" + newproduct)

    useEffect(() => {
        dispatch(getProductByName(id))
    }, [dispatch])

    // console.log("this is product" + product)


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
                                    <th>UNIT PRICE</th>
                                    {/* <th>RFID</th> */}
                                </tr>
                            </thead>

                            <tbody>
                                {products.map(product => (
                                    <tr key={product.name}>
                                        <td>{product.product_id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>{product.price}</td>
                                        {/* <td>{product.price}</td>
                                        <td>{product.rfid}</td> */}
                                        <td>
                                            {/* <LinkContainer to={`/products/${product.name}/edit`}>
                                                <Button variant='light' className='btn-sm'>
                                                    
                                                    edit RFID
                                                </Button>
                                                </LinkContainer> */}

                                                
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
