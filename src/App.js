import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Layout from "../src/Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Brands from "./Components/Brands/Brands";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Products from "./Components/Products/Products";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import Checkout from "./Components/Checkout/Checkout";
import NotFound from "./Components/NotFound/NotFound";
import ErrorPage from "./Components/ErrorPage/ErrorPage";
import { useContext, useEffect } from "react";
import { TokenContext } from "./Context/Token";
import ProtectedRoutes from "./Components/ProtectedRoutes/ProtectedRoutes";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import MyOrder from "./Components/MyOrder/MyOrder";
import Wishlist from "./Components/Wishlist/Wishlist";
import ForgottenPassword from "./Components/ForgottenPassword/ForgottenPassword";
import VerifyCode from "./Components/ForgottenPassword/VerifyCode";
import ResetNewPassword from "./Components/ForgottenPassword/ResetNewPassword";
import Profile from "./Components/Profile/Profile";
import ProtectedAuth from "./Components/ProtectedAuth/ProtectedAuth";

function App() {
  let { setIsLogin, isLogin } = useContext(TokenContext);

  const router = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Home /> },
        {
          path: "home",
          element: (
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
          ),
        },
        {
          path: "Register",
          element: (
            <ProtectedAuth>
              <Register />
            </ProtectedAuth>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoutes>
              <Products />
            </ProtectedRoutes>
          ),
        },
        {
          path: "login",
          element: (
            <ProtectedAuth>
              <Login />
            </ProtectedAuth>
          ),
        },
        {
          path: "Fresh-Cart-E-Commerce",
          element: (
            <ProtectedAuth>
              <Login />
            </ProtectedAuth>
          ),
        },
        {
          path: "forget-password",
          element: (
            <ProtectedAuth>
              <ForgottenPassword />
            </ProtectedAuth>
          ),
        },
        {
          path: "verify-code",
          element: (
            <ProtectedAuth>
              <VerifyCode />
            </ProtectedAuth>
          ),
        },
        {
          path: "reset-password",
          element: (
            <ProtectedAuth>
              <ResetNewPassword />
            </ProtectedAuth>
          ),
        },

        {
          path: "brands",
          element: (
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
          ),
        },
        {
          path: "profile",
          element: (
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          ),
        },
        { path: "E-commerce-freshcart", element: <Login /> },
        {
          path: "cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoutes>
              <Checkout />
            </ProtectedRoutes>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
          ),
        },
        {
          path: "details/:id",
          element: (
            <ProtectedRoutes>
              <ProductDetails />
            </ProtectedRoutes>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoutes>
              <MyOrder />
            </ProtectedRoutes>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoutes>
              <Wishlist />
            </ProtectedRoutes>
          ),
        },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);
  useEffect(() => {
    if (localStorage.getItem("userToken") != null) {
      setIsLogin(localStorage.getItem("userToken"));
    }
  }, [isLogin]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
