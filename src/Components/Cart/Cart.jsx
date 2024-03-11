import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { cartContext } from "../../Context/CartContext";
import { Link } from "react-router-dom";
import { DNA } from "react-loader-spinner";

export default function Cart() {

const {GetUserCart,numOfCartItems,RemoveSpecificItem,setNumOfCartItems,UpdateQty,ClearCart,isLoading,setIsLoading} = useContext(cartContext)
  const [cartData,setCartData] = useState(null);


 async function GetDataCart () {
  const data = await  GetUserCart();
  if(data?.status === 'success') {
    setCartData(data);
    if(data.numOfCartItems === 0) {
setCartData(null);
setNumOfCartItems(0);
    }
   
    setIsLoading(false)
  }else {
    setCartData(null)
  }
}


  useEffect(()=>{
    if(numOfCartItems){
      setIsLoading(true);
    }
   GetDataCart() ;
  },[])

  async function RemoveItem (id) {
const data = await RemoveSpecificItem(id);
if(data.status === "success") {
  setCartData(data)
setNumOfCartItems(data.numOfCartItems);
if(data.numOfCartItems == 0) {
  setCartData(null);
  setNumOfCartItems(0)
}
}
  }


  async function UpdateQuantity(id,count) {
    const data = await UpdateQty(id,count);
    if(data.status === "success") {
      setCartData(data)
    setNumOfCartItems(data.numOfCartItems);
    }
    if(count === 0 ) {
      RemoveItem(id);
    }
  }

  async function ClearedCartData() {
    const data = await ClearCart();
  
      setCartData(null);
      setNumOfCartItems(0)
    
  }


  return (
    <>
    
 <Helmet>
        <title>Cart Shopping</title>
      </Helmet>
<div className="container py-2">

    { isLoading? <div className= "w-100 vh-100 d-flex justify-content-center align-items-center text-main fa-3x ">
        <div>
          <DNA
            height="80"
            width="200"
            radius="9"
            color="#0aad0a"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
        </div>
      </div> :  cartData ? 
      <>
      <div className="d-flex justify-content-center mt-4">
              <div className="heading ">
                <h2 className="text-center border-bottom  pb-3 mb-5">
                  Get Your <span className="text-main ">Cart</span>
                </h2>
              </div>
            </div>
      <section className="   bg-main-light py-4 rounded-2 px-2 ">
      <div className="summary d-flex justify-content-between align-items-center py-3">
      <p className='fs-3 fw-bold m-0'>Total Price : <span className='text-main'>{cartData?.data?.totalCartPrice}</span></p>
      <button
                      className="btn btn-danger"
                      onClick={ClearedCartData}
                    >
                      Clear All
                    </button>      </div>
     {cartData?.data?.products.map((prod)=>   {
     return (
                <div
                  className="row py-3 align-items-center border-bottom g-4"
                  key={prod.product._id}
                >
                  <div className="col-md-9">
                    <div className="row align-items-center">
                      <div className="col-2">
                        <img
                          src={prod.product.imageCover}
                          alt="cart-product"
                          className="w-100 object-fit-cover"
                        />
                      </div>
                      <div className="col-10">
                        <p className="fw-bold">
                          {prod.product.title.split(" ").slice(0, 2).join(" ")}
                        </p>
                        <p className="text-main fw-bold">
                          Price : {prod.price} EGP
                        </p>
                        <button
                          className="btn btn-outline-danger "
                          onClick={() => RemoveItem(prod.product._id)}
                        >
                          <i className="fa-solid fa-trash fa-lg"></i> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 d-flex  justify-content-end align-items-center">
                    <button
                      className="btn btn-outline-danger"
                      onClick={() =>
                        UpdateQuantity(prod.product._id, prod.count + 1)
                      }
                    >
                      +
                    </button>
                    <span className="mx-2">{prod.count}</span>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() =>
                        UpdateQuantity(prod.product._id, prod.count - 1)
                      }
                    >
                      -
                    </button>
                  </div>
                </div>
              );}


 

)}
 <Link to='/checkout' className='btn btn-success mt-4 w-75 mx-auto p-2 fs-4 fw-bold d-block '>Checkout</Link>
 </section>
 </>
    
    : <div className="d-flex justify-content-center align-items-center  p-5">
    <div className="text-center not-availbale ">
      <h2>
        {" "}
        Cart is <span className="text-main">empty</span>{" "}
      </h2>
      <div className="d-flex flex-column">
      <i className="fa-solid fa-ban fa-5x text-main"></i>
      <button className="bg-main border-0 rounded mt-4"><Link className="text-white text-decoration-none" to={"/home"}>Continue Shopping</Link></button>
    </div></div>
  </div> }
      </div>
    </>
  ); 
}
