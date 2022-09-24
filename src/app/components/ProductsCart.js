import React from 'react';
import { useStateValue } from '../StateProvider.js';
import ItemCart from './ItemCart.js';
import accounting from 'accounting';

function ProductsCart() {
    const [{basket}, dispatch] = useStateValue();

    const payment = async () => {
        const response = await fetch("payment/create-order", {
          method: "POST",
          body: JSON.stringify(basket),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        window.location.href = data.links[1].href
      };

    let priceBasket = basket.reduce((valueOne, valueTwo)=>(valueOne + valueTwo.price),0);
    let priceOfferBasket = basket.filter((item)=>(item.offer)).reduce((oneNumber, twoNumber)=>(oneNumber + twoNumber.price),0)
    let discount = priceOfferBasket - basket.filter((item)=>(item.offer)).reduce((oneNumber, twoNumber)=>(oneNumber + twoNumber.price_offer),0);

    let total = priceBasket - discount;

    return (
        <React.Fragment >
            <div>
                <h1 className='text-center'>Products in Cart</h1>
                <div className='d-flex flex-column-reverse flex-md-row'>
                    {basket.length > 0 ?
                    <div className='col-md-9'>
                        <div className='d-md-flex flex-md-wrap align-content-md-start col-12'>
                            {basket.map((item, i)=> (<ItemCart basketData={item} key={i}/>))}
                        </div>
                    </div>
                    :
                    <div className='col-md-9 justify-content-center align-items-center d-flex'>
                        <h1 className='text-center kanit fw-bold fs-1'>There are no products in the cart :(</h1>
                    </div>}
                    <div className='col-md-3'>
                        <div className='d-flex flex-column align-items-center rounded border border-5 justify-content-center m-md-1'>
                            <h1 className='text-center'>Total</h1>
                            <div className='d-flex align-items-center'>
                                <span className='text-center'>{accounting.formatMoney(priceBasket)}</span>
                                <span className='text-white p-1 rounded bg-danger ms-1'>-{accounting.formatMoney(discount)}</span>
                            </div>
                            <h1 className='kanit'>{accounting.formatMoney(total)}</h1>
                            <button className={basket.length > 0 ? "btn btn-success m-2" : "btn btn-success m-2 disabled"} onClick={payment}>
                                Pay with Paypal
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default ProductsCart;