import React, { useContext, useEffect, useState } from "react";
import { wishlistContext } from "../../Context/WishlistContext";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { DNA } from "react-loader-spinner";
import { Helmet } from "react-helmet";

export default function Wishlist() {
  const [wishList, setWishList] = useState(null);
  const [likedItem, setLikedItem] = useState(null);
  let { getLoggedUserWishList, deleteFromWishList, setNumOfWishListItems } =
    useContext(wishlistContext);
  let { addToCart } = useContext(cartContext);

  async function getWishList() {
    let { data } = await getLoggedUserWishList();
    if (data.status === "success");
    setWishList(data.data);
  }
  function addCart(id) {
    addToCart(id);
  }
  async function removeProductFromWishList(productId) {
    setLikedItem(productId);
    let { data } = await deleteFromWishList(productId);
    if (data?.status === "success") {
      setLikedItem(null);
      setNumOfWishListItems(data.data.length);

      toast.success("product removed successfully from your wishlist");

      setWishList(wishList.filter((product) => product.id !== productId));
    }
  }

  useEffect(() => {
    getWishList();
  });
  return (
    <>
    <Helmet>
                <title>Wishlist Page</title>
            </Helmet>
      {wishList ? (
        wishList.length > 0 ? (
          <div className="mt-3 container">
            <div className="d-flex justify-content-center">
              <div className="heading ">
                <h2 className="text-center border-bottom  pb-3 mb-5">
                  Get Your <span className="text-main ">WishList</span>
                </h2>
              </div>
            </div>

            <div className="row justify-content-center mt-5">
              {wishList.map((product, i) => (
                <div key={i} className="col-md-3 h-25 ">
                  <div className="product py-3 px-2 position-relative px-3 overflow-hidden ">
                    {product.id === likedItem ? (
                      <i className="fas fa-spin fa-spinner  position-absolute top-0 text-danger end-0 p-1"></i>
                    ) : (
                      ""
                    )}
                    {product.id !== likedItem ? (
                      <i
                        onClick={() => removeProductFromWishList(product.id)}
                        className="fa-solid fa-heart position-absolute top-0 text-danger end-0 p-1 "
                      >
                        <i></i>
                      </i>
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
                        {product.title.split(" ").slice(0, 2).join(" ")}
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
              ))}
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-center align-items-center  p-5">
            <div className="text-center not-availbale ">
              <h2>
                {" "}
                WishList is <span className="text-main">empty</span>{" "}
              </h2>
              <i className="fa-solid fa-ban fa-5x text-main"></i>
            </div>
          </div>
        )
      ) : (
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
      )}
    </>
  );
}
