// Components/Sidebar.jsx

import React, { useState } from 'react';
import {
    FiHome, FiUsers, FiSearch, FiClock, FiUser,
    FiGift, FiMusic, FiSettings, FiMenu, FiBell
} from 'react-icons/fi';
import ProfileDropdown from './ProfileDropdown';

const Sidebar = ({
    currentPage, setCurrentPage, activeTab, setActiveTab, onToggleSidebar,
    isLoggedIn, onOpenAuthModal, isProfileDropdownOpen, onToggleProfileDropdown, onLogout
}) => {
    const [isOpen, setIsOpen] = useState(true);
    const [showTopSearchBar, setShowTopSearchBar] = useState(false);

    const toggleSidebar = () => {
        const newState = !isOpen;
        setIsOpen(newState);
        onToggleSidebar(newState);
    };

    const menuItems = [
        { name: 'Home', icon: FiHome },
        { name: 'Community', icon: FiUsers },
        { name: 'Discovery', icon: FiSearch },
        { name: 'Coming soon', icon: FiClock },
    ];

    const socialItems = [
        { name: 'Friends', icon: FiUser },
        { name: 'Parties', icon: FiGift },
        { name: 'Media', icon: FiMusic },
    ];

    const generalItems = [
        { name: 'Settings', icon: FiSettings },
    ];

    const renderNavSection = (title, items) => (
        <div className="mb-6 md:mb-8">
            <h3 className="text-gray-500 text-xs uppercase font-semibold mb-2 md:mb-3 tracking-widest">
                {title}
            </h3>
            <nav>
                {items.map((item) => {
                    const isActive = item.name === currentPage;
                    return (
                        <a
                            key={item.name}
                            href="#"
                            onClick={(e) => { e.preventDefault(); setCurrentPage(item.name); }}
                            className={`flex items-center space-x-2 md:space-x-3 p-2 md:p-3 rounded-xl transition-colors duration-200 relative text-sm md:text-base
                                ${isActive
                                    ? 'bg-red-600 text-white font-medium'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-700'}
                            `}
                        >
                            {isActive && (
                                <span className="absolute right-0 w-1 h-8 bg-red-600 rounded-l-lg"></span>
                            )}
                            <item.icon className="w-5 h-5 flex-shrink-0" />
                            <span className="truncate">{item.name}</span>
                        </a>
                    );
                })}
            </nav>
        </div>
    );

    return (
        <>
            {/* TOP BAR */}
            <div className="bg-gray-800 text-white antialiased flex items-center justify-between px-4 md:px-6 py-3 fixed top-0 left-0 right-0 z-40 h-14 md:h-16">
                {/* Left: Menu + Logo */}
                <div className="flex items-center">
                    <button onClick={toggleSidebar} className="mr-2 md:mr-4 hover:text-red-500">
                        <FiMenu className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                    <span className="text-xl md:text-2xl font-extrabold tracking-tight whitespace-nowrap">
                        <span className="text-white">MO</span>
                        <span className="text-red-600">FI</span>
                    </span>
                </div>

                {/* Center: Tabs - hidden on mobile */}
                <div className="hidden md:flex space-x-4 lg:space-x-8 text-sm lg:text-lg font-medium">
                    {['TV Series', 'Movies', 'Animes'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => {
                                setCurrentPage(tab); // go to that page
                                setActiveTab(tab);
                            }}
                            className={`pb-1 transition whitespace-nowrap ${
                                currentPage === tab
                                    ? 'text-red-600 border-b-2 border-red-600'
                                    : 'text-gray-400 hover:text-white'
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Right: Icons / Auth */}
                <div className="flex items-center space-x-3 md:space-x-6 relative">
                    <FiSearch
                        className="w-5 h-5 md:w-6 md:h-6 text-gray-400 hover:text-white cursor-pointer"
                        onClick={() => setShowTopSearchBar(prev => !prev)}
                    />
                    {showTopSearchBar && (
                        <input
                            type="text"
                            placeholder="Search movies..."
                            className="absolute right-0 top-12 md:top-14 bg-gray-700 text-white rounded-lg px-4 py-2 w-[70vw] max-w-[16rem] md:w-64 border border-gray-600 focus:ring-1 focus:ring-red-600 text-sm"
                            autoFocus
                        />
                    )}
                    <FiBell className="hidden sm:block w-5 h-5 md:w-6 md:h-6 text-gray-400 hover:text-white cursor-pointer" />

                    <div className="relative">
                        {!isLoggedIn ? (
                            <button
                                onClick={onOpenAuthModal}
                                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-3 md:px-4 rounded-full text-sm whitespace-nowrap"
                            >
                                Sign In
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={onToggleProfileDropdown}
                                    className="block rounded-full overflow-hidden w-8 h-8 md:w-9 md:h-9 border-2 hover:border-red-600"
                                >
                                    <FiUser className="w-full h-full p-1 bg-gray-700" />
                                </button>
                                {isProfileDropdownOpen && (
                                    <ProfileDropdown
                                        handleLogout={onLogout}
                                        setCurrentPage={setCurrentPage}
                                        onClose={onToggleProfileDropdown}
                                    />
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Overlay for mobile */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden" 
                    onClick={toggleSidebar}
                />
            )}

            {/* SIDEBAR */}
            <div
                className={`bg-gray-800 text-white flex flex-col p-4 md:p-6 h-screen w-64 md:w-72 lg:w-64
                fixed top-0 left-0 z-30 transition-transform duration-300 ease-in-out
                pt-16 md:pt-20 overflow-y-auto ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                {/* Mobile Navigation Tabs */}
                <div className="md:hidden mb-6 pb-4 border-b border-gray-700">
                    <h3 className="text-gray-500 text-xs uppercase font-semibold mb-3 tracking-widest">Browse</h3>
                    <div className="space-y-1">
                        {['TV Series', 'Movies', 'Animes'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => {
                                    setCurrentPage(tab);
                                    setActiveTab(tab);
                                    toggleSidebar(); // Close sidebar after selection
                                }}
                                className={`w-full text-left px-3 py-2 rounded-lg transition text-sm ${
                                    currentPage === tab
                                        ? 'bg-red-600 text-white font-medium'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
                {renderNavSection('MENU', menuItems)}
                {renderNavSection('SOCIAL', socialItems)}
                {renderNavSection('GENERAL', generalItems)}
            </div>
        </>
    );
};

export default Sidebar;
