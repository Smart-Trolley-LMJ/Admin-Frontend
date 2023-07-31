import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import "react-bootstrap";
import { useParams } from "react-router-dom";
import "./ProductDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../Redux/actions/productActions";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { LinkContainer } from "react-router-bootstrap";

const ProductDetails = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, []);

  const { products, error, loading } = useSelector(
    (state) => state.productList
  );

  // useEffect(() => {
  //   dispatch(listProducts());
  // }, []);

  const { id } = useParams();


  
  const filteredItems = products.find(
    (products) => products.product_info_id === id
  );
  console.log("this is filter" + JSON.stringify(filteredItems));
 
  return (
    // <div></div>
    <div>
      {loading ? (
        <div style={{marginLeft: '600px', marginTop:'400px'}}>
        <Loader />
        </div>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : filteredItems ? (
       
        <section id="services" class="services">
            <LinkContainer
                              to={`/products/`}
                            >
                              <button
                                className="go-back-button"
                               
                              >
                                Go Back
                              </button>
                            </LinkContainer>
       <div class="container" data-aos="fade-up">
     
                          
         <div class="section-title">
           <h2>Details</h2>
           <p>{filteredItems.name}</p>
         </div>
              <Card className="bg-secondary">
                <div className="productscreen__left pt-2">
                  <div className="left__image">
                    <img
                      src={filteredItems.image_url}
                      className="left__images"
                      alt={filteredItems.name}
                    />
                  </div>
                  <div className="left__info">
                    <p className="left__name">Name: {filteredItems.name}</p>
                    <p> <div className="right__info">
                    <p>
                      Price:
                      <span>¢{filteredItems.price}</span>
                    </p>
                  </div></p>
                    <p> <div className="right__info">
                    <p>
                      Quantity:
                      <span>{filteredItems.weight}</span>
                    </p>
                  </div></p>
                  <p> <div className="right__info">
                    <p>
                      Category:
                      <span>{filteredItems.category}</span>
                    </p>
                  </div></p>
                  <p> <div className="right__info">
                    <p>
                      Weight:
                      <span>{filteredItems.weight}g</span>
                    </p>
                  </div></p>
                  </div>
                </div>
                {/* <div className="productscreen__right">
                  <div className="description_right__info">
                    <p>
                      Description:
                      <span>{filteredItems.description}</span>
                    </p>
                  </div>
              
                </div> */}
              </Card>
            </div>
          
       
        </section>
      ) : null}
    </div>
  );
};

export default ProductDetails;
