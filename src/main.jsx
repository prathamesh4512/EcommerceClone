import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { Provider } from "react-redux";
import { setAllProducts } from "./store/bag/reducer";
import { products } from "./utils/Products";
import store  from './store/store.jsx';

store.dispatch(setAllProducts(products));
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
 <Provider store={store}>
  <App/>
    </Provider>
      </React.StrictMode>,
)
