// Components/ProfilePage.jsx

import React from 'react';
import { 
    FiMail, 
    FiMapPin, 
    FiHeart, 
    FiFilm, 
    FiCalendar, 
    FiEdit3,
    // 🚨 MISSING ICONS ADDED HERE 🚨
    FiClock, 
    FiStar, 
    FiActivity, 
    FiMessageSquare, 
    FiList, 
    FiZap 
    // 🚨 END OF MISSING ICONS 🚨
} from 'react-icons/fi';

// For a real application, this data would come from the user context/API call
const DUMMY_USER_DATA = {
    fullName: "Inshira Fathi",
    email: "fathimainshira2002@gmai.com",
    username: "Inshira2021",
    location: "kurunegala, SL",
    memberSince: "Nov 2025",
    bio: "Passionate film critic and binge-watcher. I believe a movie's true score is determined by its ability to satisfy the pre-release hype! Always searching for the next 'Certified Fresh' masterpiece.",
    favoriteGenre: "Sci-Fi, Action, Thriller",
    totalReviews: 45,
    watchedHours: 1200,
    preReleaseScoreGiven: 8.5, // New unique metric
};

// Dummy data for user activity feed
const DUMMY_ACTIVITY = [
    { type: "Review", movie: "The Martian", rating: 4.5, time: "2 hours ago" },
    { type: "Watchlist", movie: "Dune: Part Two", time: "1 day ago" },
    { type: "Pre-Review", movie: "Upcoming Cyberpunk Saga", rating: 9.0, time: "3 days ago" },
];

const ProfilePage = () => {
    const user = DUMMY_USER_DATA;

    return (
        <div className="flex-grow overflow-y-auto pr-0 lg:pr-4 px-4 lg:px-0">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-10 mt-4 text-white">
                Welcome, <span className="text-red-600">{user.fullName.split(' ')[0]}</span>
            </h2>
            
            <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                
                {/* --- Left Column: Summary and Bio --- */}
                <div className="lg:w-1/3 space-y-6 md:space-y-8">
                    
                    {/* Profile Card */}
                    <div className="bg-gray-800 rounded-xl shadow-2xl p-4 md:p-6 relative ring-2 ring-red-600/20">
                        
                        {/* Edit Button */}
                        <button className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-400 hover:text-red-500 transition">
                            <FiEdit3 className="w-4 h-4 md:w-5 md:h-5" />
                        </button>

                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-700 flex items-center justify-center text-3xl md:text-4xl font-bold border-4 border-red-600 mb-3 md:mb-4">
                                {user.fullName.charAt(0)}
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-white">{user.fullName}</h3>
                            <p className="text-red-400 text-sm md:text-md font-medium">@{user.username}</p>
                        </div>
                        
                        <div className="mt-4 md:mt-6 pt-4 border-t border-gray-700 space-y-2 text-xs md:text-sm">
                            <div className="flex items-center space-x-2 text-gray-400">
                                <FiMapPin className="w-4 h-4 text-red-600" />
                                <span>{user.location}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-400">
                                <FiMail className="w-4 h-4 text-red-600" />
                                <span>{user.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-400">
                                <FiCalendar className="w-4 h-4 text-red-600" />
                                <span>Joined: {user.memberSince}</span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Bio Section */}
                    <div className="bg-gray-800 rounded-xl p-4 md:p-6 shadow-xl">
                        <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-white">About Me</h4>
                        <p className="text-gray-300 italic leading-relaxed text-sm md:text-base">"{user.bio}"</p>
                    </div>
                </div>
                
                {/* --- Right Column: Metrics and Activity --- */}
                <div className="lg:w-2/3 space-y-6 md:space-y-8">
                    
                    {/* User Metrics Grid */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                        <MetricCard icon={FiFilm} label="Total Reviews" value={user.totalReviews} unit="reviews" />
                        <MetricCard icon={FiClock} label="Watched Time" value={user.watchedHours} unit="hrs" />
                        <MetricCard icon={FiHeart} label="Favorite Genre" value={user.favoriteGenre.split(',')[0]} isText={true} />
                        <MetricCard icon={FiStar} label="Avg Pre-Release Score" value={user.preReleaseScoreGiven} unit="/10" color="text-yellow-400" />
                    </div>
                    
                    {/* Activity Feed */}
                    <div className="bg-gray-800 rounded-xl shadow-xl p-4 md:p-6">
                        <h4 className="text-lg md:text-xl font-bold mb-4 md:mb-5 text-white flex items-center">
                            <FiActivity className="w-4 h-4 md:w-5 md:h-5 mr-2 text-red-600" /> Recent MOFI Activity
                        </h4>
                        
                        <div className="space-y-3 md:space-y-4">
                            {DUMMY_ACTIVITY.map((activity, index) => (
                                <ActivityItem key={index} {...activity} />
                            ))}
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

// Helper Components
const MetricCard = ({ icon: Icon, label, value, unit, isText, color = 'text-red-400' }) => (
    <div className="bg-gray-900 p-3 md:p-4 rounded-xl text-center border border-gray-700 hover:border-red-600 transition duration-300">
        <Icon className={`w-5 h-5 md:w-6 md:h-6 mx-auto mb-2 ${color}`} />
        <p className="text-gray-400 text-xs uppercase font-medium truncate">{label}</p>
        {isText ? (
            <p className="text-white text-sm md:text-md font-bold truncate mt-1">{value}</p>
        ) : (
            <p className="text-white text-xl md:text-2xl font-extrabold mt-1">
                {value}<span className="text-xs md:text-sm font-semibold ml-1 text-gray-400">{unit}</span>
            </p>
        )}
    </div>
);

const ActivityItem = ({ type, movie, rating, time }) => {
    let typeColor = 'text-green-400';
    let typeIcon = <FiStar className="w-5 h-5" />; // Default icon

    if (type === 'Review') {
        typeColor = 'text-yellow-400';
        typeIcon = <FiMessageSquare className="w-5 h-5" />;
    } else if (type === 'Watchlist') {
        typeColor = 'text-blue-400';
        typeIcon = <FiList className="w-5 h-5" />;
    } else if (type === 'Pre-Review') {
        typeColor = 'text-red-400';
        typeIcon = <FiZap className="w-5 h-5" />;
    }

    return (
        <div className="flex items-start p-2 md:p-3 bg-gray-900 rounded-lg hover:bg-gray-700 transition space-x-3 md:space-x-4">
            <div className={`p-1.5 md:p-2 rounded-full ${typeColor} bg-gray-800 flex-shrink-0`}>
                {typeIcon}
            </div>
            <div className="flex-grow min-w-0">
                <p className="text-white font-medium flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm md:text-base">
                    <span className="truncate">
                        {type === 'Watchlist' 
                            ? `Added "${movie}" to Watchlist`
                            : type === 'Pre-Review'
                            ? `Gave a Pre-Release Score for "${movie}"`
                            : `Posted a Review for "${movie}"`}
                    </span>
                    
                    {rating && (
                        <span className="text-sm font-bold text-yellow-400 flex items-center ml-4">
                            ⭐ {rating}
                        </span>
                    )}
                </p>
                <p className="text-gray-400 text-xs mt-0.5">{time}</p>
            </div>
        </div>
    );
};

// Removed redundant re-exports

export default ProfilePage;