import React, {useEffect} from "react";
import Header from "./components/Header";
import { Route, Routes, useLocation } from "react-router-dom";
import AddShoe from "./components/AddShoe";
import Shoes from "./components/Shoe/Shoes";
import ShoeDetail from "./components/Shoe/ShoeDetail";
import Login from "./components/LoginAndRegister/Login";
import Singup from "./components/LoginAndRegister/Signup";
import './App.css';

function App() {
    const location = useLocation();

    const shouldShowHeader = !["/", "/signup"].includes(location.pathname);

    return (
        <React.Fragment>
            {shouldShowHeader && (
                <header>
                    <Header />
                </header>
            )}
            <main>
                <Routes>
                    <Route path="/" element={<Login />} exact />
                    <Route path="/signup" element={<Singup />} exact />
                    <Route path="/add" element={<AddShoe />} exact />
                    <Route path="/shoes" element={<Shoes />} exact />
                    <Route path="/shoes/:id" element={<ShoeDetail />} exact />
                    <Route path="/:aaa" element={<Shoes />} exact />
                </Routes>
            </main>
        </React.Fragment>
    );
}

export default App;
