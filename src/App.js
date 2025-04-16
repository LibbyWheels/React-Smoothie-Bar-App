import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import DisplayProducts from "./DisplayProducts";
import ProductForm from "./ProductForm";
import ProductDetails from "./ProductDetails";
import { ProductProvider } from "./ProductProvider";
import DisplayNavBar from "./DisplayNavBar";
import SearchProducts from "./SearchProducts";

function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DisplayNavBar />}>
            <Route path="home" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="add" element={<ProductForm />} />
            <Route path="search/:query" element={<SearchProducts />} />
            <Route path="products" element={<DisplayProducts />}>
              <Route path=":productId/edit" element={<ProductForm />} />
              <Route path=":productId" element={<ProductDetails />} />
              <Route path="*" element={<h1>Product Not Found</h1>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </ProductProvider>
  );
}

export default App;
