import React, { useEffect } from "react";
import logo192 from "../images/logo192.png";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listTransactions } from "../Redux/actions/productActions";

function CartTransactions() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listTransactions());
  }, []);

  const { transactions, error, loading } = useSelector(
    (state) => state.transactionsList
  );

  console.log("helloo" + transactions);

  return (
    <div>
      <div>
        <section id="transactions" class="transactions">
          <div class="container" data-aos="fade-up">
            <div class="section-title">
              <h2>ITEMS PAID FOR</h2>
              <p>CART TRANSACTIONS</p>
            </div>

            <div class="row">
              <div
                class="col-lg-6 col-md-6 d-flex align-items-stretch mr-2 "
                style={{ marginRight: "20px" }}
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <div class="icon-box">
                  <h4>
                    <a href="">233501338097</a>
                  </h4>
                  <div class="left-right-box">
                    <div class="left-box">
                      <h5>Mobile Number:</h5>
                      <h5>Amount:</h5>
                      <h5>Date Of Transaction:</h5>
                      <h5>User ID:</h5>
                    </div>
                    <div class="right-box" style={{lineHeight:'4.5'}}>
                    <h6 style={{lineHeight:'1.5'}}>233501338097</h6>
                      <h6 style={{lineHeight:'1.5'}}>50</h6>
                      <h6 style={{lineHeight:'1.5'}}>2023-07-25T20:00:52.080409</h6>
                      <h6 style={{lineHeight:'1.5'}}>10142f02-578a-44ac-bbbb-2d45616a59fe</h6>
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="col-lg-6 col-md-6 d-flex align-items-stretch mt-4 mt-md-0"
                data-aos="zoom-in"
                data-aos-delay="200"
              >
                <div class="icon-box">
                  <h4>
                    <a href="">3829928332</a>
                  </h4>
                  <p>
                    Choose this to upload a CSV file containing details of
                    products
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default CartTransactions;
