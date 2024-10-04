// src/pages/DichVuPage.js
import React, { useState, useEffect } from 'react';
import { addDichVu, fetchDichVu, deleteDichVu, updateDichVu } from '../services/dich-vu.service';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Sidebar from '../components/sidebar.component';

const DichVuPage = () => {
  const [dichVus, setDichVus] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentDichVu, setCurrentDichVu] = useState({ maDichVu: '', tenDichVu: '', thoiGianSuDung: 0, donGia: 0 });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    loadDichVus();
  }, []);

  const loadDichVus = async () => {
    const response = await fetchDichVu();
    setDichVus(response.data.data);
  };

  const handleAdd = () => {
    setIsEdit(false);
    setCurrentDichVu({ maDichVu: '', tenDichVu: '', thoiGianSuDung: 0, donGia: 0 });
    setShowModal(true);
  };

  const handleEdit = (dichVu) => {
    setIsEdit(true);
    setCurrentDichVu(dichVu);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    await deleteDichVu(id);
    loadDichVus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await updateDichVu(currentDichVu.maDichVu, currentDichVu);
    } else {
      await addDichVu(currentDichVu);
    }
    loadDichVus();
    setShowModal(false);
  };

    return (
        <div><Sidebar />
    <div className="container">
      <h1>Quản lý Dịch Vụ</h1>
      <Button onClick={handleAdd} className="mb-3">Thêm Dịch Vụ</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Mã Dịch Vụ</th>
            <th>Tên Dịch Vụ</th>
            <th>Thời Gian Sử Dụng</th>
            <th>Đơn Giá</th>
            <th>Hành Động</th>
          </tr>
        </thead>
        <tbody>
          {dichVus.map((dichVu, index) => (
            <tr key={dichVu.maDichVu}>
              <td>{index + 1}</td>
              <td>{dichVu.maDichVu}</td>
              <td>{dichVu.tenDichVu}</td>
              <td>{dichVu.thoiGianSuDung}</td>
              <td>{dichVu.donGia}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(dichVu)}>Sửa</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(dichVu.maDichVu)}>Xóa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? 'Sửa Dịch Vụ' : 'Thêm Dịch Vụ'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formMaDichVu">
              <Form.Label>Mã Dịch Vụ</Form.Label>
              <Form.Control
                type="text"
                value={currentDichVu.maDichVu}
                onChange={(e) => setCurrentDichVu({ ...currentDichVu, maDichVu: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="formTenDichVu">
              <Form.Label>Tên Dịch Vụ</Form.Label>
              <Form.Control
                type="text"
                value={currentDichVu.tenDichVu}
                onChange={(e) => setCurrentDichVu({ ...currentDichVu, tenDichVu: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="formThoiGianSuDung">
              <Form.Label>Thời Gian Sử Dụng (phút)</Form.Label>
              <Form.Control
                type="number"
                value={currentDichVu.thoiGianSuDung}
                onChange={(e) => setCurrentDichVu({ ...currentDichVu, thoiGianSuDung: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDonGia">
              <Form.Label>Đơn Giá</Form.Label>
              <Form.Control
                type="number"
                value={currentDichVu.donGia}
                onChange={(e) => setCurrentDichVu({ ...currentDichVu, donGia: e.target.value })}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="mt-3">
              {isEdit ? 'Cập nhật' : 'Thêm'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div></div>
  );
};

export default DichVuPage;
