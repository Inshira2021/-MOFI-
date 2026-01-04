import React from 'react';
import { 
    FiMail, 
    FiMapPin, 
    FiHeart, 
    FiFilm, 
    FiCalendar, 
    FiEdit3,
    FiClock, 
    FiStar, 
    FiActivity
} from 'react-icons/fi';
import { DUMMY_USER_DATA, DUMMY_ACTIVITY } from '../../data/userData';
import MetricCard from '../profile/MetricCard';
import ActivityItem from '../profile/ActivityItem';

const ProfilePage = () => {
    const user = DUMMY_USER_DATA;

    return (
        <div className="flex-grow overflow-y-auto pr-0 lg:pr-4 px-4 lg:px-0">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-10 mt-4 text-white">
                Welcome, <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">{user.fullName.split(' ')[0]}</span>
            </h2>
            
            <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
                <div className="lg:w-1/3 space-y-6 md:space-y-8">
                    <div className="bg-gray-800 rounded-xl shadow-2xl p-4 md:p-6 relative ring-2 ring-amber-600/20">
                        <button className="absolute top-3 right-3 md:top-4 md:right-4 text-gray-400 hover:text-amber-500 transition">
                            <FiEdit3 className="w-4 h-4 md:w-5 md:h-5" />
                        </button>

                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 flex items-center justify-center text-3xl md:text-4xl font-bold border-4 border-amber-600 mb-3 md:mb-4 shadow-lg shadow-amber-900/50">
                                {user.fullName.charAt(0)}
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-white">{user.fullName}</h3>
                            <p className="text-amber-400 text-sm md:text-md font-medium">@{user.username}</p>
                        </div>
                        
                        <div className="mt-4 md:mt-6 pt-4 border-t border-gray-700 space-y-2 text-xs md:text-sm">
                            <div className="flex items-center space-x-2 text-gray-400">
                                <FiMapPin className="w-4 h-4 text-amber-600" />
                                <span>{user.location}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-400">
                                <FiMail className="w-4 h-4 text-amber-600" />
                                <span>{user.email}</span>
                            </div>
                            <div className="flex items-center space-x-2 text-gray-400">
                                <FiCalendar className="w-4 h-4 text-amber-600" />
                                <span>Joined: {user.memberSince}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-gray-800 rounded-xl p-4 md:p-6 shadow-xl">
                        <h4 className="text-lg md:text-xl font-bold mb-2 md:mb-3 text-white">About Me</h4>
                        <p className="text-gray-300 italic leading-relaxed text-sm md:text-base">"{user.bio}"</p>
                    </div>
                </div>
                
                <div className="lg:w-2/3 space-y-6 md:space-y-8">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                        <MetricCard icon={FiFilm} label="Total Reviews" value={user.totalReviews} unit="reviews" />
                        <MetricCard icon={FiClock} label="Watched Time" value={user.watchedHours} unit="hrs" />
                        <MetricCard icon={FiHeart} label="Favorite Genre" value={user.favoriteGenre.split(',')[0]} isText={true} />
                        <MetricCard icon={FiStar} label="Avg Pre-Release Score" value={user.preReleaseScoreGiven} unit="/10" color="text-yellow-400" />
                    </div>
                    
                    <div className="bg-gray-800 rounded-xl shadow-xl p-4 md:p-6">
                        <h4 className="text-lg md:text-xl font-bold mb-4 md:mb-5 text-white flex items-center">
                            <FiActivity className="w-4 h-4 md:w-5 md:h-5 mr-2 text-amber-600" /> Recent MOFI Activity
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

export default ProfilePage;
