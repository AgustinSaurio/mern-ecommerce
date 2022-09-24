import React from 'react';

function Footer() {
    return (
        <div className='footer'>
            <footer className="text-center pb-3">
            <div className="d-md-flex justify-content-evenly p-3">
                <a className="nav-link active text-white" aria-current="page" href="/">About us</a>
                <a className="nav-link active text-white" aria-current="page" href="/">Contact</a>
                <a className="nav-link active text-white" aria-current="page" href="/">Return policy</a>
            </div>
            <span className="text-white">© 2022 Ecommerce example Argentina</span>
            </footer>
        </div>
    );
}

export default Footer;