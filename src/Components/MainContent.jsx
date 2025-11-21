import React, { useState } from 'react';
import { FiSearch, FiBell, FiUser, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { FiClock } from "react-icons/fi";

// --- DUMMY DATA ---

// Artist data (for the main content area carousel)
const allArtists = [
  { name: 'Charlize Theron', movies: '+12 Movies', src: 'public/charlize theron.jpg' },
  { name: 'Laurence Fishburne', movies: '+27 Movies', src: 'public/Laurence Fishburne.jpg' },
  { name: 'Martin Freeman', movies: '+10 Movies', src: 'public/Martin Freeman.jpg' },
  { name: 'Keanu Reeves', movies: '+27 Movies', src: 'public/Keanu Reeves.jpg' },
  { name: 'Tom Hanks', movies: '+15 Movies', src: 'public/tom hanks.jpg' }, 
  { name: 'Scarlett Johansson', movies: '+20 Movies', src: 'public/scarlett johansson.jpg' },
  { name: 'Denzel Washington', movies: '+30 Movies', src: 'public/denzel washington.jpg' },
  { name: 'Zendaya', movies: '+8 Movies', src: 'public/zendaya.jpg' },
];
const ARTISTS_PER_PAGE = 4;

// Continue Watching movie data (for the main content area carousel)
const allContinueWatching = [
    { name: 'Matrix Revolution', progress: 75, src: "public/Matrix Revolution.jpg" },
    { name: 'Deadpool', progress: 50, src: "public/Deadpool.jpg" },
    { name: 'Lord of the Rings', progress: 30, src: "public/Lord of the Rings.jpg" },
    { name: 'Interstellar', progress: 90, src: "public/Interstellar.jpg" },
    { name: 'Inception', progress: 20, src: "public/Inception.jpg" },
];
const MOVIES_PER_PAGE = 3;

// Popular Movies data (for the right sidebar - EXTENDED)
const popularMoviesData = [
    { name: 'John Wick', genre: 'Action, Horror', rating: 7.4, src: "public/John Wick.jpg" },
    { name: 'Mad Max', genre: 'Action, Adventure', rating: 8.1, src: "public/Mad Max.jpg" },
    { name: 'Ip Man 2', genre: 'Action, Biography', rating: 7.2, src: "public/Ip Man 2.jpg" },
    // Extra Popular Movies
    { name: 'Extraction 2', genre: 'Action, Thriller', rating: 7.0, src: "public/Extraction 2.jpg" },
    { name: 'Mission Impossible', genre: 'Spy, Action', rating: 8.0, src: "public/Mission Impossible.jpg" },
    { name: 'The Dark Knight', genre: 'Action, Crime', rating: 9.0, src: "public/The Dark Knight.jpg" },
];
const INITIAL_POPULAR_LIMIT = 3; // Initially show 3

// Favorites data (for the right sidebar - EXTENDED)
const favoritesData = [
    { name: 'Hobbit 1', genre: 'Adventure, Fantasy', rating: 7.8, src: "public/Hobbit 1.jpg" },
    { name: 'I Am Legend', genre: 'Action, Adventure', rating: 7.2, src: "public/I Am Legend.jpg" },
    { name: 'Avatar', genre: 'Action, Adventure', rating: 7.8, src: "public/Avatar.jpg" },
    // Extra Favorites Movies
    { name: 'Dune', genre: 'Sci-Fi, Adventure', rating: 8.1, src: "public/Dune.jpg" },
    { name: 'The Martian', genre: 'Sci-Fi, Drama', rating: 7.9, src: "public/The Martian.jpg" },
];
const INITIAL_FAVORITES_LIMIT = 3; // Initially show 3


const MainContent = () => {
  // State for Best Artists carousel (Unchanged)
  const [artistStartIndex, setArtistStartIndex] = useState(0);
  // State for Continue Watching carousel (Unchanged)
  const [movieStartIndex, setMovieStartIndex] = useState(0);
  
  // *** NEW STATE for "See More" functionality ***
  const [popularMoviesLimit, setPopularMoviesLimit] = useState(INITIAL_POPULAR_LIMIT);
  const [favoritesLimit, setFavoritesLimit] = useState(INITIAL_FAVORITES_LIMIT);

  // --- Carousel Logic for Main Content (Unchanged) ---
  const visibleArtists = allArtists.slice(artistStartIndex, artistStartIndex + ARTISTS_PER_PAGE);
  const goToNextArtists = () => { if (artistStartIndex + ARTISTS_PER_PAGE < allArtists.length) setArtistStartIndex(artistStartIndex + ARTISTS_PER_PAGE); };
  const goToPrevArtists = () => { if (artistStartIndex > 0) setArtistStartIndex(artistStartIndex - ARTISTS_PER_PAGE); };

  const visibleMovies = allContinueWatching.slice(movieStartIndex, movieStartIndex + MOVIES_PER_PAGE);
  const goToNextMovies = () => { if (movieStartIndex + MOVIES_PER_PAGE < allContinueWatching.length) setMovieStartIndex(movieStartIndex + MOVIES_PER_PAGE); };
  const goToPrevMovies = () => { if (movieStartIndex > 0) setMovieStartIndex(movieStartIndex - MOVIES_PER_PAGE); };

  // --- Click Handlers for "See More" Buttons (Updated) ---
  const handleSeeMorePopular = () => {
    // Set limit to the full length of the data array
    setPopularMoviesLimit(popularMoviesData.length);
  };
  
  const handleSeeMoreFavorites = () => {
    // Set limit to the full length of the data array
    setFavoritesLimit(favoritesData.length);
  };

  // --- Visibility check for the "See More" button ---
  const showPopularSeeMore = popularMoviesLimit < popularMoviesData.length;
  const showFavoritesSeeMore = favoritesLimit < favoritesData.length;


  // --- Filtered Lists for Rendering ---
  const visiblePopularMovies = popularMoviesData.slice(0, popularMoviesLimit);
  const visibleFavorites = favoritesData.slice(0, favoritesLimit);

  return (
    <div className="flex-1 bg-gray-900 p-8 overflow-y-auto"> 
      
      {/* --- Top Header (Unchanged) --- */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex space-x-6 text-lg font-medium">
          <a href="#" className="text-red-600 border-b-2 border-red-600 pb-1">TV Series</a>
          <a href="#" className="text-gray-400 hover:text-white pb-1">Movies</a>
          <a href="#" className="text-gray-400 hover:text-white pb-1">Animes</a>
        </div>
        <div className="flex items-center space-x-6">
          <FiSearch className="w-6 h-6 text-gray-400 cursor-pointer hover:text-white" />
          <FiBell className="w-6 h-6 text-gray-400 cursor-pointer hover:text-white" />
          <FiUser className="w-6 h-6 text-gray-400 cursor-pointer hover:text-white" />
        </div>
      </div>

      {/* --- Main Content Layout: Fixed Height for Independent Scrolling --- */}
      <div className="flex gap-8 h-[calc(100vh-80px)]"> 
        
        {/* Left/Middle Area (Hero, Artists, Continue Watching) - Scrolls independently */}
        <div className="flex-grow overflow-y-auto pr-4"> 
          
          {/* --- Hero Section Placeholder (Unchanged) --- */}
          <div className="relative w-full h-96 bg-gray-700 rounded-lg overflow-hidden mb-10">
            {/* ... (Hero content) ... */}
            <img src="public/the-tomorrow-war.jpg" alt="Hero Background" className="absolute inset-0 w-full h-full object-cover opacity-60"/>
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent p-8 flex flex-col justify-end">
              <span className="text-red-600 text-sm font-semibold mb-2">ACTION, ADVENTURE, COMEDY</span>
              <h2 className="text-5xl font-bold mb-4">THE TOMORROW WAR</h2>
              <p className="text-gray-300 mb-6 w-2/3">The Tomorrow War (2021) is a sci-fi action film directed by Chris McKay and written by Zach Dean. Starring Chris Pratt, Yvonne Strahovski, and J.K. Simmons, it follows time travellers from 2051 who warn humanity of a future alien war. To save the planet, people are sent to fight in the future — including Dan Forester, who joins forces with a scientist and his estranged father to secure humanity’s survival.</p>
              <div className="flex items-center space-x-4">
                <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-colors duration-200">
                  <FiClock className="inline-block mr-2" /> Watch
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-full transition-colors duration-200">
                  + Add to List
                </button>
              </div>
            </div>
          </div>

          {/* --- Best Artists Section (Functional Carousel) --- */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Best Artists</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={goToPrevArtists} 
                  disabled={artistStartIndex === 0}
                  className={`p-2 rounded-full transition-colors 
                    ${artistStartIndex === 0 ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-gray-700 hover:bg-red-600 text-white'}`}
                >
                  <FiChevronLeft className="w-5 h-5"/>
                </button>
                <button 
                  onClick={goToNextArtists} 
                  disabled={artistStartIndex + ARTISTS_PER_PAGE >= allArtists.length}
                  className={`p-2 rounded-full transition-colors 
                    ${artistStartIndex + ARTISTS_PER_PAGE >= allArtists.length ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-gray-700 hover:bg-red-600 text-white'}`}
                >
                  <FiChevronRight className="w-5 h-5"/>
                </button>
              </div>
            </div>
            <div className="flex space-x-4">
              {visibleArtists.map((artist) => (
                <div key={artist.name} className="flex-shrink-0 w-48 bg-gray-800 rounded-lg p-4 text-center">
                  <img src={artist.src} alt={artist.name} className="w-24 h-24 rounded-full object-cover mx-auto mb-3 border-2 border-red-600"/>
                  <h3 className="font-semibold text-lg">{artist.name}</h3>
                  <p className="text-gray-400 text-sm">{artist.movies}</p>
                  <button className="mt-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full hover:bg-red-700 transition-colors">+</button>
                </div>
              ))}
            </div>
          </div>

          {/* --- Continue Watching Section (Functional Carousel) --- */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Continue Watching</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={goToPrevMovies}
                  disabled={movieStartIndex === 0}
                  className={`p-2 rounded-full transition-colors 
                    ${movieStartIndex === 0 ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-gray-700 hover:bg-red-600 text-white'}`}
                >
                  <FiChevronLeft className="w-5 h-5"/>
                </button>
                <button 
                  onClick={goToNextMovies}
                  disabled={movieStartIndex + MOVIES_PER_PAGE >= allContinueWatching.length}
                  className={`p-2 rounded-full transition-colors 
                    ${movieStartIndex + MOVIES_PER_PAGE >= allContinueWatching.length ? 'bg-gray-800 text-gray-500 cursor-not-allowed' : 'bg-gray-700 hover:bg-red-600 text-white'}`}
                >
                  <FiChevronRight className="w-5 h-5"/>
                </button>
              </div>
            </div>
            <div className="flex space-x-4">
              {visibleMovies.map((movie) => (
                <div key={movie.name} className="flex-shrink-0 w-64 bg-gray-800 rounded-lg overflow-hidden">
                  <img src={movie.src} alt={movie.name} className="w-full h-36 object-cover"/>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{movie.name}</h3>
                    <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                      <div className="bg-red-600 h-1.5 rounded-full" style={{width: `${movie.progress}%`}}></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- Right Sidebar (Popular Movies & Favorites) - Scrolls independently --- */}
        <div className="w-full lg:w-80 flex-shrink-0 overflow-y-auto pb-8"> 
          
          {/* Search Input (Unchanged) */}
          <div className="relative mb-8">
            <input type="text" placeholder="Search" className="w-full bg-gray-800 text-white rounded-full py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-red-600"/>
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>

          {/* Popular Movies */}
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Popular Movies</h3>
            <div className="space-y-4">
              {/* Render VISIBLE popular movies */}
              {visiblePopularMovies.map((movie, index) => (
                 <div key={index} className="flex items-center space-x-3 bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition-colors">
                    <img src={movie.src} alt={movie.name} className="w-16 h-16 object-cover rounded-lg"/>
                    <div>
                        <p className="font-semibold">{movie.name}</p>
                        <p className="text-gray-400 text-sm">{movie.genre}</p>
                        <span className="text-yellow-400 text-sm font-bold flex items-center">
                            <span className="text-base mr-1">⭐</span>{movie.rating}
                        </span>
                    </div>
                </div>
              ))}
              
              {/* See More Button - ONLY shown if there are more movies to display */}
              {showPopularSeeMore && (
                <button 
                  onClick={handleSeeMorePopular}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-full mt-4 transition-colors"
                >
                  See More ({popularMoviesData.length - visiblePopularMovies.length} more)
                </button>
              )}
            </div>
          </div>

          {/* Favorites */}
          <div>
            <h3 className="text-xl font-bold mb-4">Favorites</h3>
            <div className="space-y-4">
               {/* Render VISIBLE favorites */}
              {visibleFavorites.map((movie, index) => (
                 <div key={index} className="flex items-center space-x-3 bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition-colors">
                    <img src={movie.src} alt={movie.name} className="w-16 h-16 object-cover rounded-lg"/>
                    <div>
                        <p className="font-semibold">{movie.name}</p>
                        <p className="text-gray-400 text-sm">{movie.genre}</p>
                        <span className="text-yellow-400 text-sm font-bold flex items-center">
                            <span className="text-base mr-1">⭐</span>{movie.rating}
                        </span>
                    </div>
                </div>
              ))}

              {/* See More Button - ONLY shown if there are more movies to display */}
              {showFavoritesSeeMore && (
                <button 
                  onClick={handleSeeMoreFavorites}
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-full mt-4 transition-colors"
                >
                  See More ({favoritesData.length - visibleFavorites.length} more)
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;