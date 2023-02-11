import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import {
  MainPage,
  LoginPage,
  RegisterPage,
  ReservationPage,
  MyPage,
  DetailPage,
  MapPage,
  PurchasePage,
} from "./pages";

import CommunicationPage from "../src/pages/CommunicationPage";
import SignUpPage from "../src/pages/SignUpPage";
import SearchPage from "./pages/SearchPage";
import Ticketing from "./components/reservation/Tiketing";
import Chat from "./components/bot/Chat";

const Router = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/my" element={<MyPage />} />
        <Route path="/:id" element={<DetailPage />} />
        <Route path="/:id/map" element={<MapPage />} />
        <Route path="/reservation" element={<ReservationPage />} />
        <Route path="/purchase" element={<PurchasePage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/tiket" element={<Ticketing />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
