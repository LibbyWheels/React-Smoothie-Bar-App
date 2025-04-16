import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";
import { Link, Outlet } from "react-router-dom";
import { Button, Col, Form } from "react-bootstrap";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function DisplayNavBar() {
  function SearchProduct() {
    const [query, setQuery] = useState("");

    let navigate = useNavigate()

    function handleChange(event) {
      setQuery(event.target.value);
    }

    function handleClick() {
      navigate('/search/'+ query)
    }

    return (
      <div>
        <Col className="ms-2 d-flex">
          <Form.Control
            type="text"
            placeholder="Search"
            className=" mr-sm-2"
            value={query}
            onChange={handleChange}
          />
          <Button onClick={handleClick}>Search</Button>
        </Col>
      </div>
    );
  }

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            <Navbar.Brand>Libby's Smoothie Bar</Navbar.Brand>

            <img
              src="https://as2.ftcdn.net/jpg/03/11/23/03/1000_F_311230319_FPVE3DgJt8KvixX2WvJJIt2gaKzNnFus.jpg"
              alt="Logo"
              width="40"
              height="40"
              className="d-inline-block align-top"
            />

            <Link to="/home" className="nav-link">
              Home
            </Link>
            <Link to="/about" className="nav-link">
              About Us
            </Link>
            <Link to="/products" className="nav-link">
              View All
            </Link>
            <Link to="/add" className="nav-link">
              Create
            </Link>
            <div>{SearchProduct()}</div>
          </Nav>
        </Container>
      </Navbar>

      <Stack gap={3} className="col-md-10 mx-auto mt-3">
        <Outlet />
      </Stack>
    </>
  );
}

export default DisplayNavBar;
