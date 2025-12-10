// App.jsx

import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Dashboard, { OtherPageContent, allMoviesData } from './components/pages/Dashboard';
import Sidebar from './components/layout/Sidebar';
import AuthModal from './components/common/AuthModal';
import ProfileDropdown from './components/common/ProfileDropdown';
import ProfilePage from './components/pages/ProfilePage';
import MovieDetail from './components/pages/MovieDetail';
import Footer from './components/layout/Footer';

function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeContentTab, setActiveContentTab] = useState('TV Series');

    // Authentication
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Map routes to page names
    const routeToPageName = {
        '/': 'Home',
        '/home': 'Home',
        '/tv-series': 'TV Series',
        '/movies': 'Movies',
        '/animes': 'Animes',
        '/community': 'Community',
        '/discovery': 'Discovery',
        '/coming-soon': 'Coming soon',
        '/friends': 'Friends',
        '/parties': 'Parties',
        '/media': 'Media',
        '/settings': 'Settings',
        '/profile': 'Profile',
        '/login': 'Login',
    };

    const currentPage = routeToPageName[location.pathname] || 'Home';

    const handleLogin = () => {
        setIsLoggedIn(true);
        setIsAuthModalOpen(false);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsProfileDropdownOpen(false);
        navigate('/');
    };

    const handleNavigation = (pageName) => {
        const route = Object.keys(routeToPageName).find(
            key => routeToPageName[key] === pageName
        );
        if (route) {
            navigate(route);
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white antialiased">
            <div className="flex flex-1 overflow-hidden">
            {/* Sidebar */}
            <Sidebar
                currentPage={currentPage}
                setCurrentPage={handleNavigation}
                activeTab={activeContentTab}
                setActiveTab={setActiveContentTab}
                onToggleSidebar={setIsSidebarOpen}
                isLoggedIn={isLoggedIn}
                onOpenAuthModal={() => setIsAuthModalOpen(true)}
                isProfileDropdownOpen={isProfileDropdownOpen}
                onToggleProfileDropdown={() => setIsProfileDropdownOpen(prev => !prev)}
                onLogout={handleLogout}
            />

            {/* Main Content */}
            <div
                className={`flex-1 bg-gray-900 transition-all duration-300 overflow-y-auto
                pt-14 md:pt-20 px-0 md:px-4 lg:px-8 pb-0
                ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}
            >
                <Routes>
                    <Route path="/" element={
                        <Dashboard
                            activeTab={activeContentTab}
                            setActiveTab={setActiveContentTab}
                        />
                    } />
                    <Route path="/home" element={
                        <Dashboard
                            activeTab={activeContentTab}
                            setActiveTab={setActiveContentTab}
                        />
                    } />
                    <Route path="/tv-series" element={<OtherPageContent title="TV Series" />} />
                    <Route path="/movies" element={<OtherPageContent title="Movies" />} />
                    <Route path="/movie/:id" element={<MovieDetail allMovies={allMoviesData} />} />
                    <Route path="/animes" element={<OtherPageContent title="Animes" />} />
                    <Route path="/community" element={<OtherPageContent title="Community" />} />
                    <Route path="/discovery" element={<OtherPageContent title="Discovery" />} />
                    <Route path="/coming-soon" element={<OtherPageContent title="Coming soon" />} />
                    <Route path="/friends" element={<OtherPageContent title="Friends" />} />
                    <Route path="/parties" element={<OtherPageContent title="Parties" />} />
                    <Route path="/media" element={<OtherPageContent title="Media" />} />
                    <Route path="/settings" element={<OtherPageContent title="Settings" />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/login" element={
                        <AuthModal
                            onClose={() => navigate('/')}
                            onLoginSuccess={handleLogin}
                        />
                    } />
                </Routes>
            </div>
            </div>

            {/* Footer - Full Width */}
            <Footer />

            {/* Auth Modal */}
            {isAuthModalOpen && (
                <AuthModal
                    onClose={() => setIsAuthModalOpen(false)}
                    onLoginSuccess={handleLogin}
                />
            )}
        </div>
    );
}

export default App;
