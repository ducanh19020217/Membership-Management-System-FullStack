// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './layout/MainLayout';
import IndividualMembers from './pages/IndividualMembers';
import GroupMembers from './pages/GroupMembers';
import Home from './pages/Home/Home';
import FundManagement from './pages/FundManagement';
import BirthdayManagement from './pages/BirthdayManagement';
import Login from './pages/Login/Login';
import NotFound from './pages/NotFound'; // Create this page for 404

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Index />}>
                    <Route path="individual-members" element={<IndividualMembers />} />
                    <Route path="group-members" element={<GroupMembers />} />
                    <Route path="fund-management" element={<FundManagement />} />
                    <Route path="birthday-management" element={<BirthdayManagement />} />
                    <Route path="*" element={<NotFound />} /> {/* 404 Page */}
                </Route>
                <Route path="/login" element={<Login />} />
            </Routes>
        </Router>
    );
}

export default App;
