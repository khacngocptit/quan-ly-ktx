import React, { useState, useEffect } from 'react';
import { addPhongKtx, fetchPhongKtx, deletePhongKtx, updatePhongKtx } from '../services/phong-ktx.service';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import Sidebar from '../components/sidebar.component';

const PhongKtxPage = () => {
  const [phongKtvs, setPhongKtvs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentPhongKtx, setCurrentPhongKtx] = useState({
    soPhong: '',
    loaiPhong: '',
    soNguoiToiDa: 0,
    donGia: 0
  });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    loadPhongKtvs();
  }, []);

  const loadPhongKtvs = async () => {
    const response = await fetchPhongKtx(); // Modify your service to fetch data
    setPhongKtvs(response.data.data);
  };

  const handleAdd = () => {
    setIsEdit(false);
    setCurrentPhongKtx({ soPhong: '', loaiPhong: '', soNguoiToiDa: 0, donGia: 0 });
    setShowModal(true);
  };

  const handleEdit = (phongKtx) => {
    setIsEdit(true);
    setCurrentPhongKtx(phongKtx);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    await deletePhongKtx(id);
    loadPhongKtvs();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      if (isEdit) {
        console.log(currentPhongKtx)
      await updatePhongKtx(currentPhongKtx._id, currentPhongKtx);
    } else {
      await addPhongKtx(currentPhongKtx);
    }
    loadPhongKtvs();
    setShowModal(false);
  };

  return (
      <div >
     <Sidebar />
    <div className="container">
      <h1>Quản lý Phòng KTX</h1>
      <Button onClick={handleAdd} className="mb-3">Thêm Phòng KTX</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Số Phòng</th>
            <th>Loại Phòng</th>
            <th>Số Người Tối Đa</th>
            <th>Đơn Giá</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {phongKtvs.map((phongKtx, index) => (
            <tr key={phongKtx._id}>
              <td>{index + 1}</td>
              <td>{phongKtx.soPhong}</td>
              <td>{phongKtx.loaiPhong}</td>
              <td>{phongKtx.soNguoiToiDa}</td>
              <td>{phongKtx.donGia}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(phongKtx)}>Sửa</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(phongKtx._id)}>Xóa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? 'Sửa Phòng KTX' : 'Thêm Phòng KTX'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formSoPhong">
              <Form.Label>Số Phòng</Form.Label>
              <Form.Control
                type="text"
                value={currentPhongKtx.soPhong}
                onChange={(e) => setCurrentPhongKtx({ ...currentPhongKtx, soPhong: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="formLoaiPhong">
              <Form.Label>Loại Phòng</Form.Label>
              <Form.Control
                type="text"
                value={currentPhongKtx.loaiPhong}
                onChange={(e) => setCurrentPhongKtx({ ...currentPhongKtx, loaiPhong: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="formSoNguoiToiDa">
              <Form.Label>Số Người Tối Đa</Form.Label>
              <Form.Control
                type="number"
                value={Number(currentPhongKtx.soNguoiToiDa)}
                onChange={(e) => setCurrentPhongKtx({ ...currentPhongKtx, soNguoiToiDa: Number(e.target.value) })}
                required
              />
            </Form.Group>

            <Form.Group controlId="formDonGia">
              <Form.Label>Đơn Giá</Form.Label>
              <Form.Control
                type="number"
                value={Number(currentPhongKtx.donGia)}
                onChange={(e) => setCurrentPhongKtx({ ...currentPhongKtx, donGia: Number(e.target.value) })}
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

export default PhongKtxPage;
