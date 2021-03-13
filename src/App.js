import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';

 import { signout } from './actions/userActions';
// import AdminRoute from './components/AdminRoute';
// import PrivateRoute from './components/PrivateRoute';
// import CartScreen from './screens/CartScreen';
// import ChatBox from './components/ChatBox';
// import HomeScreen from './screens/HomeScreen';
// import OrderHistoryScreen from './screens/OrderHistoryScreen';
// import OrderScreen from './screens/OrderScreen';
// import PaymentMethodScreen from './screens/PaymentMethodScreen';
// import PlaceOrderScreen from './screens/PlaceOrderScreen';
// import ProductListScreen from './screens/ProductListScreen';
// import ProductScreen from './screens/ProductScreen';
// import ProfileScreen from './screens/ProfileScreen';
// import RegisterScreen from './screens/RegisterScreen';
// import ShippingAddressScreen from './screens/ShippingAddressScreen';
// import SigninScreen from './screens/SigninScreen';
// import ProductEditScreen from './screens/ProductEditScreen';
// import OrderListScreen from './screens/OrderListScreen';
// import UserListScreen from './screens/UserListScreen';
// import UserEditScreen from './screens/UserEditScreen';
// import SellerRoute from './components/SellerRoute';
// import SellerScreen from './screens/SellerScreen';
// import SearchBox from './components/SearchBox';
// import SearchScreen from './screens/SearchScreen';
 import { listProductCategories } from './actions/productActions';
// import LoadingBox from './components/LoadingBox';
// import MessageBox from './components/MessageBox';
// import MapScreen from './screens/MapScreen';

// using lazy


const Signout = lazy(() => import('./actions/userActions') );
const AdminRoute = lazy(() => import( './components/AdminRoute') );
const PrivateRoute = lazy(() => import( './components/PrivateRoute') );
const CartScreen = lazy(() => import( './screens/CartScreen') );
const ChatBox = lazy(() => import( './components/ChatBox') );
const HomeScreen = lazy(() => import( './screens/HomeScreen') );
const OrderHistoryScreen = lazy(() => import( './screens/OrderHistoryScreen') );
const OrderScreen = lazy(() => import( './screens/OrderScreen') );
const PaymentMethodScreen = lazy(() => import( './screens/PaymentMethodScreen') );
const PlaceOrderScreen = lazy(() => import( './screens/PlaceOrderScreen') );
const ProductListScreen = lazy(() => import( './screens/ProductListScreen') );
const ProductScreen = lazy(() => import( './screens/ProductScreen') );
const ProfileScreen = lazy(() => import( './screens/ProfileScreen') );
const RegisterScreen = lazy(() => import( './screens/RegisterScreen') );
const ShippingAddressScreen = lazy(() => import( './screens/ShippingAddressScreen') );
const SigninScreen = lazy(() => import( './screens/SigninScreen') );
const ProductEditScreen = lazy(() => import( './screens/ProductEditScreen') );
const OrderListScreen = lazy(() => import( './screens/OrderListScreen') );
const UserListScreen = lazy(() => import( './screens/UserListScreen') );
const UserEditScreen = lazy(() => import( './screens/UserEditScreen') );
const SellerRoute = lazy(() => import( './components/SellerRoute') );
const SellerScreen = lazy(() => import( './screens/SellerScreen') );
const SearchBox = lazy(() => import( './components/SearchBox') );
const SearchScreen = lazy(() => import( './screens/SearchScreen') );
// const { listProductCategories } = lazy(() => import( './actions/productActions') );
const LoadingBox = lazy(() => import( './components/LoadingBox') );
const MessageBox = lazy(() => import( './components/MessageBox') );
const MapScreen = lazy(() => import( './screens/MapScreen') );


