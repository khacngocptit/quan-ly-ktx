import React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar  bg="dark" variant="dark" expand="lg">
      <Navbar.Brand as={Link} to="/">Quản lý Ký túc xá</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/sinhvien">Quản lý Sinh Viên</Nav.Link>
          <Nav.Link as={Link} to="/phongktx">Quản lý Phòng KTX</Nav.Link>
          <Nav.Link as={Link} to="/dichvu">Quản lý Dịch vu KTX</Nav.Link>
          {/* Add more links here as needed */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;