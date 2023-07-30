import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/loginComponents/FormContainer";
import Header from "../components/Header";
import { login } from "../Redux/actions/userActions";
import Dashboard from "../scenes/dashboard";
import Message from "../components/Message";
import Loader from "../components/Loader";
import smart_trolley_image from "../images/smart_trolley.jpg"
import './LoginPage.css'
import { clearupdate } from "../Redux/actions/productActions";
import { Navbar, Nav, Container } from 'react-bootstrap'


function LoginPage({ location, history, handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState('')

  const dispatch = useDispatch();

  // const redirect = location.search ? location.search.split('=')[1] : '/'

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading, userInfo, serverMsg } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    // dispatch(login(email, password))
    // if (username === 'admin' && password === 'password') {
    //     handleLogin();
    // } else {
    //     setError('Invalid username or password');
    // }
  };

  // const pop = serverMsg;


  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     dispatch(clearupdate());
  //   }, 50);

  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, [pop, error]);

  return (
    <div>
    {/* <div className="loginBackground"> */}
    
      {/* <Header style={{position:'fixed'}}/> */}
      <>
            <div className='nav-homepage'>
                <Container>
                    <div className='divy'>
                  
                           <div className='name-shop'>
                            SMART TROLLEY SHOP 
                            </div>
                                {/* </Navbar.Brand> */}
                    


                         


                      
                    </div>
                </Container>
            </div>
        </>
      <div >
<section className='hero'>
      <img src={smart_trolley_image}></img>
      <FormContainer>
        <h1 style={{ marginTop: "-260px", marginLeft: "205px", color: 'white', fontSize:'40px' }}>Sign In</h1>
        <div className="container"
          style={{
            position: "relative",
            marginBottom: "0px",
            marginTop: "0px",
            height: "80px",
          }}
        >
          {error && <Message variant="danger">{error}</Message>}
          <div style={{position: 'absolute', marginTop: '-175px', marginLeft: '45px'}}>
          {loading && <Loader />}
          </div>
        </div>
        <Form
          onSubmit={submitHandler}
          style={{ position: "", width: "540px" }}
        >
          <div className="formbutton">
            <h5 style={{height:'91px', marginLeft:'-115px', top:'-113px', position:'absolute', color: 'white'}}>USERNAME</h5>
            <h5 style={{height:'91px', marginLeft:'-115px', top:'-66px', position:'absolute', color: 'white'}}>PASSWORD</h5>

          <div>
          <Form.Group controlId="username" style={{width:'450px'}}>
            {/* <Form.Label>Username</Form.Label> */}
            <Form.Control
              type="username"
              placeholder="Enter Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password" className="form2">
            {/* <Form.Label>Password</Form.Label> */}
            <Form.Control
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          </div>

          <Button type="submit" variant="dark" className="mt-3" style={{height:'91px', marginLeft:'450px', top:'-140px', position:'absolute'}}>
            Sign In
          </Button>
          </div>
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
    {/* </div> */}
    </section></div>
    </div>
  );
}

export default LoginPage;
