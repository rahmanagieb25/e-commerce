import axios from "axios";
import React, { useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import Slider from "react-slick";

export default function CategoriesSlider() {
  const [isLoading, setIsLoading] = useState(true);
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay: true,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  const [categories, setCategories] = useState([]);
  async function getCategories() {
    let { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/categories`
    );
    // console.log(data)
    setCategories(data.data);
    setIsLoading(false);
  }
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <>
      <div className="container  my-5 px-4 text-center">
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
        <div className="my-5">
          <h2 className="fw-semibold">Shop Popular Categories</h2>
          <Slider {...settings}>
            {categories
              ? categories.map((el, i) => {
                  return (
                    <div key={i}>
                      <img
                        src={el.image}
                        alt={el.name}
                        className="w-100 cursor-pointer"
                        height={200}
                      />
                      <h3 className="h6 mt-2">{el.name}</h3>
                    </div>
                  );
                })
              : ""}
          </Slider>
        </div>
      </div>
    </>
  );
}
