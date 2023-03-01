import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import Navbar from './components/Navbar';
import ChatBotModal from './components/bot/ChatBotModal';
import TopButton from './components/TopButton/TopButton';
import SlotMachine from './components/Slot/SlotMechine';

import {
  MainPage,
  LoginPage,
  MyPage,
  DetailPage,
  MapPage,
  SignUpPage,
  SearchPage,
  StayDetailPage,
  RestaurantDetailPage,
  ErrorPage,
} from './pages';

const Router = () => {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Navbar />
        <ChatBotModal />
        <TopButton />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/spot/:id" element={<DetailPage />} />
          <Route path="/:id/map" element={<MapPage />} />
          <Route path="/stay/:id" element={<StayDetailPage />} />
          <Route path="/restaurant/:id" element={<RestaurantDetailPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/slot" element={<SlotMachine />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default Router;
