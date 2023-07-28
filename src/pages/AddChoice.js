import React from 'react'
import './AddChoice.css'
import '../components/style.css'
import { LinkContainer } from 'react-router-bootstrap';




function AddChoice() {
  return (
    <div>
       <section id="services" class="services">
      <div class="container" data-aos="fade-up">

        <div class="section-title">
          <h2>Add a Product</h2>
          <p>Ways To Add Product</p>
        </div>

        <div class="row">
          <LinkContainer to={'/addproduct/form'} class="mr-8" style={{marginRight:'40px', marginLeft:'40px'}}>
          <div class="col-lg-6 col-md-6 d-flex align-items-stretch mr-2 " style={{marginRight:'20px'}} data-aos="zoom-in" data-aos-delay="100">
            <div class="icon-box">
              <div class="icon"><i class="bx bxl-dribbble"></i></div>
              <h4><a href="">Form</a></h4>
              <p>Choose this if you want to type in the details of a product</p>
            </div>
          </div>
          </LinkContainer>

          <LinkContainer to={'/addproduct/csv'}>

          <div class="col-lg-6 col-md-6 d-flex align-items-stretch mt-4 mt-md-0" data-aos="zoom-in" data-aos-delay="200">
            <div class="icon-box">
              <div class="icon"><i class="bx bx-file"></i></div>
              <h4><a href="">CSV</a></h4>
              <p>Choose this to upload a CSV file containing details of products</p>
            </div>
          </div>
          </LinkContainer>

          </div>
          </div>
          </section>
    </div>
  )
}

export default AddChoice
