import Products from "./components/Products.js";
import ProductsSlider from "./components/ProductsSlider.js";
import Loading from "./components/Loading.js";
import React from 'react'
import './styles/index.css'
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import Product from "./components/Product.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";
import ProductsCart from "./components/ProductsCart.js";
import { useStateValue } from './StateProvider.js';

function App() {
  const [data, setData] = useState();
  const [{basket}, dispatch] = useStateValue();

  useEffect(()=>{
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setData(data);
      })
  },[])

  return (
      <div className="App">
          <Header basket={basket}/>

          <Routes>           
              <Route path="/products/cart" element={<ProductsCart />}/>
              
              <Route path="/product/:id" element={<Product />} />
              
              <Route path="/products/shirts" element={
                data ?
                  <div>
                    <h1 className="text-center m-2">T-Shirts</h1>
                    {data.filter((item)=>(item.type === "t-shirt")).map((item, i)=><Products key={i} data={item}/>)} 
                  </div>
                : <Loading />
              }/>

              <Route path="/products/pants" element={
                data ?
                  <div>
                    <h1 className="text-center">Pants</h1>
                    {data.filter((item)=>(item.type === "pants")).map((item, i)=><Products key={i} data={item}/>)}
                  </div>
              : <Loading />
              }/>

              <Route path="/products/sneakers-and-shoes" element={
                data ?
                  <div>
                    <h1 className="text-center m-2">Sneakers and shoes</h1>
                    {data.filter((item)=>(item.type === "sneakers" || item.type === "shoes")).map((item, i)=><Products key={i} data={item}/>)}                
                  </div>  
              : <Loading />
              }/>

              <Route path="/products/accesories" element={
                data ? 
                  <div>
                    <h1 className="text-center">Accesories</h1>
                    {data.filter((item)=>(item.type === "sunglasses")).map((item, i)=><Products key={i} data={item}/>)}
                  </div>
              : <Loading />
              }/>
              
              <Route path="/" element={
                <div>
                  <h1 className='text-center m-2'>Discounted products</h1>
                  {data ? <ProductsSlider data={data} /> : <Loading />}
                  <h1 className="text-center m-2">All products</h1>
                  {data ? data.map((item, i)=><Products key={i} data={item}/>) : <Loading />}
                  <Outlet />
                </div> 
              }/>

          </Routes>
          <Footer />
      </div>
  );
}

export default App;