import {
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "./Component/Home";
import Merchant from "./Component/Merchant";
import Error from "./Component/Error";
import AddProduct from "./Component/AddProduct";
import AllProducts from "./Component/AllProducts";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Home />}>
        <Route path="/merchant" element={<Merchant />}></Route>
        <Route path="/addProduct" element={<AddProduct />}></Route>
        <Route path="/allproducts" element={<AllProducts />}></Route>
        <Route path="*" element={<Error />}></Route>
      </Route>
    </Route>
  )
);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
