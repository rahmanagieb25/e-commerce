import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { DNA } from "react-loader-spinner";
// import { TokenContext } from "../../Context/Token";
// import { useContext } from "react";
import { jwtDecode } from "jwt-decode";

export default function MyOrder() {
  const [isLoading, setIsLoading] = useState(true);
const { id } = jwtDecode(localStorage.getItem("userToken"));
  // const { userId } = useContext(TokenContext);
  const [orders, setOrders] = useState([]);
  async function getAllOrders(userId) {
    
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      );
      // console.log(data);
      if (data?.length) {
        setOrders(data);
      } else {
        setOrders(null);
      }
    setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllOrders(id);
  });

  return (
    <>
      <Helmet>
        <title>My Orders</title>
      </Helmet>
          <div className="container">
      {isLoading?
        <div className= "w-100 vh-100 d-flex justify-content-center align-items-center text-main fa-3x ">
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
        </div>
      :
        <>
          <div className="d-flex justify-content-center mt-4">
              <div className="heading ">
                <h2 className="text-center border-bottom  pb-3 mb-5">
                  Get Your <span className="text-main ">Orders</span>
                </h2>
              </div>
            </div>
          <div className="row justify-content-between g-3">
            {orders.map((order , idx)=>{
             return(
              <div key={idx} className="row mb-5 border-bottom pb-4">
                 <div className="col-lg-6">
              <p className=" text-capitalize">
                <span className="text-main fw-bolder fs-5">
                  Shipping Address:
                </span>{" "}
                {order.shippingAddress.city}
              </p>
            </div>
            <div className="col-lg-6">
              <p className="text-capitalize">
                <span className="text-main fw-bold fs-5">
                  payment Method:
                </span>{" "}
                {order.shippingAddress.phone}
              </p>
            </div>
            {order.cartItems.map((item)=>{
                return(<>
                  <div className="col-md-6" >
                <div className=" shadow p-2">
                  <div className="row align-items-center">
                    <div className="col-4">
                      <img
                        src={item.product.imageCover}
                        alt={item.product.title}
                        className="w-100"
                      />
                    </div>
                    <div className="col-8">
                      <h2 className="h6 fw-bold mb-3">
                        {item.product.title
                          .split(" ")
                          .splice(0, 2)
                          .join(" ")}
                      </h2>
                      <div className="row justify-content-between align-items-center g-4">
                        <div className="col-6">
                          {" "}
                          <p className="mb-1 p-0">
                            <span className="text-main fw-bold">Brand:</span>{" "}
                            {item.product.brand.name}
                          </p>
                        </div>
                        <div className="col-6">
                          <p className="mb-1 p-0">
                            {item.product.ratingsAverage}
                            <i className="fa-solid fa-star ms-2 rating-color "></i>
                          </p>
                        </div>
                      </div>

                      <p className="mb-1 p-0">
                        <span className="text-main fw-bold">Category:</span>{" "}
                        {item.product.category.name}
                      </p>

                      <div className="row justify-content-between align-items-center g-4">
                        <div className="col-6">
                          {" "}
                          <p className="mb-1 p-0">
                            <span className="text-main fw-bold">Price:</span>{" "}
                            {item.price} EGP
                          </p>
                        </div>
                        <div className="col-6">
                          {" "}
                          <p className="mb-1 p-0">
                            <span className="text-main fw-bold">
                              Quantity:
                            </span>{" "}
                            {item.count}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
                  </>)
              })}
              </div>
           ) })}
          </div>
        </>
      
      }
    </div>
    </>
  );
}
