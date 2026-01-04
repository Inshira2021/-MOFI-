import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiHeart, FiSettings, FiLogOut } from 'react-icons/fi';

const ProfileDropdown = ({ handleLogout, setCurrentPage, onClose }) => {
    const navigate = useNavigate();
    
    const pageToRoute = {
        'Profile': '/profile',
        'Favorites': '/favorites',
        'Settings': '/settings',
    };
    
    const dropdownItems = [
        { icon: FiUser, label: 'My Profile', page: 'Profile' },
        { icon: FiHeart, label: 'Favorites', page: 'Favorites' },
        { icon: FiSettings, label: 'Settings', page: 'Settings' },
        { icon: FiLogOut, label: 'Log Out', action: handleLogout, isDestructive: true },
    ];

    const handleClick = (item) => {
        if (item.action) {
            item.action();
        } else if (item.page) {
            const route = pageToRoute[item.page];
            if (route) navigate(route);
        }
        onClose();
    };

    return (
        <div 
            className="absolute right-0 mt-2 md:mt-3 w-44 md:w-48 bg-gray-700 rounded-lg shadow-xl py-1 z-30 ring-1 ring-white/10"
            onMouseLeave={onClose} 
        >
            {dropdownItems.map((item, index) => (
                <button
                    key={index}
                    onClick={() => handleClick(item)}
                    className={`w-full text-left flex items-center px-3 md:px-4 py-2 text-xs md:text-sm transition hover:bg-gray-600
                        ${item.isDestructive ? 'text-amber-500 hover:text-amber-400' : 'text-gray-200'}
                    `}
                >
                    <item.icon className="w-3.5 h-3.5 md:w-4 md:h-4 mr-2 md:mr-3" />
                    {item.label}
                </button>
            ))}
        </div>
    );
};

export default ProfileDropdown;
