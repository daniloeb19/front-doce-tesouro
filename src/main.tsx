import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
createRoot(document.getElementById('root')!).render(
  <>
    <ToastContainer />
    <App />
  </>,
)
