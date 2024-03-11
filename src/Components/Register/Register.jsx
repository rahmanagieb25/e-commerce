import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
// import styles from './Register.module.scss'

export default function Register() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  async function callRegister(reqBody) {
    setErrorMessage("");
    setIsLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, reqBody)
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(err.response.data.message);
      });
    console.log(data);
    if (data.message === "success") {
      navigate("/Login");
    }
  }
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "name is too short")
      .max(10, "name is too long")
      .required("name is required"),
    email: Yup.string().email("email nomt valid").required("email is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "invalid password")
      .required("password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "password and rePassword should match")
      .required("rePassword is required"),
    phone: Yup.string()
      .matches(/^01[0125][0-9]{8}$/, "invalid phone")
      .required("phone is required"),
  });

  const registerForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: callRegister,
  });
  return (
    <>
      <div className="w-50 mx-auto my-5">
        <h2 className="mb-3">Register Now:</h2>
        {errorMessage ? (
          <div className="alert alert-danger"> {errorMessage}</div>
        ) : null}
        <form onSubmit={registerForm.handleSubmit}>
          <div className="form-group mb-2">
            <label htmlFor="fullName" className="mb-1">
              Full Name:
            </label>
            <input
              type="text"
              name="name"
              id="fullName"
              value={registerForm.values.name}
              onChange={registerForm.handleChange}
              className="form-control"
              onBlur={registerForm.handleBlur}
            />
          </div>
          {registerForm.errors.name && registerForm.touched.name ? (
            <div className="alert alert-danger">
              {""}
              {registerForm.errors.name}
            </div>
          ) : null}
          <div className="form-group mb-2">
            <label htmlFor="Email" className="mb-1">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="Email"
              value={registerForm.values.email}
              onChange={registerForm.handleChange}
              className="form-control"
              onBlur={registerForm.handleBlur}
            />
            {registerForm.errors.email && registerForm.touched.email ? (
              <div className="alert alert-danger">
                {""}
                {registerForm.errors.email}
              </div>
            ) : null}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="password" className="mb-1">
              Password:
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={registerForm.values.password}
              onChange={registerForm.handleChange}
              className="form-control"
              onBlur={registerForm.handleBlur}
            />
            {registerForm.errors.password && registerForm.touched.password ? (
              <div className="alert alert-danger">
                {""}
                {registerForm.errors.password}
              </div>
            ) : null}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="rePassword" className="mb-1">
              Confirm Password:
            </label>
            <input
              type="password"
              name="rePassword"
              id="rePassword"
              value={registerForm.values.rePassword}
              onChange={registerForm.handleChange}
              className="form-control"
              onBlur={registerForm.handleBlur}
            />
            {registerForm.errors.rePassword &&
            registerForm.touched.rePassword ? (
              <div className="alert alert-danger">
                {""}
                {registerForm.errors.rePassword}
              </div>
            ) : null}
          </div>
          <div className="form-group mb-2">
            <label htmlFor="Phone" className="mb-1">
              Phone:
            </label>
            <input
              type="tel"
              name="phone"
              id="Phone"
              value={registerForm.values.phone}
              onChange={registerForm.handleChange}
              className="form-control"
              onBlur={registerForm.handleBlur}
            />
            {registerForm.errors.phone && registerForm.touched.phone ? (
              <div className="alert alert-danger">
                {""}
                {registerForm.errors.phone}
              </div>
            ) : null}
          </div>
          <button className="btn bg-main d-block ms-auto text-white" disabled ={!(registerForm.isValid && registerForm.dirty)}>
            {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "Register"}
          </button>
        </form>
      </div>
    </>
  );
}
