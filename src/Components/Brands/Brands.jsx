import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { DNA } from "react-loader-spinner";
// import styles from './Brands.module.scss'

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  async function getBrands() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/brands`
    );
    console.log(data);
    setBrands(data.data);
    setIsLoading(false);
  }
  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      <Helmet>
        <title>Brands Page</title>
      </Helmet>
      <section className="text-center mt-3">
        <div className="container">
          <h2 className="text-main fw-bold pb-3">All Brands</h2>
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
            {brands.map((brand,i) => (
              <div key={i} className="col-md-3">
                <div className="card">
                  <img src={brand.image} className="img-fluid" alt="" />
                  <p>{brand.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
