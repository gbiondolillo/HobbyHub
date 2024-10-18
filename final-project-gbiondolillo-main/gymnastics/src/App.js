import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import PostPage from './components/PostPages/PostPage';
import '../src/App.css';

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/post/:id' element={<PostPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
