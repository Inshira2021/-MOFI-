import React, { useState, useEffect } from 'react';
import { FiSearch, FiBell, FiUser, FiChevronLeft, FiChevronRight, FiClock, FiMenu } from 'react-icons/fi';

// --- DUMMY DATA ---
const ARTISTS_PER_PAGE = 4;
const INITIAL_POPULAR_LIMIT = 3;
const INITIAL_FAVORITES_LIMIT = 3;
const DUMMY_MOVIE_DESCRIPTION = "Explore this movie's captivating plot, thrilling action sequences, and stellar cast. Click 'Watch' to start streaming!";

const popularMoviesData = [
  { id: 1, name: 'John Wick', genre: 'Action, Horror', rating: 7.4, src: "public/John Wick.jpg", heroSrc: "public/John Wick.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  { id: 2, name: 'Mad Max', genre: 'Action, Adventure', rating: 8.1, src: "public/Mad Max.jpg", heroSrc: "public/Mad Max.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  { id: 3, name: 'Ip Man 2', genre: 'Action, Biography', rating: 7.2, src: "public/Ip Man 2.jpg", heroSrc: "public/Ip Man 2.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  { id: 4, name: 'Extraction 2', genre: 'Action, Thriller', rating: 7.0, src: "public/Extraction 2.jpg", heroSrc: "public/Extraction 2.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  { id: 5, name: 'Mission Impossible', genre: 'Spy, Action', rating: 8.0, src: "public/Mission Impossible.jpg", heroSrc: "public/Mission Impossible.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  { id: 6, name: 'The Dark Knight', genre: 'Action, Crime', rating: 9.0, src: "public/The Dark Knight.jpg", heroSrc: "public/The Dark Knight.jpg", description: DUMMY_MOVIE_DESCRIPTION },
];

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

const allContinueWatching = [
  { name: 'Matrix Revolution', progress: 75, src: "public/Matrix Revolution.jpg" },
  { name: 'Deadpool', progress: 50, src: "public/Deadpool.jpg" },
  { name: 'Lord of the Rings', progress: 30, src: "public/Lord of the Rings.jpg" },
  { name: 'Interstellar', progress: 90, src: "public/Interstellar.jpg" },
  { name: 'Inception', progress: 20, src: "public/Inception.jpg" },
];

const favoritesData = [
  { name: 'Hobbit 1', genre: 'Adventure, Fantasy', rating: 7.8, src: "public/Hobbit 1.jpg" },
  { name: 'I Am Legend', genre: 'Action, Adventure', rating: 7.2, src: "public/I Am Legend.jpg" },
  { name: 'Avatar', genre: 'Action, Adventure', rating: 7.8, src: "public/Avatar.jpg" },
  { name: 'Dune', genre: 'Sci-Fi, Adventure', rating: 8.1, src: "public/Dune.jpg" },
  { name: 'The Martian', genre: 'Sci-Fi, Drama', rating: 7.9, src: "public/The Martian.jpg" },
];

// --- POPULAR MOVIES SIDEBAR ---
const PopularMoviesSidebar = ({
  handleSeeMorePopular,
  visiblePopularMovies,
  showPopularSeeMore,
  handleSeeMoreFavorites,
  visibleFavorites,
  showFavoritesSeeMore,
  onMovieSelect,
}) => (
  <aside className="w-full lg:w-80 bg-gray-900 lg:border-l border-gray-800 flex-shrink-0 overflow-y-auto p-4 lg:max-h-screen">
    {/* 🔍 Search bar has been completely removed */}

    {/* Popular Movies */}
    <div className="mb-8">
      <h3 className="text-xl font-bold mb-4">Popular Movies</h3>
      <div className="space-y-4">
        {visiblePopularMovies.map((movie) => (
          <div
            key={movie.id}
            onClick={() => onMovieSelect(movie)}
            className="flex items-center space-x-3 bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition cursor-pointer"
          >
            <img src={movie.src} alt={movie.name} className="w-16 h-16 object-cover rounded-lg" />
            <div>
              <p className="font-semibold">{movie.name}</p>
              <p className="text-gray-400 text-sm">{movie.genre}</p>
              <span className="text-yellow-400 text-sm font-bold flex items-center">
                <span className="mr-1">⭐</span>{movie.rating}
              </span>
            </div>
          </div>
        ))}
        {showPopularSeeMore && (
          <button
            onClick={handleSeeMorePopular}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-full mt-4"
          >
            See More
          </button>
        )}
      </div>
    </div>

    {/* Favorites */}
    <div>
      <h3 className="text-xl font-bold mb-4">Favorites</h3>
      <div className="space-y-4">
        {visibleFavorites.map((movie, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 bg-gray-800 rounded-lg p-3 hover:bg-gray-700 transition cursor-pointer"
          >
            <img src={movie.src} alt={movie.name} className="w-16 h-16 object-cover rounded-lg" />
            <div>
              <p className="font-semibold">{movie.name}</p>
              <p className="text-gray-400 text-sm">{movie.genre}</p>
              <span className="text-yellow-400 text-sm font-bold flex items-center">
                <span className="mr-1">⭐</span>{movie.rating}
              </span>
            </div>
          </div>
        ))}
        {showFavoritesSeeMore && (
          <button
            onClick={handleSeeMoreFavorites}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-full mt-4"
          >
            See More
          </button>
        )}
      </div>
    </div>
  </aside>
);

// --- OTHER PAGE CONTENT ---
export const OtherPageContent = ({ title }) => (
  <div className="flex-grow overflow-y-auto pr-0 lg:pr-4 px-4 lg:px-0">
    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 mt-4 text-white">{title} Content</h2>
    <div className="w-full h-64 md:h-80 lg:h-96 bg-gray-700 rounded-lg flex items-center justify-center mb-6 md:mb-10">
      <p className="text-gray-400 text-2xl">This is the dedicated {title} page!</p>
    </div>
  </div>
);

// --- MAIN CONTENT (Hero Banner) ---
const MainContent = ({ currentHeroMovie, setCurrentHeroMovie }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroMovie((prev) => {
        const i = popularMoviesData.findIndex((m) => m.id === prev.id);
        return popularMoviesData[(i + 1) % popularMoviesData.length];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [setCurrentHeroMovie]);

  return (
    <main className="pr-0 lg:pr-4">
      <div className="relative w-full h-64 md:h-80 lg:h-96 bg-gray-700 rounded-lg overflow-hidden mb-6 lg:mb-10">
        <img src={currentHeroMovie.heroSrc} alt={currentHeroMovie.name} className="absolute inset-0 w-full h-full object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent p-4 md:p-6 lg:p-8 flex flex-col justify-end">
          <span className="text-red-600 text-xs md:text-sm font-semibold mb-1 md:mb-2">{currentHeroMovie.genre}</span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">{currentHeroMovie.name.toUpperCase()}</h2>
          <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6 w-full md:w-2/3 line-clamp-3">{currentHeroMovie.description}</p>
          <div className="flex items-center space-x-2 md:space-x-4">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 md:py-3 md:px-8 rounded-full flex items-center text-sm md:text-base">
              <FiClock className="inline-block mr-1 md:mr-2" /> Watch
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 md:py-3 md:px-8 rounded-full text-sm md:text-base">
              + Add to List
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

// --- ARTISTS SECTION ---
const ArtistCard = ({ name, movies, src }) => (
  <div className="bg-gray-900 rounded-2xl p-3 md:p-4 flex flex-col items-center shadow-md transition hover:scale-105">
    <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full border-3 md:border-4 border-red-600 overflow-hidden flex-shrink-0 shadow-lg shadow-red-600/30">
      <img src={src} alt={name} className="w-full h-full object-cover" />
    </div>
    <p className="font-semibold text-center mt-2 md:mt-3 text-white text-sm md:text-base line-clamp-2 w-full px-1">{name}</p>
    <p className="text-gray-400 text-xs md:text-sm truncate w-full text-center">{movies}</p>
  </div>
);

const ArtistsSection = ({ allArtists }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(allArtists.length / ARTISTS_PER_PAGE);
  const startIndex = currentPage * ARTISTS_PER_PAGE;
  const currentArtists = allArtists.slice(startIndex, startIndex + ARTISTS_PER_PAGE);

  const handlePrev = () => setCurrentPage((prev) => Math.max(0, prev - 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));

  return (
    <section className="mb-6 lg:mb-10 pr-0 lg:pr-4 text-white">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">Best Artists</h3>
        <div className="flex space-x-3">
          <button onClick={handlePrev} disabled={currentPage === 0} className={`p-2 rounded-full transition ${currentPage === 0 ? 'text-gray-600 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600'}`}>
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={handleNext} disabled={currentPage === totalPages - 1} className={`p-2 rounded-full transition ${currentPage === totalPages - 1 ? 'text-gray-600 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600'}`}>
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
        {currentArtists.map((artist, index) => (
          <ArtistCard key={index} {...artist} />
        ))}
      </div>
    </section>
  );
};

// --- CONTINUE WATCHING SECTION ---
const ContinueWatchingCard = ({ name, progress, src }) => (
  <div className="bg-gray-900 rounded-2xl p-2 md:p-3 flex flex-col items-center shadow-md transition hover:scale-105">
    <div className="relative rounded-xl overflow-hidden w-full h-28 md:h-32 lg:h-36 mb-2 md:mb-3">
      <img src={src} alt={name} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition">
        <button className="p-3 rounded-full bg-red-600 hover:bg-red-700 transition">
          <FiClock className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
    <p className="font-semibold text-center text-white text-sm truncate w-full">{name}</p>
    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
      <div className="bg-red-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
    </div>
    <p className="text-gray-400 text-xs mt-1">{progress}% watched</p>
  </div>
);

const ContinueWatchingSection = ({ allContinueWatching }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const MOVIES_PER_PAGE = 4;
  const totalPages = Math.ceil(allContinueWatching.length / MOVIES_PER_PAGE);
  const startIndex = currentPage * MOVIES_PER_PAGE;
  const currentMovies = allContinueWatching.slice(startIndex, startIndex + MOVIES_PER_PAGE);

  const handlePrev = () => setCurrentPage((prev) => Math.max(0, prev - 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));

  return (
    <section className="mb-6 lg:mb-10 pr-0 lg:pr-4 text-white">
      <div className="flex justify-between items-center mb-4 md:mb-6">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">Continue Watching</h3>
        <div className="flex space-x-3">
          <button onClick={handlePrev} disabled={currentPage === 0} className={`p-2 rounded-full transition ${currentPage === 0 ? 'text-gray-600 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600'}`}>
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={handleNext} disabled={currentPage === totalPages - 1} className={`p-2 rounded-full transition ${currentPage === totalPages - 1 ? 'text-gray-600 cursor-not-allowed' : 'bg-gray-700 hover:bg-gray-600'}`}>
            <FiChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-6">
        {currentMovies.map((movie, index) => (
          <ContinueWatchingCard key={index} {...movie} />
        ))}
      </div>
    </section>
  );
};

// --- DASHBOARD (Main Component) ---
const Dashboard = ({ activeTab, setActiveTab }) => {
  const [currentHeroMovie, setCurrentHeroMovie] = useState(popularMoviesData[0]);
  const [popularMoviesLimit, setPopularMoviesLimit] = useState(INITIAL_POPULAR_LIMIT);
  const [favoritesLimit, setFavoritesLimit] = useState(INITIAL_FAVORITES_LIMIT);

  const showPopularSeeMore = popularMoviesLimit < popularMoviesData.length;
  const showFavoritesSeeMore = favoritesLimit < favoritesData.length;
  const visiblePopularMovies = popularMoviesData.slice(0, popularMoviesLimit);
  const visibleFavorites = favoritesData.slice(0, favoritesLimit);

  const sidebarProps = {
    handleSeeMorePopular: () => setPopularMoviesLimit(popularMoviesData.length),
    visiblePopularMovies,
    showPopularSeeMore,
    handleSeeMoreFavorites: () => setFavoritesLimit(favoritesData.length),
    visibleFavorites,
    showFavoritesSeeMore,
    onMovieSelect: (movie) => setCurrentHeroMovie(movie),
  };

  return (
    <div className="bg-gray-900 text-white w-full h-full overflow-hidden">
      <div className="flex flex-col lg:flex-row w-full h-full">
        {activeTab === 'TV Series' ? (
          <>
            <div className="flex-grow lg:pt-4 overflow-y-auto lg:max-h-screen px-4 lg:px-0">
              <MainContent currentHeroMovie={currentHeroMovie} setCurrentHeroMovie={setCurrentHeroMovie} />
              <ArtistsSection allArtists={allArtists} />
              <ContinueWatchingSection allContinueWatching={allContinueWatching} />
            </div>
            <PopularMoviesSidebar {...sidebarProps} />
          </>
        ) : (
          <OtherPageContent title={activeTab} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
