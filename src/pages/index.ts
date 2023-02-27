import { lazy } from 'react';

const MainPage = lazy(() => import('./MainPage'));
const LoginPage = lazy(() => import('./LoginPage'));
const DetailPage = lazy(() => import('./DetailPage/DetailPage'));

const MapPage = lazy(() => import('./MapPage'));

const MyPage = lazy(() => import('./MyPage/MyPage'));
const SearchPage = lazy(() => import('./SearchPage'));
const SignUpPage = lazy(() => import('./SignUpPage'));
const StayDetailPage = lazy(() => import('./DetailPage/StayDetailPage'));
const RestaurantDetailPage = lazy(() =>
  import('./DetailPage/RestaurantDetailPage'),
);

export {
  MainPage,
  LoginPage,
  MapPage,
  DetailPage,
  MyPage,
  SearchPage,
  SignUpPage,
  StayDetailPage,
  RestaurantDetailPage,
};
