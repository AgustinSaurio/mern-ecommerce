import React from 'react';
import { Link } from 'react-router-dom';
import { actionTypes } from '../reducer.js';
import { useStateValue } from '../StateProvider.js';
import { getDiscount } from './functions.js';
import accounting from 'accounting';

function Products( { data } ) {
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
        <div>
            <div className='product d-flex justify-content-center mb-1' key={_id}>
                <div className="card mb-3 col-lg-10">
                    <div className="row g-0">
                        <div className="col-sm-4 d-flex justify-content-center">
                            <Link to={`/product/${_id}`} className="d-flex">
                                <img src={images.main_img} style={{objectFit:"contain", maxHeight:"300px"}} className="img-fluid rounded" alt={title}/>
                            </Link>
                        </div>
                        <div className="col-sm-8">
                            <div className="card-body d-flex flex-column h-100 justify-content-between">
                                <Link to={`/product/${_id}`} className="text-decoration-none">
                                    <h3 className="card-title kanit">{title}</h3>
                                </Link>
                                <p className="card-text">{description.slice(0, 200)}...</p>
                                <div className='d-flex justify-content-between'>
                                    {offer ? 
                                    <div className='d-flex align-items-start'>
                                        <h3 className="me-1 kanit">{accounting.formatMoney(price_offer)}</h3>
                                        <span className='text-decoration-line-through text-danger kanit'>{accounting.formatMoney(price)}</span>
                                        <span className='bg-success rounded text-white fw-bold ms-1 kanit pe-1 ps-1'>-{getDiscount(price, price_offer).toFixed()}%</span>
                                    </div>
                                    : <h3 className='kanit'>{accounting.formatMoney(price)}</h3>}
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
        </div>
    );
}

export default Products;