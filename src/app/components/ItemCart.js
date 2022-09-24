import React from 'react';
import { actionTypes } from '../reducer.js';
import { useStateValue } from '../StateProvider.js';
import accounting from 'accounting';
import { Link } from 'react-router-dom';

function ItemCart( { basketData } ) {
    const [{basket}, dispatch] = useStateValue();
    let {_id, title, price, images, price_offer, offer} = basketData;

    const removeItem = ()=> dispatch({
        type: actionTypes.REMOVE_ITEM,
        _id: _id
    })

    return (
    <div className='col-lg-4 col-md-6'>
        <div className="card m-1">
            <div className="row g-0">
                <div className="col-4 d-flex justify-content-center">
                    <img src={images.main_img} className="img-fluid rounded" style={{height:"100px", objectFit:"contain"}} alt="..."/>
                </div>
                <div className="col-8">
                    <div className="card-body p-1 h-100">
                        <div className='d-flex flex-column h-100 justify-content-between'>
                            <Link to={`/product/${_id}`} className="text-decoration-none">
                                <h4 className="card-title pt-2 kanit">{title}</h4>                            
                            </Link>
                            <div className='d-flex justify-content-between'>
                                {offer ? 
                                <div className='d-flex align-items-start mt-auto'>
                                    <span className='kanit'>{accounting.formatMoney(price_offer)} </span>
                                    <span className='text-decoration-line-through text-danger ms-1 kanit'>{accounting.formatMoney(price)}</span>
                                </div>
                                : <span className='kanit mt-auto'>{accounting.formatMoney(price)}</span>}
                                <button className="btn btn-danger" onClick={removeItem}><i className="bi bi-cart-dash"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}

export default ItemCart;