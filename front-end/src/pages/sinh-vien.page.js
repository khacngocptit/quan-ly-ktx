import React, { useState, useEffect } from 'react';
import { adduser, fetchuser, deleteuser, updateuser } from '../services/sinh-vien.service';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Sidebar from '../components/sidebar.component';

const SinhVienPage = () => {
  const [sinhViens, setSinhViens] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentSinhVien, setCurrentSinhVien] = useState({
    hoDem: '',
    ten: '',
    ngaySinh: null,
    maSinhVien: '',
    cmtCccd: '',
    lop: '',
    queQuan: ''
  });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    loadSinhViens();
  }, []);

  const loadSinhViens = async () => {
    const response = await fetchuser(null,   1,
      10);
    setSinhViens(response.data.data);
    console.log(response)
  };

  const handleAdd = () => {
    setIsEdit(false);
    setCurrentSinhVien({
      hoDem: '',
      ten: '',
      ngaySinh: null,
      maSinhVien: '',
      cmtCccd: '',
      lop: '',
      queQuan: ''
    });
    setShowModal(true);
  };

  const handleEdit = (sinhVien) => {
    setIsEdit(true);
    setCurrentSinhVien(sinhVien);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    await deleteuser(id);
    loadSinhViens();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await updateuser(currentSinhVien._id, currentSinhVien);
    } else {
      await adduser(currentSinhVien);
    }
    loadSinhViens();
    setShowModal(false);
  };

  return (
    <div >
    <Sidebar />
    <div className="container">
      <h1>Quản lý Sinh Viên</h1>
      <Button onClick={handleAdd} className="mb-3">Thêm Sinh Viên</Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Họ đệm</th>
            <th>Tên</th>
            <th>Ngày sinh</th>
            <th>CMT/CCCD</th>
            <th>Lớp hành chính</th>
            <th>Quê quán</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {sinhViens.map((sinhVien, index) => (
            <tr key={sinhVien._id}>
              <td>{index + 1}</td>
              <td>{sinhVien.hoDem}</td>
              <td>{sinhVien.ten}</td>
              <td>{new Date(sinhVien.ngaySinh).toLocaleDateString()}</td>
              <td>{sinhVien.cmtCccd}</td>
              <td>{sinhVien.lop}</td>
              <td>{sinhVien.queQuan}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(sinhVien)}>Sửa</Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(sinhVien._id)}>Xóa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEdit ? 'Sửa Sinh Viên' : 'Thêm Sinh Viên'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formHoTen">
              <Form.Label>Họ đệm</Form.Label>
              <Form.Control
                type="text"
                value={currentSinhVien.hoDem}
                onChange={(e) => setCurrentSinhVien({ ...currentSinhVien, hoDem: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="formTen">
              <Form.Label>Tên</Form.Label>
              <Form.Control
                type="text"
                value={currentSinhVien.ten}
                onChange={(e) => setCurrentSinhVien({ ...currentSinhVien, ten: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="formNgaySinh">
              <Form.Label>Ngày sinh</Form.Label>
              <DatePicker
                selected={currentSinhVien.ngaySinh}
                onChange={(date) => setCurrentSinhVien({ ...currentSinhVien, ngaySinh: date })}
                dateFormat="dd/MM/yyyy"
                className="form-control"
                required
              />
            </Form.Group>

            <Form.Group controlId="formCmtCccd">
              <Form.Label>CMT/CCCD</Form.Label>
              <Form.Control
                type="text"
                value={currentSinhVien.cmtCccd}
                onChange={(e) => setCurrentSinhVien({ ...currentSinhVien, cmtCccd: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="formLop">
              <Form.Label>Lớp hành chính</Form.Label>
              <Form.Control
                type="text"
                value={currentSinhVien.lop}
                onChange={(e) => setCurrentSinhVien({ ...currentSinhVien, lop: e.target.value })}
                required
              />
            </Form.Group>

            <Form.Group controlId="formQueQuan">
              <Form.Label>Quê quán</Form.Label>
              <Form.Control
                type="text"
                value={currentSinhVien.queQuan}
                onChange={(e) => setCurrentSinhVien({ ...currentSinhVien, queQuan: e.target.value })}
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

export default SinhVienPage;
