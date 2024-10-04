import React from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import DichVuPage from './pages/dich-vu.page';
import Home from './pages/home.page';
import PhongKtxPage from './pages/phong-ktx.page';
import SinhVienPage from './pages/sinh-vien.page';
import { getToken } from './services/auth.service';
const PrivateRoute = ({ children }) => {
  const token = getToken();
  return token ? children : <Navigate to="/login" />;
};
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/" element={<Home />} />
          <Route path="/sinhvien"  element={
              <PrivateRoute>
                <SinhVienPage />
              </PrivateRoute>
            } />
          <Route path="/phongktx"  element={
              <PrivateRoute>
                <PhongKtxPage />
              </PrivateRoute>
            } />
          <Route path="/dichvu"  element={
              <PrivateRoute>
                <DichVuPage />
              </PrivateRoute>
            } />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;