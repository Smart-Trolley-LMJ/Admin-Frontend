import React, { useEffect, useState  } from "react";
import logo192 from "../images/logo192.png";
import { Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listTransactions } from "../Redux/actions/productActions";
import { Typography, Box, useTheme, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { tokens } from "../theme";
import Message from "../components/Message";
import Loader from "../components/Loader";







function CartTransactions() {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  const [filterText, setFilterText] = useState("");




  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listTransactions());
  }, []);

  const { transactions, error, loading } = useSelector(
    (state) => state.transactionsList
  );

  console.log("helloo" + transactions);


  const filteredItems = transactions
    ? transactions.filter(
        (product) =>
          product.mobile_number
            .toString()
            .toLowerCase()
            .includes(filterText.toLowerCase()) ||
          product.date_created
            .toString()
            .toLowerCase()
            .includes(filterText.toLowerCase())
      )
    : false;

  const handlesearch = (e) => setFilterText(e.target.value);

  const itemsToDisplay = filterText ? filteredItems : transactions;

  return (
    <div>
        <Box
          display="flex"
          backgroundColor={colors.primary[400]}
          borderRadius="3px"
          style={{ width: "300px", border: "1px solid #ccc" }}
        >
          <InputBase
            sx={{ ml: 2, flex: 1 }}
            placeholder="Search"
            onChange={handlesearch}
          />
          <IconButton type="button" sx={{ p: 1 }} style={{marginRight:'10px'}}>
            <SearchIcon style={{marginLeft:'10px'}}/>
          </IconButton>
        </Box>
      <div>
        <section id="transactions" class="transactions">
          <div class="container" data-aos="fade-up">
            <div class="section-title">
              <h2>ITEMS PAID FOR</h2>
              <p>CART TRANSACTIONS</p>
            </div>
            <div className="message-product">
              {error && <Message variant="danger">{error}</Message>}
              {loading && <Loader />}
            </div>
            {transactions && !loading && !filteredItems.length && (
              <div>
                There are no items to display adjust your filter criteria
              </div>
            )}
{error ? (<Message variant="danger">{error}</Message>) : (
  itemsToDisplay.map((product) =>
            <div class="row">
              <div
                class="col-lg-6 col-md-6 d-flex align-items-stretch mr-2 "
                style={{ marginRight: "20px" }}
                data-aos="zoom-in"
                data-aos-delay="100"
              >
                <div class="icon-box">
                  <h4>
                    <a style={{textDecoration:'none'}} href="">{product.mobile_number}</a>
                  </h4>
                  <div class="left-right-box">
                    <div class="left-box">
                      <h5>Mobile Number:</h5>
                      <h5>Amount:</h5>
                      <h5>Date Of Transaction:</h5>
                      <h5>User ID:</h5>
                    </div>
                    <div class="right-box" style={{lineHeight:'4.5'}}>
                    <h6 style={{lineHeight:'1.5'}}>+{product.mobile_number}</h6>
                      <h6 style={{lineHeight:'1.5'}}>{product.amount}¢</h6>
                      <h6 style={{lineHeight:'1.5'}}>{product.date_created}</h6>
                      <h6 style={{lineHeight:'1.5'}}>{product.user_id}</h6>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div
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
              </div> */
              }
            </div>
))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default CartTransactions;
