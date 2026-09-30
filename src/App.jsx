import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from './components/Footer'
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import ItemDetails from "./pages/ItemDetails";
import AddItem from "./pages/AddItem";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyItems from "./pages/MyItems";
import MyRequests from "./pages/MyRequests";
import RequestsReceived from "./pages/RequestsReceived";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/item/:id" element={<ItemDetails />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-items" element={<MyItems />} />
        <Route path="/my-requests" element={<MyRequests />} />
        <Route path="/requests-received" element={<RequestsReceived />} />
</Routes>

<Footer />
      
    </BrowserRouter>
  );
}

export default App;