import React from 'react';
import { Link } from 'react-router-dom'
import { getDiscount } from './functions.js';
import { useStateValue } from '../StateProvider.js';
import { actionTypes } from '../reducer.js';
import accounting from 'accounting';

function ProductSlider( { data } ) {
    let {_id, title, description, price, images, price_offer, offer, colors, gen, type} = data;
    const [{basket}, dispatch] = useStateValue();
    const addToBasket = ()=> {
        dispatch({
            type: actionTypes.ADD_TO_BASKET,
            item: {
                _id,
                title,
                description,
                price,
                price_offer,
                images,
                offer,
                colors,
                gen,
                type
            } 
        })
    }


    return (
        <div className="card mb-lg-2 mt-lg-2 border border-1 text-center h-100">
            <div className='img-content'>
                <Link to={`/product/${_id}`}>
                    <img src={images.main_img} className="card-img-top" alt={title} style={{height:"200px", objectFit:"contain"}}/>
                </Link>
            </div>
            <div className="card-body">
                <Link to={`/product/${_id}`} className="text-decoration-none">
                    <h5 className="card-title kanit">{title}</h5>
                </Link>
                <p>{description.slice(0,100)}</p>
                <div className='d-flex align-items-start justify-content-center'>
                    <h4 className='m-0 kanit'>{accounting.formatMoney(price_offer)}</h4>
                    <span className='text-decoration-line-through text-danger kanit'>{accounting.formatMoney(price)}</span>
                    <span className='bg-success rounded text-white fw-bold ms-1 pe-1 ps-1 kanit'>-{getDiscount(price, price_offer).toFixed()}%</span>
                </div>
                <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-primary" onClick={addToBasket}>
                        <Link to={"/products/cart"} className="text-white text-decoration-none">Buy now</Link>
                    </button> 
                    <button type="button" className="btn btn-primary" onClick={addToBasket}><i className="bi bi-cart-plus"></i></button>
                </div>
            </div>
        </div>
    );
}

export default ProductSlider;