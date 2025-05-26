import Navbar from './components/Navbar';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import { Toaster } from 'react-hot-toast';
import Footer from './components/Footer.jsx';
import { useAppContext } from './context/AppContext.jsx';
import Login from './components/Login.jsx';
import Meals from './pages/Meals.jsx';
import ProductCategories from './pages/ProductCategories.jsx';
import ProductsDetails from './pages/ProductsDetails.jsx';
import Cart from './pages/Cart.jsx';
import AddAddress from './pages/AddAddress.jsx';
import MyOrders from './pages/MyOrders.jsx';
import ProviderLogin from './components/provider/ProviderLogin.jsx';
import ProviderLayout from './pages/provider/ProviderLayout.jsx';
import AddProducts from './pages/provider/AddProducts.jsx';
import ProductList from './pages/provider/ProductList.jsx';
import Orders from './pages/provider/Orders.jsx';
import Loading from './components/Loading.jsx';
import Subscribe from './pages/Subscribe.jsx';
import AdminLogin from './components/Admin/AdminLogin.jsx';
import AdminLayout from './pages/Admin/AdminLayout.jsx';

const App = () => {
  const path = useLocation().pathname;
  const isProviderPath = path.includes('provider');
  const isAdminPath = path.includes('admin');
  const { showUserLogin, isProvider, isAdmin } = useAppContext();

  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      {!isProviderPath && !isAdminPath && <Navbar />}
      <Toaster />
      {showUserLogin ? <Login /> : null}

      {isProviderPath ? (
        <Routes>
          <Route path="/provider" element={isProvider ? <ProviderLayout /> : <ProviderLogin />} >
            <Route index element={isProvider ? <AddProducts /> : null} />
            <Route path="meal-list" element={<ProductList />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
      ) : isAdminPath ? (
        <Routes>
          <Route path="/admin" element={isAdmin ? <AdminLayout /> : <AdminLogin />} />
        </Routes>
      ) : (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/meals" element={<Meals />} />
            <Route path="/meals/:category" element={<ProductCategories />} />
            <Route path="/meals/:category/:id" element={<ProductsDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/add-address" element={<AddAddress />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/subscribe" element={<Subscribe />} />
            <Route path="/loader" element={<Loading />} />
          </Routes>
        </div>
      )}

      {!isProviderPath && !isAdminPath && <Footer />}
    </div>
  );
};

export default App;
