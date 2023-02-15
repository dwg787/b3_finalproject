import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import Navbar from './components/Navbar';
import ChatBotModal from './components/bot/ChatBotModal';
import TopButton from './components/TopButton/TopButton';

import Ticketing from './components/Reservation/Ticketing';

import {
  MainPage,
  LoginPage,
  ReservationPage,
  MyPage,
  DetailPage,
  MapPage,
  PurchasePage,
  SignUpPage,
  SearchPage,
  StayDetailPage,
  RestaurantDetailPage,
} from './pages';

const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <Navbar />
        <ChatBotModal />
        <TopButton />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/spot/:id" element={<DetailPage />} />
          <Route path="/spot/:id/map" element={<MapPage />} />
          <Route path="/stay/:id" element={<StayDetailPage />} />
          <Route path="/restaurant/:id" element={<RestaurantDetailPage />} />
          <Route path="/stay/:id/reservation" element={<ReservationPage />} />
          <Route path="/purchase" element={<PurchasePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default Router;
