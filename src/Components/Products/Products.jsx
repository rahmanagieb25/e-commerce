import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { DNA } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { wishlistContext } from "../../Context/WishlistContext";
import toast from "react-hot-toast";
// import styles from './Products.module.scss'

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let { addToCart } = useContext(cartContext);
  let {
    getLoggedUserWishList,
    addToWishList,
    deleteFromWishList,
    setNumOfWishListItems,
  } = useContext(wishlistContext);
  const [likedItem, setLikedItem] = useState(null);
  const [likedProducts, setLikedProducts] = useState([]);
  const [wishlist, setWishList] = useState(null);
  function addCart(id) {
    addToCart(id);
  }
  async function getProducts() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products`
    );
    console.log(data);
    setProducts(data.data);
    setIsLoading(false);
  }
  async function getLikedProducts() {
    let { data } = await getLoggedUserWishList();
    setWishList(data.data);
    setLikedProducts(data.data.map((product) => product.id));
  }

  async function addProductToWishList(productId) {
    setLikedItem(productId);
    let { data } = await addToWishList(productId);
    if (data.status === "success") {
      setNumOfWishListItems(data.data.length);
      setLikedItem(null);
      toast.success(data.message);
      setLikedProducts(data.data);
    }
  }
  async function removeProductFromWishList(productId) {
    setLikedItem(productId);
    let { data } = await deleteFromWishList(productId);
    if (data?.status === "success") {
      setNumOfWishListItems(data.data.length);
      setLikedItem(null);
      toast.success("product removed successfully from your wishlist");
      setLikedProducts(data.data);
    }
  }
  useEffect(() => {
    getProducts();
    getLikedProducts();
  }, []);
  return (
    <>
      <Helmet>
        <title>Products Page</title>
      </Helmet>
      <div className="container pt-5">
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

          {products?.map((product, i) => (
            <div key={i} className="col-md-3 h-25 ">
              <div className="card">
                <div className="product py-3 px-2 position-relative px-3 overflow-hidden">
                  {product.id === likedItem ? (
                    <i className="fas fa-spin fa-spinner  position-absolute top-0 text-danger end-0 p-1"></i>
                  ) : (
                    ""
                  )}
                  {likedProducts.includes(product.id) &&
                  product.id !== likedItem ? (
                    <i
                      onClick={() => removeProductFromWishList(product.id)}
                      className="fa-solid fa-heart position-absolute top-0 text-danger end-0 p-1 "
                    >
                      <i cl></i>
                    </i>
                  ) : (
                    ""
                  )}
                  {likedProducts.includes(product.id) === false &&
                  product.id !== likedItem ? (
                    <i
                      onClick={() => addProductToWishList(product.id)}
                      className="fa-solid fa-heart position-absolute top-0  end-0 p-1 "
                    ></i>
                  ) : (
                    ""
                  )}
                  <Link
                    to={`/details/${product.id}`}
                    className="text-decoration-none "
                  >
                    <img
                      src={product.imageCover}
                      alt=""
                      className="w-100 p-2"
                    />
                    <span className="text-main font-sm fw-bold">
                      {product.category.name}
                    </span>
                    <h3 className="h6">
                      {product.slug.split("-").slice(0, 2).join(" ")}
                    </h3>
                    <div className="d-flex justify-content-between">
                      <span className="text-muted">{product.price} EGP</span>
                      <span>
                        <i className="fas fa-star rating-color"></i>
                        {product.ratingsAverage}
                      </span>
                    </div>
                  </Link>
                  {addCart === product._id ? (
                    <button className="btn bg-main text-white w-100 my-2">
                      <i className="fas fa-spinner fa-spin"></i> Adding...{" "}
                    </button>
                  ) : (
                    <button
                      onClick={() => addCart(product._id)}
                      className="btn bg-main text-white w-100 my-2"
                    >
                      Add to Cart +{" "}
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
