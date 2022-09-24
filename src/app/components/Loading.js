import '../styles/loading.css';

import React from 'react';

function loading() {
    return (
        <div className='d-flex justify-content-center'>
            <div className="lds-circle"><div></div></div>
        </div>
    );
}

export default loading;