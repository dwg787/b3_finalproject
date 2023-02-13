import { lazy } from 'react';
// import MainPage from './MainPage';
// import LoginPage from './LoginPage';
// import PurchasePage from './PurchasePage';
// import MapPage from './MapPage';
// import ReservationPage from './ReservationPage';
// import DetailPage from './DetailPage';
// import MyPage from './MyPage';
// import CommunicationPage from './CommunicationPage';
// import SearchPage from './SearchPage';
// import SignUpPage from './SignUpPage';
// import StayDetailPage from './StayDetailPage';
// import RestaurantDetailPage from './RestaurantDetailPage';
import Ticketing from '../components/Reservation/Ticketing';
import ChatBotModal from '../components/bot/ChatBotModal';

const MainPage = lazy(() => import('./MainPage'));
const LoginPage = lazy(() => import('./LoginPage'));
const DetailPage = lazy(() => import('./DetailPage'));
const PurchasePage = lazy(() => import('./PurchasePage'));
const MapPage = lazy(() => import('./MapPage'));
const ReservationPage = lazy(() => import('./ReservationPage'));
const MyPage = lazy(() => import('./MyPage'));
const CommunicationPage = lazy(() => import('./CommunicationPage'));
const SearchPage = lazy(() => import('./SearchPage'));
const SignUpPage = lazy(() => import('./SignUpPage'));
const StayDetailPage = lazy(() => import('./StayDetailPage'));
const RestaurantDetailPage = lazy(() => import('./RestaurantDetailPage'));

export {
  MainPage,
  LoginPage,
  ReservationPage,
  PurchasePage,
  MapPage,
  DetailPage,
  MyPage,
  CommunicationPage,
  SearchPage,
  SignUpPage,
  StayDetailPage,
  RestaurantDetailPage,
  Ticketing,
  ChatBotModal,
};
