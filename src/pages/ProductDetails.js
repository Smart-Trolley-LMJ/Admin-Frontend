import React from 'react'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './ProductDetails.css'




const ProductDetails = () => {
  const { id } = useParams()

  const { products, error, loading } = useSelector(
    (state) => state.productList
  );

  // useEffect(() => {
  //   dispatch(listProducts());
  // }, []);
  const filteredItems = products.find((products) => products.product_info_id
  === id)
  console.log('this is filter' + JSON.stringify(filteredItems))

console.log(filteredItems.name)
  return (
    <div>
         <div className="productscreen">
      
      <h2 className="productscreen ">Product Details</h2>
      <div className="productscreen">
       
        <div className='pt-20'>
        <div className='pb-4'>
          <Link to='/' className="btn btn-secondary btn-lg">Go back</Link>
        </div>
        <Card className='bg-secondary'>
        <div className="productscreen__left pt-2">
        <div className="left__image">
              <img src={filteredItems.image_url} className="left__images" alt={filteredItems.name} />
             </div>
             <div className="left__info">
               <p className="left__name">{filteredItems.name}</p>
               <p>Price: ¢{filteredItems.price}</p>
               <p>Description: {filteredItems.description}</p>
             </div>
           </div>
           <div className="productscreen__right">
             <div className="right__info">
               <p>
                 Price:
                 <span>¢{filteredItems.price}</span>
               </p>
             </div>
             <div className="right__info">
               <p>
                 Location:
                 <span>{filteredItems.weight}</span>
               </p>
             </div>
           </div>
           </Card>
         </div>
         </div>
         </div>    </div>
    )}

    export default ProductDetails