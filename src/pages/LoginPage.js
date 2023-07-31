import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/loginComponents/FormContainer";
import { login } from "../Redux/actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import smart_trolley_image from "../images/smart_trolley.jpg";
import "./LoginPage.css";
import { Container } from "react-bootstrap";

function LoginPage({ location, history, handleLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState('')

  const dispatch = useDispatch();

  // const redirect = location.search ? location.search.split('=')[1] : '/'

  const userLogin = useSelector((state) => state.userLogin);
  const { error, loading} = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <div style={{ height: "10%" }}>
      <>
        <div className="nav-homepage" style={{ height: "100%" }}>
          <Container>
            <div className="divy">
              <div className="name-shop">SMART TROLLEY SHOP</div>
            </div>
          </Container>
        </div>
      </>
      <div>
        <section className="hero" style={{ height: "100%" }}>
          <img src={smart_trolley_image} alt=''></img>
          <FormContainer>
            <h1
              style={{
                marginTop: "-260px",
                marginLeft: "205px",
                color: "white",
                fontSize: "40px",
              }}
            >
              Sign In
            </h1>
            <div
              className="container"
              style={{
                position: "relative",
                marginBottom: "0px",
                marginTop: "0px",
                height: "80px",
              }}
            >
              {error && <Message variant="danger">{error}</Message>}
              <div
                style={{
                  position: "absolute",
                  marginTop: "-175px",
                  marginLeft: "67px",
                }}
              >
                {loading && <Loader />}
              </div>
            </div>
            <Form
              onSubmit={submitHandler}
              style={{ position: "", width: "540px" }}
            >
              <div className="formbutton">
                <h5
                  style={{
                    height: "91px",
                    marginLeft: "-115px",
                    top: "-113px",
                    position: "absolute",
                    color: "white",
                  }}
                >
                  USERNAME
                </h5>
                <h5
                  style={{
                    height: "91px",
                    marginLeft: "-115px",
                    top: "-66px",
                    position: "absolute",
                    color: "white",
                  }}
                >
                  PASSWORD
                </h5>

                <div>
                  <Form.Group controlId="username" style={{ width: "450px" }}>
                    <Form.Control
                      type="username"
                      placeholder="Enter Username"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId="password" className="form2">
                    <Form.Control
                      type="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </div>

                <Button
                  type="submit"
                  variant="dark"
                  className="mt-3"
                  style={{
                    height: "91px",
                    marginLeft: "450px",
                    top: "-140px",
                    position: "absolute",
                  }}
                >
                  Sign In
                </Button>
              </div>
            </Form>
          </FormContainer>
        </section>
      </div>
    </div>
  );
}

export default LoginPage;
