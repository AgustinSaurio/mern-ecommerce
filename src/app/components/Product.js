import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import '../styles/index.css'
import { getDiscount } from './functions.js';
import { FreeMode, Navigation, Thumbs } from "swiper";
import { useStateValue } from '../StateProvider.js';
import { actionTypes } from '../reducer.js';
import Loading from './Loading.js';
import accounting from 'accounting';
import { Link } from 'react-router-dom';

function Product() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const {id} = useParams()
    const [dataId, setDataId] = useState();
    const [{basket}, dispatch] = useStateValue();

    const addToBasket = ()=> {
        dispatch({
            type: actionTypes.ADD_TO_BASKET,
            item: {
                _id: dataId[0]._id,
                title: dataId[0].title,
                price: dataId[0].price,
                price_offer: dataId[0].price_offer,
                images: dataId[0].images,
                offer: dataId[0].offer,
                colors: dataId[0].colors,
                gen: dataId[0].gen,
                type: dataId[0].type
            } 
        })
    }


    useEffect(()=>{
      fetch(`/api/products/${id}`)
        .then(res => res.json())
        .then(data => {
          setDataId(data);
        })
    },[])

    return (
        <div className=''>
        {dataId ? <div>
                <div className='product d-flex justify-content-center m-sm-2' key={dataId[0]._id}>
                    <div className="card mb-3 col-lg-11">
                        <div className="row g-0">
                            <div className="col-sm-4">
                                <Swiper
                                    style={{
                                        "--swiper-navigation-color": "#fff",
                                        "--swiper-pagination-color": "#fff",
                                    }}
                                    spaceBetween={10}
                                    navigation={true}
                                    thumbs={{ swiper: thumbsSwiper }}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper2"
                                    >

                                    {dataId[0].images.images.map((x)=>(
                                        <SwiperSlide key={x}>
                                            <img src={x}/>
                                        </SwiperSlide>
                                    ))}

                                    </Swiper>
                                    <Swiper
                                    onSwiper={setThumbsSwiper}
                                    spaceBetween={10}
                                    slidesPerView={4}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper"
                                    >

                                    {dataId[0].images.images.map((x)=>(
                                        <SwiperSlide key={x}>
                                            <img src={x} style={{objectFit:"contain"}}/>
                                        </SwiperSlide>
                                    ))}

                                    </Swiper>
                                </div>
                                <div className="col-sm-8 d-flex">
                                <div className="card-body d-flex flex-column justify-content-around">
                                    <h3 className="card-title kanit">{dataId[0].title}</h3>
                                    <p className="card-text">{dataId[0].description}</p>
                                        {dataId[0].offer ? 
                                            <div className='d-flex align-items-start'>
                                                <h3 className='kanit' >{accounting.formatMoney(dataId[0].price_offer)} </h3>
                                                <span className='text-decoration-line-through text-danger kanit'>{accounting.formatMoney(dataId[0].price)}</span>
                                                <span className='bg-success rounded text-white fw-bold ms-1 pe-1 ps-1'>-{getDiscount(dataId[0].price, dataId[0].price_offer).toFixed()}%</span>
                                            </div>
                                        : <h3 className='kanit'>{accounting.formatMoney(dataId[0].price)}</h3>}
                                    <div className='d-flex justify-content-end'>
                                        <div className="btn-group" role="group" aria-label="Basic example">
                                            <button type="button" className="btn btn-primary" onClick={addToBasket}>
                                                <Link to={"/products/cart"} className="text-white text-decoration-none">Buy now</Link>
                                            </button>
                                            <button type="button" className="btn btn-primary" onClick={addToBasket}><i className="bi bi-cart-plus"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    <div className='container col-sm-8 p-0'>
                        <table className="table table-dark table-striped-columns rounded">
                            <thead>
                            </thead>
                            <tbody>
                                <tr>
                                <th scope="row">Type</th>
                                    <td>{dataId[0].type}</td>
                                </tr>
                                <tr>
                                <th scope="row">Sizes</th>
                                    <td>{dataId[0].size.join(", ")}</td>
                                </tr>
                                <tr>
                                <th scope="row">Colors</th>
                                    <td>{dataId[0].colors.join(", ")}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
        : <Loading/>}
        </div>
    );
}

export default Product;