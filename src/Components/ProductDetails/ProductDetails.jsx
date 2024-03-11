/* eslint-disable react/jsx-no-comment-textnodes */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
// import { useQuery } from 'react-query';
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { cartContext } from "../../Context/CartContext";
import { wishlistContext } from "../../Context/WishlistContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
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
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  let { id } = useParams();
  const [details, setDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  async function getDetails(id) {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/` + id
    );
    setDetails(data.data);
    setIsLoading(false);
  }
  useEffect(() => {
    getDetails(id);
    getLikedProducts();
  });
  return (
    <>
      <div className="container">
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
        ) : (
          <div className="row align-items-center">
            <div className="col-md-4">
              <Slider {...settings}>
                {details.images.map((el,i) => (
                  <img src={details.imageCover}  key={i}className="w-100" alt="" />
                ))}
              </Slider>
            </div>
            <div className="col-md-8 position-relative">
              <h3>{details.title}</h3>
              <p className="text-secondary">{details.description}</p>
              <p>{details.category.name}</p>
              <div className="d-flex justify-content-between">
                <p>{details.price} EGP</p>
                {/* <p>
                  <i className="fa fa-star rating-color"></i>{" "}
                  {details.ratingAverage}
                </p> */}
                 <span>
                        <i className="fas fa-star rating-color"></i>
                        {details.ratingsAverage}
                      </span>
              </div>
              {details.id === likedItem ? (
                    <i className="fas fa-spin fa-spinner  position-absolute top-0 text-danger end-0 p-1"></i>
                  ) : (
                    ""
                  )}
                  {likedProducts.includes(details.id) &&
                  details.id !== likedItem ? (
                    <i
                      onClick={() => removeProductFromWishList(details.id)}
                      className="fa-solid fa-heart position-absolute top-0 text-danger end-0 p-1 "
                    >
                      <i cl></i>
                    </i>
                  ) : (
                    ""
                  )}
                  {likedProducts.includes(details.id) === false &&
                  details.id !== likedItem ? (
                    <i
                      onClick={() => addProductToWishList(details.id)}
                      className="fa-solid fa-heart position-absolute top-0  end-0 p-1 "
                    ></i>
                  ) : (
                    ""
                  )}
              <button
                onClick={() => addCart(details.id)}
                className="btn bg-main text-white w-100"
              >
                Add To Cart +
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
