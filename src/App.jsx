import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import Home from "./Component/Pages/Home";
import Shop from "./Component/Pages/Shop";
import Contact from "./Component/Pages/Contact";
import About from "./Component/Pages/About";
import Electronics from "./Component/Pages/Electronics";
import Fashion from "./Component/Pages/Fashion";
import Sport from "./Component/Pages/Sport";
import Beauty from "./Component/Pages/Beauty";
import Cart from "../src/Component/Cart";
import HomeKitchen from "./Component/Pages/HomeKitchen";
import MenCollections from "./Component/Pages/MenCollection";
import WomenCollection from "./Component/Pages/WomenCollection";
import Checkout from "./Component/Checkout";
import DebitCardPayment from "./Component/DebitCardPayment";
import CreditCardPayment from "./Component/CreditCardPayment";
import OrderSummary from "./Component/OrderSummary";
import LoginPage from "./Component/LoginPage";
import ProductDetails from "./Component/ProductDetails";
import AdminPage from "./Component/Pages/AdminPage";
import Success from "./Component/Success";

const Layout = ({ children }) => {
  const isLoginPage = useLocation().pathname === "/";

  return isLoginPage ? children : (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/success" element={<Success />} />

          <Route path="/home" element={<Home />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/fashion" element={<Fashion />} />
          <Route path="/sports" element={<Sport />} />
          <Route path="/homekitchen" element={<HomeKitchen />} />
          <Route path="/cart" element={<Cart />} />

          <Route path="/mencollection" element={<MenCollections />} />
          <Route path="/womencollection" element={<WomenCollection />} />
          <Route path="/product/:category" element={<ProductDetails />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/beauty" element={<Beauty />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/debitcard" element={<DebitCardPayment />} />
          <Route path="/creditcard" element={<CreditCardPayment />} />
          <Route path="/ordersummary" element={<OrderSummary />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
