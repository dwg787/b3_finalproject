import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import {
  MainPage,
  LoginPage,
  ReservationPage,
  MyPage,
  DetailPage,
  MapPage,
  PurchasePage,
  CommunicationPage,
  SignUpPage,
  SearchPage,
  StayDetailPage,
  RestaurantDetailPage,
} from './pages';

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/my' element={<MyPage />} />
        <Route path='/spot/:id' element={<DetailPage />} />
        <Route path='/spot/:id/map' element={<MapPage />} />
        <Route path='/stay/:id' element={<StayDetailPage />} />
        <Route path='/restaurant/:id' element={<RestaurantDetailPage />} />
        <Route path='/reservation' element={<ReservationPage />} />
        <Route path='/purchase' element={<PurchasePage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/search' element={<SearchPage />} />
        <Route path='/communication' element={<CommunicationPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
