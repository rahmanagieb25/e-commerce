import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { DNA } from "react-loader-spinner";

export default function Categories() {
  const [categoties, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  async function getCategories() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    console.log(data);
    setCategories(data.data);
    setIsLoading(false);
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <Helmet>
        <title>Categories Page</title>
      </Helmet>

      <section className=" text-center mt-3">
        <div className="container">
          <h2 className="text-main fw-bolder pb-3">All Categories</h2>
          <div className="row g-4">
            {isLoading ? (
              <div className="w-100 vh-100 d-flex justify-content-center align-items-center text-main fa-3x">
              <DNA
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            </div>
            ) : null}
            {categoties.map((category,i) => (
              <div key={i} className="col-md-4">
                <div className="card">
               <div className="card-img">
               <img
                  src={category.image}
                  className="cat img-fluid w-100"
                  alt=""
                />
               </div>
                <div className="card-body"><p>{category.name}</p></div>
               </div>
                
               
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
