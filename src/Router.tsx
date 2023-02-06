import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
  MainPage,
  LoginPage,
  RegisterPage,
  ReservationPage,
  MyPage,
  DetailPage,
  MapPage,
  PurchasePage,
} from './pages';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/my' element={<MyPage />} />
        <Route path='/detail' element={<DetailPage />} />
        <Route path='/map' element={<MapPage />} />
        <Route path='/reservation' element={<ReservationPage />} />
        <Route path='/purchase' element={<PurchasePage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
