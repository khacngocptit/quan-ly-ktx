// src/pages/Home.js
import React from 'react';
import Sidebar from '../components/sidebar.component';
import { Container } from 'react-bootstrap';

const Home = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <Container fluid style={{ marginLeft: '250px', padding: '20px' }}>
        <h1>Trang chủ</h1>
        {/* Your main content goes here */}
      </Container>
    </div>
  );
};

export default Home;
