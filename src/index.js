import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/js/bootstrap.bundle'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import CounterContextProvider from './Context/Counter';
import TokenContextProvider from './Context/Token';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import CartContextProvider from './Context/CartContext';
import WishlistContextProvider from './Context/WishlistContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient()

root.render( 
  
  <WishlistContextProvider>
  <CartContextProvider>
  <QueryClientProvider client={queryClient}>
    <CounterContextProvider >
      <TokenContextProvider>
        <App />
        </TokenContextProvider>
    </CounterContextProvider> 
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
    </CartContextProvider>
    </WishlistContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();