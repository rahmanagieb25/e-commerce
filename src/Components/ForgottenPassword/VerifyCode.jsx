import axios from "axios";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";

import { useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import toast from "react-hot-toast";

export default function VerifyCode() {
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  let validationSchema = Yup.object({
    resetCode: Yup.string()
      .matches(/^\d{6}$/, "code must be 6 digits")
      .required("code is required"),
  });

  async function submitForm(values) {
    setLoading(true);
    const { data } = await axios
      .post(
        "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        values
      )
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data.message);
      });

    if (data?.status === "Success") {
      toast.success(data.status);
      setLoading(false);
      navigate("/reset-password");
    }

    console.log(data);
  }

  let formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    validationSchema,
    onSubmit: submitForm,
  });

  return (
    <div className="container">
      <Helmet>
        <title>Verify Code</title>
      </Helmet>
      <form className="my-5 w-75 mx-auto" onSubmit={formik.handleSubmit}>
        <h3 className="my-3">Verify Code :</h3>

        <input
          placeholder="Enter your code"
          type="text"
          className="form-control mb-3"
          onBlur={formik.handleBlur}
          name="resetCode"
          onChange={formik.handleChange}
          value={formik.values.resetCode}
        />

        {formik.errors.resetCode && formik.touched.resetCode ? (
          <p className="alert alert-danger">{formik.errors.resetCode}</p>
        ) : (
          ""
        )}

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
            Verify Code
          </button>
        )}
      </form>
    </div>
  );
}
