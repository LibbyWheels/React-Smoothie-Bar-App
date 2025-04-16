import React, { useState, useEffect } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Stack from "react-bootstrap/Stack";
import {Link, Outlet, useNavigate, useParams} from "react-router-dom";
import ProductContext from "./ProductProvider";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useContext } from "react";

function SearchProducts(props) {
  let params = useParams();
  let navigate = useNavigate();
  let { searchProducts, deleteProduct } = useContext(ProductContext);

  let [foundProducts, setFoundProduct] = useState([]);

  useEffect(() => {
    async function fetch() {
        const fetchedProduct = await searchProducts(params.query);
        setFoundProduct(fetchedProduct);
    }
    fetch();
  }, [params.query, searchProducts]);

  function handleDeleteProduct(id) {
    deleteProduct(id);
    navigate("/products");
  }

  function displayProducts(products) {
    if (!foundProducts) return;

    return foundProducts.map((product) => (
      <div className="d-flex">
        <Card className="m-3 w-50">
          <Card.Img variant="top" src={product.imageUrl} />
          <Card.Body>
            <Card.Title>{product.productName}</Card.Title>
            <Card.Text>
              <strong>$</strong> <span>{product.price}</span>
            </Card.Text>

            <div className="d-flex">
              <Link
                to={`/products/${product.id}`}
                className="btn btn-secondary mx-3"
              >
                View
              </Link>

              <Link
                to={`/products/${product.id}/edit`}
                className="btn btn-primary mx-3"
              >
                Edit
              </Link>

              <Button
                variant="danger"
                onClick={() => handleDeleteProduct(product.id)}
              >
                Delete
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    ));
  }

  return (
    <>
      <h1>Found Products</h1>
      <Stack direction="horizontal" gap={3}>
        <ListGroup className="align-self-start w-75">
          <ProductContext.Consumer>
            {({ products }) => displayProducts(products)}
          </ProductContext.Consumer>
        </ListGroup>
        <Outlet />
      </Stack>
    </>
  );
}

export default SearchProducts;
