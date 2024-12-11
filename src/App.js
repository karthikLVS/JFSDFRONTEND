
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import AdminHome from './components/AdminHome';
import UserHome from './components/UserHome';
import FacultyHome from './components/FacultyHome';
import ForgotPassword from './components/ForgotPassword';
import AboutUs from './components/AboutUs';
import Contact from './components/Contact';
import UserProfile from './components/UserProfile';
import ResourceDetail from './components/ResourceDetail';
import Welcome from './components/Welcome';
import ProvideFeedback from './components/ProvideFeedback';
import BuyBooks from './components/BuyBooks';
import PurchaseConfirmation from './components/PurchaseConfirmation'; // Ensure this component is correctly imported
import { UserProvider } from './components/UserContext'; // Ensure UserProvider is imported
import MyBooks from './components/MyBooks';
import BorrowBookPage from "./components/BorrowBookPage";
import BorrowBooksPage from './components/BorrowBooksPage';
import ReadBook from "./components/ReadBook";
import BuyReadBook from "./components/BuyReadBook";

function App() {
    return (
        <UserProvider>
            <Router>
                <Routes>
                    {/* Home and Authentication Routes */}
                    <Route path="/" element={<Welcome />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/contact" element={<Contact />} />
                    
                    {/* User, Faculty, Admin Routes */}
                    <Route path="/admin-home" element={<AdminHome />} />
                    <Route path="/user-home" element={<UserHome />} /> {/* Ensure this is the correct route for users */}
                    <Route path="/faculty-home" element={<FacultyHome />} />
                    
                    {/* User Profile and Resource Details */}
                    <Route path="/user-profile" element={<UserProfile />} />
                    <Route path="/resource/:id" element={<ResourceDetail />} /> {/* Dynamic Route for Resources */}
                    
                    {/* Additional Routes */}
                    <Route path="/provide-feedback" element={<ProvideFeedback />} />
                    <Route path="/buy-books" element={<BuyBooks />} />
                    <Route path="/purchase-confirmation" element={<PurchaseConfirmation />} /> {/* Purchase Confirmation Page */}
                    <Route path="/my-books" element={<MyBooks />} />
                    <Route path="/borrow/:id" element={<BorrowBookPage />} />
                    <Route path="/borrow-books" element={<BorrowBooksPage />} />
                    <Route path="/buy-read-book/:id" element={<BuyReadBook />} />
                    <Route path="/read-book/:id" element={<ReadBook />} />
                </Routes>
            </Router>
        </UserProvider>
    );
}

export default App;
