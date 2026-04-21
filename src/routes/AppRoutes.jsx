import Navbar from "../components/layout/Navbar";
import FeaturedProductsHome from "../components/layout/FeaturedProductsHome";
import { Route, Routes } from "react-router-dom";

export default function AppRoutes() {
  return (
    <>
      <Navbar/>
      <FeaturedProductsHome/>
      {/* <Routes>
        <Route path="/" element={} />
        <Route path="/" element={} />
        <Route path="/" element={} />
        <Route path="/" element={} />
        <Route path="/" element={} />
        <Route path="/" element={} />
        <Route path="/" element={} />
      </Routes>  */}
    </>
  );
}
