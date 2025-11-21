// App.jsx

import React, { useState } from 'react';
import Dashboard, { OtherPageContent } from './Components/Dashboard';
import Sidebar from './Components/Sidebar';
import AuthModal from './Components/AuthModal';
import ProfileDropdown from './Components/ProfileDropdown';
import ProfilePage from './Components/ProfilePage';

function App() {
    const [currentPage, setCurrentPage] = useState('Home');
    const [activeContentTab, setActiveContentTab] = useState('TV Series');

    // Authentication
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleLogin = () => {
        setIsLoggedIn(true);
        setIsAuthModalOpen(false);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsProfileDropdownOpen(false);
    };

    // ✅ Main render logic
    const renderMainContent = () => {
        // Show full Dashboard when Home is selected
        if (currentPage === 'Home') {
            return (
                <Dashboard
                    activeTab={activeContentTab}
                    setActiveTab={setActiveContentTab}
                />
            );
        }

        if (currentPage === 'Profile') {
            return <ProfilePage />;
        }
         
        // TV Series / Movies / Animes -> their own page
        if (['TV Series', 'Movies', 'Animes'].includes(currentPage)) {
            return <OtherPageContent key={currentPage} title={currentPage} isMainPage />;
        }

        // Other pages (Profile, Settings, Discovery, etc.)
        return <OtherPageContent key={currentPage} title={currentPage} isMainPage />;
    };

    return (
        <div className="flex min-h-screen bg-gray-900 text-white antialiased">
            {/* Sidebar */}
            <Sidebar
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
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
                className={`flex-1 bg-gray-900 transition-all duration-300 h-screen min-h-screen overflow-hidden
                pt-14 md:pt-20 px-0 md:px-4 lg:px-8 pb-0 md:pb-4 lg:pb-8 
                ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}
            >
                {renderMainContent()}
            </div>

            

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
