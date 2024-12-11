import { BrowserRouter,Routes,Route } from "react-router-dom"
import Navbar from "./Component/Navbar"
import Footer from "./Component/Footer"
import Home from "./Component/Pages/Home"
import Shop from "./Component/Pages/Shop"
import Contact from "./Component/Pages/Contact"
import About from "./Component/Pages/About"
import Electronics from "./Component/Pages/Electronics"
import Fashion from "./Component/Pages/Fashion"
import Sport from "./Component/Pages/Sport"
import Beauty from "./Component/Pages/Beauty"
import Cart from "../src/Component/Cart"
import HomeKitchen from "./Component/Pages/HomeKitchen"
import MenCollections from "./Component/Pages/MenCollection"
import WomenCollection from "./Component/Pages/WomenCollection"
import Checkout from "./Component/Checkout"
import DebitCardPayment from "./Component/DebitCardPayment"
import CreditCardPayment from "./Component/CreditCardPayment"
import OrderSummary from "./Component/OrderSummary"
import LoginPage from "./Component/LoginPage"
import ProductDetails from "./Component/ProductDetails"


function App() {

  return (
   <BrowserRouter>
   <Navbar/>
   <Routes>
    <Route path="/" element={<Home/>}>    </Route>
    <Route path="/electronics" element={<Electronics />} />
    <Route path="/fashion" element={<Fashion />} />
    <Route path="/sports" element={<Sport />} />
    <Route path="/homekitchen" element={<HomeKitchen />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/mencollection" element={<MenCollections />} />
    <Route path="/womencollection" element={<WomenCollection />} />
    <Route path="/loginpage" element={<LoginPage />} />
    <Route path="/product/:id" element={<ProductDetails />} />

    <Route path="/shop" element={<Shop/>}>    </Route>
    <Route path="/contact" element={<Contact/>}>    </Route>
    <Route path="/about" element={<About/>}>    </Route>
    <Route path="/beauty" element={<Beauty/>}>    </Route>
    <Route path="/checkout" element={<Checkout/>}>    </Route>
    <Route path="/debitcard" element={<DebitCardPayment/>}>    </Route>
    <Route path="/creditcard" element={<CreditCardPayment/>}>    </Route>
    <Route path="/ordersummary" element={<OrderSummary/>}>    </Route>


  </Routes>
   <Footer/>
   </BrowserRouter>
  )
}

export default App
