import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Loader from './components/Loader/Loader';
import Navbar from './components/Navbar';
import ChatBotModal from './components/bot/ChatBotModal';
import TopButton from './components/TopButton/TopButton';
import SlotMachine from './components/Slot/SlotMechine';
import ListPage from './pages/ListPage';

const MainPage = lazy(() => import('./pages/MainPage'));
// const ListPage = lazy(() => import('./pages/ListPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const DetailPage = lazy(() => import('./pages/DetailPage/DetailPage'));
const MyPage = lazy(() => import('./pages/MyPage/MyPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const SignUpPage = lazy(() => import('./pages/SignUpPage'));
const StayDetailPage = lazy(() => import('./pages/DetailPage/StayDetailPage'));
const RestaurantDetailPage = lazy(() =>
  import('./pages/DetailPage/RestaurantDetailPage'),
);
const ErrorPage = lazy(() => import('./pages/ErrorPage'));

const Router = () => {
  return (
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <Navbar />
        <ChatBotModal />
        <TopButton />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/my" element={<MyPage />} />
          <Route path="/spot/:id" element={<DetailPage />} />
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
