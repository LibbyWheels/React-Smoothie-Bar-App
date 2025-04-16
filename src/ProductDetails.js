import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ProductContext } from "./ProductProvider";
import { useContext, useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

function ProductDetails() {
  let params = useParams();
  let navigate = useNavigate();

  let { getProduct, deleteProduct } = useContext(ProductContext);
  let [product, setProduct] = useState(null);
  let [error, setError] = useState(null);

  useEffect(() => {
    async function fetch() {
      setError(null); // Reset error on each fetch
      try {
        const fetchedProduct = await getProduct(params.productId);
        setProduct(fetchedProduct);
      } catch (message) {
        setError(message); // Set error message if fetch fails
      }
    }
    fetch();
  }, [params.productId, getProduct]);

  function errorMessage() {
    return (
      <Alert variant="danger">
        There was an error attempting to load this product: {error}
      </Alert>
    );
  }

  function handleDeleteProduct(id) {
    deleteProduct(id);
    navigate("/products");
  }

  function loading() {
    return (
      <div className="w-25 text-center">
        <Spinner animation="border" />
        <p>Loading...</p>
      </div>
    );
  }

  function productCard() {
    if (!product) return loading(); // Ensure loading is shown if product is still null
    let { id, imageUrl, productName, price, description, dairyFree } = product;
    return (
      <Card className="align-self-start w-25">
        <Card.Body>
          <Card.Img className="mb-2" variant="top" src={imageUrl} />
          <Card.Title>{productName}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            <span>Price: $</span> {price}
          </Card.Subtitle>
          <Card.Text>
            <span>{description}</span>
          </Card.Text>
          <Card.Text>
            <span>Dairy Free?  </span>{dairyFree}
          </Card.Text>
          <div className="d-flex">
            <Link to={`/products/${id}/edit`} className="btn btn-primary mx-3">
              Edit
            </Link>
            <Button variant="danger" onClick={() => handleDeleteProduct(id)}>
              Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    );
  }

  // Error handling
  if (error) return errorMessage();

  // Loading state
  if (!product) return loading();

  return productCard();
}

export default ProductDetails;
