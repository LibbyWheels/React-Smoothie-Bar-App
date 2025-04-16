import React, { createContext, useState, useEffect } from "react";
import axios from "axios";


export const ProductContext = createContext();

export const ProductProvider = (props) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() { //asynchronous function named getProducts(), which waits for refreshProducts() to complete its task before the function exits
      await refreshProducts();
    }

    getProducts();
  }, []);

  async function refreshProducts() {
    axios.get("http://localhost:3001/products").then(response => {
      setProducts(response.data) //sets the state of products to the data of the API response
    })
  } //when refreshProducts() is called, it sends a GET request to the URL. The server responds with the list of products; setProducts is called to set the state of the object with the product data

  function getProduct(id) {
    return axios
      .get(`http://localhost:3001/products/${id}`)
      .then((response) => new Promise((resolve) => resolve(response.data)))
      .catch(
        (error) => new Promise((_, reject) => reject(error.response.statusText))
      );
  } 

  function searchProducts(query) {
    return axios
      .get(`http://localhost:3001/products?q=${query}`)
        .then((response) => new Promise((resolve) => resolve(response.data)))
        .catch(
            (error) => new Promise((_, reject) => reject(error.response.statusText))
        );
  } 

  function deleteProduct(id) {
    axios.delete(`http://localhost:3001/products/${id}`).then(refreshProducts);
  }

  function addProduct(product) {
    return axios
      .post("http://localhost:3001/products", product)
      .then((response) => {
        refreshProducts();
        return new Promise((resolve) => resolve(response.data));
      });
  }

  function updateProduct (product) {
    return axios
      .put(`http://localhost:3001/products/${product.id}`, product)
      .then((response) => {
        refreshProducts();
        return new Promise((resolve) => resolve(response.data));
      });
  }


  return (
    <ProductContext.Provider
      value={{
        products,
        getProduct,
        deleteProduct,
        addProduct,
        updateProduct,
        searchProducts,
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
