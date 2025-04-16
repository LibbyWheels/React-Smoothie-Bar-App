import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Stack from "react-bootstrap/Stack";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ProductContext from "./ProductProvider";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { useContext } from "react";

function Home(props) {
  let navigate = useNavigate();
  let { deleteProduct } = useContext(ProductContext);

  function handleDeleteProduct(id) {
    deleteProduct(id);
    navigate("/products");
  }

  function displayThreeProducts(products) {
    console.log(products);
    if (!products) return;

    return products.slice(0, 3).map(
      (
        product,
        index //mapping through first three items in array
      ) => (
        <div key={index} className="d-flex">
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
      )
    );
  }

  return (
    <>
      <h1>Products</h1>
      <Stack direction="horizontal" gap={3}>
        <ListGroup className="align-self-start w-75">
          <ProductContext.Consumer>
            {({ products }) => displayThreeProducts(products)}
          </ProductContext.Consumer>
        </ListGroup>
        <Outlet />
      </Stack>
    </>
  );
}

export default Home;
