import { useState, useContext, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useNavigate, useParams } from "react-router-dom";
import { ProductContext } from './ProductProvider'

function ProductForm() {
  let params = useParams()
  let [ product, setProduct ] = useState({
    productName: "",
    description: "",
    dairyFree:"",
    price: "",
    imageUrl:""
  })

  let { getProduct, addProduct, updateProduct } = useContext(ProductContext)
  let navigate = useNavigate()
  let { imageUrl, productName, price, description, dairyFree } = product;

  useEffect(() => {
    if (params.productId === undefined) return
    async function fetch() {
      await getProduct(params.productId)
        .then((product) => {
          console.log(product);
          setProduct(product)
        }
        )
    }
    fetch()
  }, [params.productId]) //will run when the component first mounts (initial render) and when the calue of params.productId changes

  // If id is undefined, return nothing. Making a call to the API to get the product by its id and set the state of product to that product

  function handleChange(event) {
    setProduct((preValue) => {
      return { ...preValue, [event.target.name]: event.target.value }})
  }

  function addOrUpdate() {
    if (params.productId === undefined) {
      return addProduct(product)
    } else {
      return updateProduct(product)
    }
  }

  function handleSubmit(event) {
    event.preventDefault(); // Prevent the form from submitting and page reload
    addOrUpdate()
      .then((product) => {
        navigate(`/products`);
      })
      .catch((err) => {
        console.error('Error saving product:', err); // Handle error if save fails
      });
  }


  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" >
        <Form.Label>Product Name</Form.Label>
        <Form.Control type="text" name="productName" value={productName} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Description</Form.Label>
        <Form.Control type="text" name="description" value={description} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Dairy Free?</Form.Label>
        <Form.Control type="text" name="dairyFree" value={dairyFree} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" name="price" value={price} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" >
        <Form.Label>Image URL</Form.Label>
        <Form.Control type="url" name="imageUrl" value={imageUrl} onChange={handleChange} />
      </Form.Group>
      <Button type="submit">Save</Button>
    </Form>
  )
}

export default ProductForm;
