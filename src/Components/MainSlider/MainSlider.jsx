import React from 'react'
import Slider from 'react-slick';
import img1 from '../../assets/images/slider-image-1.jpeg'
import img2 from '../../assets/images/slider-image-2.jpeg'
import img3 from '../../assets/images/slider-image-3.jpeg'


export default function MainSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true
  };
  return <>
   <div className="container py-5">
      <div className="row">
        <div className="col-md-8">
<Slider {...settings}>
  <img src={img3}  className='w-100' alt="" />
  <img src={img1}  className='w-100' alt="" />
  <img src={img2}  className='w-100' alt="" />
</Slider>
        </div>
        <div className="col-md-4">
          <img src={img1} className='w-100 pb-2' alt="" />
          <img src={img2} className='w-100' alt="" />
        </div>
      </div>
   </div>
   </>
}