function App() {
  const cart = useSelector((state) => state.cart);
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false);
  const { cartItems } = cart;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const productCategoryList = useSelector((state) => state.productCategoryList);
  const {
    loading: loadingCategories,
    error: errorCategories,
    categories,
  } = productCategoryList;
  useEffect(() => {
    dispatch(listProductCategories());
  }, [dispatch]);
  return (
    <Suspense fallback={
      <div className=" danger">

        Adozen Inc
      </div>
    }>
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
          <sup>
              <img
                className="small"
                src="/images/FF-01-removebg-preview.png"
              ></img></sup>
            <button
              type="button"
              className="open-sidebar"
              onClick={() => setSidebarIsOpen(true)}
            >
              <i className="fa fa-bars"></i>
            </button>
            <Link className="brand" to="/">
              adozen.us
            </Link>
          </div>
          <div>
            <Route
              render={({ history }) => (
                <SearchBox history={history}></SearchBox>
              )}
            ></Route>
          </div>
          <div>
            <Link to="/cart">
              Cart
              {cartItems.length > 0 && (
               <sup> <span className="badge">{cartItems.length}</span></sup>
              )}
            </Link>
            {userInfo ? (
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
                  <li>
                    <Link to="/orderhistory">Order History</Link>
                  </li>
                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
            {userInfo && userInfo.isSeller && (
              <div className="dropdown">
                <Link to="#admin">
                  Seller <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/productlist/seller">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist/seller">Orders</Link>
                  </li>
                </ul>
              </div>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/productlist">Products</Link>
                  </li>
                  <li>
                    <Link to="/orderlist">Orders</Link>
                  </li>
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <aside className={sidebarIsOpen ? 'open' : ''}>
          <ul className="categories">
            <li>
              <strong>Categories</strong>
              <button
                onClick={() => setSidebarIsOpen(false)}
                className="close-sidebar"
                type="button"
              >
                <i className="fa fa-close"></i>
              </button>
            </li>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              categories.map((c) => (
                <li key={c}>
                  <Link
                    to={`/search/category/${c}`}
                    onClick={() => setSidebarIsOpen(false)}
                  >
                    {c}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </aside>
        <main>
          <Route path="/seller/:id" component={SellerScreen}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
          <Route path="/product/:id" component={ProductScreen} exact></Route>
          <Route
            path="/product/:id/edit"
            component={ProductEditScreen}
            exact
          ></Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
          <Route
            path="/search/name/:name?"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name"
            component={SearchScreen}
            exact
          ></Route>
          <Route
            path="/search/category/:category/name/:name/min/:min/max/:max/rating/:rating/order/:order/pageNumber/:pageNumber"
            component={SearchScreen}
            exact
          ></Route>
          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
          <PrivateRoute path="/map" component={MapScreen}></PrivateRoute>
          <AdminRoute
            path="/productlist"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/productlist/pageNumber/:pageNumber"
            component={ProductListScreen}
            exact
          ></AdminRoute>
          <AdminRoute
            path="/orderlist"
            component={OrderListScreen}
            exact
          ></AdminRoute>
          <AdminRoute path="/userlist" component={UserListScreen}></AdminRoute>
          <AdminRoute
            path="/user/:id/edit"
            component={UserEditScreen}
          ></AdminRoute>
          <SellerRoute
            path="/productlist/seller"
            component={ProductListScreen}
          ></SellerRoute>
          <SellerRoute
            path="/orderlist/seller"
            component={OrderListScreen}
          ></SellerRoute>

          <Route path="/" component={HomeScreen} exact></Route>
        </main>
        <footer className="row ">
        
          <Link className="" to="/">
             &copy; {Date().split` `[3]} Adozen Inc.
             </Link>
           
             
            <Link className=" " to="/about-us">
              About Us
            </Link>
          
           
        
             
            <Link className=" " to="/terms">
              Terms of Use
            </Link>
          
             
             <Link className=" " to="/investor-relations">
               Investor Relations
             </Link>
          
             
             <Link className="" to="/privacy">
               Privacy
             </Link>
           
             
             <Link className=" " to="/customer-service">
               Returns
             </Link>
           
             
             <Link className=" " to="/">
               Contact Us
             </Link>
             
           
           
           {userInfo && !userInfo.isAdmin && <ChatBox userInfo={userInfo}><i class="fa fa-commenting-o" aria-hidden="true"></i></ChatBox>}
          
          <p>All right reserved</p>
          </footer>
      </div>
    </BrowserRouter>
    </Suspense>
  );
}

export default App;
