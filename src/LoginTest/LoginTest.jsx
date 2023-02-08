// import logo from "./logo.svg";
// import "./App.css";
import Auth from "./Auth";
import Profile from "./Profile";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function LoginTest() {
  const REST_API_KEY = "06264d97cddc6d0d5ef77a0f28d69af9";
  const REDIRECT_URI = "http://localhost:3000/login";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  return (
    // <BrowserRouter className="App">
    <Routes>
      <Route exact path="/">
        <Route>
          <Route href={KAKAO_AUTH_URL}>Kakao Login</Route>
        </Route>
      </Route>
      <Route path="/login">
        <Auth />
      </Route>
      <Route path="/profile">
        <Profile />
      </Route>
    </Routes>
    // </BrowserRouter>
  );
}

export default LoginTest;
