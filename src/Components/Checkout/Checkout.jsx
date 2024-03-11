import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { cartContext } from "../../Context/CartContext";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as Yup from "yup";

// import styles from './Checkout.module.scss'

export default function Checkout() {
  let headers = { token: localStorage.getItem("userToken") };
  const { cartId, setNumOfCartItems } = useContext(cartContext);
  const [isOnlinePayment, setIsOnlinePayment] = useState(false);
  const navigate = useNavigate();
  const validationSchema = Yup.object({
    details: Yup.string()
      .required("Details is required"),
       phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "invalid phone")
      .required("phone is required"),
      city: Yup.string()
      .required("City is required"),
    
   
  });
  const cashForm = useFormik({
    initialValues: {
      details: "",
      phone: "",
      city: "",
    },
    onSubmit: (values) => handlePayment(values),
    validationSchema,
  });
  async function handlePayment(shippingAddress) {
    console.log(shippingAddress, cartId);
    const endPoint = isOnlinePayment
      ? `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`
      : `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;
    try {
      const { data } = await axios.post(
        endPoint,
        { shippingAddress },
        { headers }
      );
      if (data.status === "success") {
        toast.success("Order placed Successfully");
        setNumOfCartItems(0);
        if (isOnlinePayment) {
          window.location.href = data.session.url;
        } else {
          setTimeout(() => {
            navigate("/allorders");
          }, 3000);
        }
        console.log(data);
      } else {
        toast.error("Ops something wrong");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (<>
    <Helmet>
        <title>Checkout Page</title>
      </Helmet>
    <section className="py-5">
      <div className="container">
        <h2>Checkout</h2>
        <form onSubmit={cashForm.handleSubmit}>
          <div className="form-group mb-2">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              name="phone"
              id="phone"
              className="form-control"
              value={cashForm.values.phone}
              onChange={cashForm.handleChange}
              onBlur={cashForm.handleBlur}
            />
             {cashForm.errors.phone &&
            cashForm.touched.phone ? (
              <div className="alert alert-danger">
                {""}
                {cashForm.errors.phone}
              </div>
            ) : null}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="city">City:</label>
            <input
              type="name"
              name="city"
              id="city"
              className="form-control"
              value={cashForm.values.city}
              onChange={cashForm.handleChange}
              onBlur={cashForm.handleBlur}
            />
             {cashForm.errors.city &&
            cashForm.touched.city ? (
              <div className="alert alert-danger">
                {""}
                {cashForm.errors.city}
              </div>
            ) : null}
          </div>

          <div className="form-group mb-2">
            <label htmlFor="details">Details:</label>
            <textarea
              name="details"
              id="details"
              cols="30"
              rows="3"
              className="form-control"
              value={cashForm.values.details}
              onChange={cashForm.handleChange}
              onBlur={cashForm.handleBlur}
            ></textarea>
            {cashForm.errors.details &&
            cashForm.touched.details ? (
              <div className="alert alert-danger">
                {""}
                {cashForm.errors.details}
              </div>
            ) : null}
          </div>
          <div className="d-flex align-items-center">
            <input
              type="checkbox"
              className="form-check-input"
              onChange={() => setIsOnlinePayment(!isOnlinePayment)}
            />
            Is online
            {isOnlinePayment ? (
              <button className="btn btn-success bg-main ms-3">
                Online Payment
              </button>
            ) : (
              <button className="btn btn-success bg-main ms-3" disabled ={!(cashForm.isValid && cashForm.dirty)}>
                Cash Payment
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
    </>
  );
}
