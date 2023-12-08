
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Products from "./Products";
import DisplayAll from "./DisplayAll";
import Customers from "./Customers";
import DisplayAllCustomers from "./DisplayAllCustomers";

function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route element={<Products />} path="/products" />
          <Route element={<DisplayAll />} path="/displayall" />
          <Route element={<Customers />} path="/customers" />
          <Route element={<DisplayAllCustomers />} path="/displayallcustomers" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
