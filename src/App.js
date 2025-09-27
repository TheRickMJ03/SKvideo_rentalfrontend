import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Films from '../src/pages/Films';
import Home from '../src/pages/Home';
import Customer from '../src/pages/Customer';
import Navbar from '../src/components/Nav_bar/navbar';
import { NavProvider } from '../src/components/Nav_bar/Navcontext'; 


function App() {
  return (
    <NavProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />        
          <Route path="/Customer" element={<Customer />} /> 
          <Route path="/Films" element={<Films />} /> 
        </Routes>
      </BrowserRouter>
    </NavProvider>
  );
}

export default App;
