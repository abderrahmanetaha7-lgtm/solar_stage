import Navbar from "../components/layout/Navbar";  
/* import Footer from "../components/layout/Footer";  */ 
// import FeaturedProductsHome from "../components/layout/FeaturedProductsHome";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";

export default function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />   
      </Routes>
    </>
  );
}
