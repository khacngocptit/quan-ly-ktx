import React, { useState } from 'react';
import { login, setToken } from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import Sidebar from '../components/sidebar.component';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password });
      setToken(response.token);  // Lưu token vào localStorage
      navigate('/sinhvien');  // Chuyển hướng đến trang sinh viên sau khi đăng nhập thành công
    } catch (error) {
      setError('Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản và mật khẩu.');
    }
  };

  return (
    
    <div className="container mt-5">
      <h2>Đăng Nhập</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <Sidebar />

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Tài khoản</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nhập tài khoản"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Mật khẩu</Form.Label>
          <Form.Control
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">Đăng nhập</Button>
      </Form>
    </div>
  );
};

export default LoginPage;
