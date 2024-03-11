import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { cartContext } from "../../Context/CartContext";
import { wishlistContext } from "../../Context/WishlistContext";
import toast from "react-hot-toast";

export default function FeatureProducts() {
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
  function getProduct() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  let { data, isLoading } = useQuery("FeatureProducts", getProduct);
  useEffect(() => {
    getLikedProducts();
  }, []);
  return (
    <>
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

          {data?.data?.data.map((el,i) => (
            <div key={i} className="col-md-3">
              <div className="card">
                <div className="product py-1 px-3 overflow-hidden">
                  <Link
                    to={`/details/` + el.id}
                    className="text-decoration-none text-black"
                  >
                    <img src={el.imageCover} className="w-100" alt="" />
                    <p className="text-main">{el.category.name}</p>
                    <h5>{el.slug.split("-").slice(0, 2).join(" ")}</h5>
                    <div className="d-flex justify-content-between">
                      <p>{el.price}EGP</p>
                      <p>
                        <i className="fa fa-star rating-color"></i>
                        {el.ratingsAverage}
                      </p>
                    </div>
                  </Link>
                  <div className="d-flex justify-content-between">
                    <button
                      onClick={() => addCart(el.id)}
                      className="btn bg-main text-white"
                    >
                      Add to Cart +
                    </button>
                    {el.id === likedItem ? (
                      <i className="fas fa-spin fa-spinner  position-absolute top-0 text-danger end-0 p-1"></i>
                    ) : (
                      ""
                    )}
                    {likedProducts.includes(el.id) && el.id !== likedItem ? (
                      <i
                        onClick={() => removeProductFromWishList(el.id)}
                        className="fa-solid fa-heart position-absolute top-0 text-danger end-0 p-1 "
                      >
                        <i cl></i>
                      </i>
                    ) : (
                      ""
                    )}
                    {likedProducts.includes(el.id) === false &&
                    el.id !== likedItem ? (
                      <i
                        onClick={() => addProductToWishList(el.id)}
                        className="fa-solid fa-heart position-absolute top-0  end-0 p-1 "
                      ></i>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
