import React from 'react';
import { Autoplay, Pagination, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import ProductSlider from './ProductSlider.js';
import '../styles/index.css'

function ProductsSlider( { data } ) {

    return (
    <div className='products-cards'>
        <Swiper
          loop={true}
          pagination={{
              type: "progressbar",
              clickable: true,
          }}
          navigation={true}
          slidesPerView={1}
          spaceBetween={10}
          autoplay={{
              delay: 2500,
              disableOnInteraction: true,
            }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 10,
            },
          }}
          modules={[Autoplay,Pagination, Navigation]}
          className="mySwiper"
        >
          {data.filter((item)=>(item.offer === true))
          .map((item, i)=>(
              <SwiperSlide key={i}>
                <ProductSlider data={item} />            
              </SwiperSlide>
            ))}
        </Swiper>
    </div>
    );
}

export default ProductsSlider;