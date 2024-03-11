import axios from "axios";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  async function resetPassword() {
    await axios
      .put(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        formik.values
      )
      .catch((err) => {
        console.log(err.response.data.message);
        setIsLoading(false);
        toast.error(err.response?.data.message);
      });
    setIsLoading(false);
    toast.success("your password is changed successfully");
    navigate("/login");
  }

  const validation = Yup.object({
    email: Yup.string()
      .required("Email is required")
      .matches(
        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
        "Enter valid email"
      ),
    newPassword: Yup.string()
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "invalid password")
      .required("password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: resetPassword,
    validationSchema: validation,
  });
  return (
    <>
      <Helmet>
        <title>Reset New Password</title>
      </Helmet>
      <div className="w-75 m-auto my-5">
        <h1> reset your account password :</h1>
        <form onSubmit={formik.handleSubmit}>
          <label htmlFor="email" className="my-1">
            Email:
          </label>
          <input
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="email"
            className="form-control mb-3"
            id="email"
            name="email"
          />
          {formik.errors.email && formik.touched.email ? (
            <div className="alert alert-danger">{formik.errors.email}</div>
          ) : null}

          <label htmlFor="newPassword" className="my-1">
            New Password:
          </label>
          <input
            value={formik.values.newPassword}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="password"
            className="form-control mb-3"
            id="newPassword"
            name="newPassword"
          />
          {formik.errors.newPassword && formik.touched.newPassword ? (
            <div className="alert alert-danger">
              {formik.errors.newPassword}
            </div>
          ) : null}

          {isLoading ? (
            <button className="btn form-btn ms-auto d-block">
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="30"
                visible={true}
              />
            </button>
          ) : (
            <button
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
              className="btn bg-main text-white ms-auto d-block"
            >
              Confirm
            </button>
          )}
        </form>
      </div>
    </>
  );
}
