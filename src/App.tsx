import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import Billing from "./pages/Billing";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import FloatingActionButton from "./components/FloatingActionButton";

function App() {
  return (
    <Box minH="100vh" bg="gray.50" display="flex" flexDirection="column">
      <Navbar />
      <Box flex="1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/billing" element={<Billing />} />
        </Routes>
      </Box>
      <Footer />
      <FloatingActionButton />
    </Box>
  );
}

export default App;
