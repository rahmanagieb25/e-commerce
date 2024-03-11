import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { TokenContext } from "../../Context/Token";
import { Helmet } from "react-helmet";
// import styles from './Login.module.scss'

export default function Login() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // let {setToken}=useContext(TokenContext)
  const { setIsLogin } = useContext(TokenContext);
  // let[isLogin,setIsLogin]=useState(null)
  let navigate = useNavigate();
  async function callLogin(reqBody) {
    setErrorMessage("");
    setIsLoading(true);
    let { data } = await axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, reqBody)
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(err.response.data.message);
      });
    console.log(data);
    if (data.message === "success") {
      navigate("/home");
      localStorage.setItem("userToken", data.token);
      // setToken(data.token)
      setIsLogin(data.token);
    }
  }
  const validationSchema = Yup.object({
    email: Yup.string().email("email nomt valid").required("email is required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "invalid password")
      .required("password is required"),
  });

  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: callLogin,
  });
  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <div className="w-50 mx-auto my-5">
        <h2 className="mb-3">Login Now:</h2>
        {errorMessage ? (
          <div className="alert alert-danger"> {errorMessage}</div>
        ) : null}
        <form onSubmit={loginForm.handleSubmit}>
          <div className="form-group mb-2">
            <label htmlFor="Email" className="mb-1">
              Email:
            </label>
            <input
              type="email"
              name="email"
              id="Email"
              value={loginForm.values.email}
              onChange={loginForm.handleChange}
              className="form-control"
              onBlur={loginForm.handleBlur}
            />
            {loginForm.errors.email && loginForm.touched.email ? (
              <div className="alert alert-danger">
                {""}
                {loginForm.errors.email}
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
              value={loginForm.values.password}
              onChange={loginForm.handleChange}
              className="form-control"
              onBlur={loginForm.handleBlur}
            />
            {loginForm.errors.password && loginForm.touched.password ? (
              <div className="alert alert-danger">
                {""}
                {loginForm.errors.password}
              </div>
            ) : null}
          </div>
          <div className="d-flex">
            <Link
              className="text-main fw-bold text-decoration-none"
              to="/forget-password"
            >
              Forget your password ?
            </Link>
            <button className="btn bg-main d-block ms-auto text-white">
              {isLoading ? <i className="fa fa-spinner fa-spin"></i> : "login"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
