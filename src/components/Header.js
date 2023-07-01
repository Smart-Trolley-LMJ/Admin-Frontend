import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, Row, NavDropdown, Button } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../Redux/actions/userActions'
import './Header.css'

function Header() {

    const userInfo = localStorage.getItem('userInfo');

    const dispatch = useDispatch()

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <>
            <div className='nav'>
                <Container>
                    <div className='divy'>
                    <LinkContainer to='/'>
                        {/* <Navbar.Brand className='navy fs-80'> */}
                           <div className='name-shop'>
                            SMART TROLLEY SHOP 
                            </div>
                                {/* </Navbar.Brand> */}
                    </LinkContainer>

                            {userInfo ? (
                                            <button className='logout-button' onClick={logoutHandler}>Logout</button>


                            ) : (
                                    null
                                )}


                            {/* {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='Admin' id='adminmenue'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>

                                </NavDropdown>
                            )} */}


                      
                    </div>
                </Container>
            </div>
        </>
    )
}

export default Header
