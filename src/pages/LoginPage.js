import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
// import Loader from '../components/Loader'
// import Message from '../components/Message'
import FormContainer from '../components/loginComponents/FormContainer'
// import { login } from '../actions/userActions'
import Header from '../components/Header'
import { login } from '../Redux/actions/userActions'
import Dashboard from '../scenes/dashboard'

function LoginPage({ location, history, handleLogin }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [error, setError] = useState('')

    const dispatch = useDispatch()

    // const redirect = location.search ? location.search.split('=')[1] : '/'
    
    const userLogin = useSelector(state => state.userLogin)
    const { loading, userInfo } = userLogin


    useEffect(() => {
        if (userInfo) {
            history.push('/products')
        }
    }, [history, userInfo])

    // const dispatch = useDispatch()

    // const redirect = location.search ? location.search.split('=')[1] : '/'

    // const userLogin = useSelector(state => state.userLogin)
    // const { error, loading, userInfo } = userLogin

    // useEffect(() => {
    //     if (userInfo) {
    //         history.push(redirect)
    //     }
    // }, [history, userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
        // dispatch(login(email, password))
        // if (username === 'admin' && password === 'password') {
        //     handleLogin();
        // } else {
        //     setError('Invalid username or password');
        // }




    }

    return (
        <div>
            <Header />
        <FormContainer>
            <h1 style={{ marginTop: '30px'}}>Sign In</h1>
            {/* {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />} */}
            <Form onSubmit={submitHandler}>

                <Form.Group controlId='username'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        type='username'
                        placeholder='Enter Username'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>


                <Form.Group controlId='password' className='mt-3'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary' className='mt-3'>
                    Sign In
                </Button>
                {/* {error && <p>{error}</p>} */}
            </Form>

            {/* <Row className='py-3'>
                <Col>
                    New Customer? <Link
                        to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        Register
                        </Link>
                </Col>
            </Row> */}

        </FormContainer>
        </div>
    )
}

export default LoginPage
