import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import './index.css';
import Dashboard from './features/products/Dashboard';
import Login from './features/products/Login';
import { BrowserRouter, Route, Routes,Navigate} from 'react-router-dom';
import ProductDetail  from './features/products/ProductDetail';
const container = document.getElementById('root');
const root = createRoot(container);
const PrivateRoute = ({children}) => {
  const isAuthenticated = localStorage.getItem("token") ?? ""
  return isAuthenticated ? children : <Navigate to="/login" />;
};
root.render(
    <Provider store={store}>
         <BrowserRouter>
         <Routes>
          <Route path='/' element={<App/>} />
          <Route path="/product/:productId" element={<ProductDetail />}/>
          <Route path="/login" element={<Login />} />
      <Route path="/user/dashboard"
      element={
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      }/>
        <Route path='*' element={<h1>404 Page Not Found</h1>} />
         </Routes>
         </BrowserRouter>    
    </Provider>
);
