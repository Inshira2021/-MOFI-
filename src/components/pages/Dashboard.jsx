import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiBell, FiUser, FiChevronLeft, FiChevronRight, FiClock, FiMenu } from 'react-icons/fi';

// --- DUMMY DATA ---
const ARTISTS_PER_PAGE = 4;
const INITIAL_POPULAR_LIMIT = 3;
const INITIAL_FAVORITES_LIMIT = 3;
const DUMMY_MOVIE_DESCRIPTION = "Explore this movie's captivating plot, thrilling action sequences, and stellar cast. Click 'Watch' to start streaming!";

// Extended movie list for Movies page only
const allMoviesData = [
  { id: 1, name: 'John Wick', genre: 'Action, Horror', rating: 7.4, src: "/John Wick.jpg", heroSrc: "/John Wick.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  { id: 2, name: 'Mad Max', genre: 'Action, Adventure', rating: 8.1, src: "/Mad Max.jpg", heroSrc: "/Mad Max.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  { id: 3, name: 'Ip Man 2', genre: 'Action, Biography', rating: 7.2, src: "/Ip Man 2.jpg", heroSrc: "/Ip Man 2.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  { id: 4, name: 'Extraction 2', genre: 'Action, Thriller', rating: 7.0, src: "/Extraction 2.jpg", heroSrc: "/Extraction 2.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  { id: 5, name: 'Mission Impossible', genre: 'Spy, Action', rating: 8.0, src: "/Mission Impossible.jpg", heroSrc: "/Mission Impossible.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  { id: 6, name: 'The Dark Knight', genre: 'Action, Crime', rating: 9.0, src: "/The Dark Knight.jpg", heroSrc: "/The Dark Knight.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  { id: 7, name: 'Avengers Endgame', genre: 'Action, Sci-Fi', rating: 8.4, src: "/John Wick.jpg", heroSrc: "/John Wick.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  { id: 8, name: 'Inception', genre: 'Sci-Fi, Thriller', rating: 8.8, src: "/Mad Max.jpg", heroSrc: "/Mad Max.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  { id: 9, name: 'Interstellar', genre: 'Sci-Fi, Drama', rating: 8.6, src: "/Ip Man 2.jpg", heroSrc: "/Ip Man 2.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  { id: 10, name: 'The Matrix', genre: 'Sci-Fi, Action', rating: 8.7, src: "/Extraction 2.jpg", heroSrc: "/Extraction 2.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  { id: 11, name: 'Gladiator', genre: 'Action, Drama', rating: 8.5, src: "/Mission Impossible.jpg", heroSrc: "/Mission Impossible.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  { id: 12, name: 'The Godfather', genre: 'Crime, Drama', rating: 9.2, src: "/The Dark Knight.jpg", heroSrc: "/The Dark Knight.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  { id: 13, name: 'Pulp Fiction', genre: 'Crime, Drama', rating: 8.9, src: "/John Wick.jpg", heroSrc: "/John Wick.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  { id: 14, name: 'Forrest Gump', genre: 'Drama, Romance', rating: 8.8, src: "/Mad Max.jpg", heroSrc: "/Mad Max.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  { id: 15, name: 'The Shawshank Redemption', genre: 'Drama', rating: 9.3, src: "/Ip Man 2.jpg", heroSrc: "/Ip Man 2.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  { id: 16, name: 'Fight Club', genre: 'Drama, Thriller', rating: 8.8, src: "/Extraction 2.jpg", heroSrc: "/Extraction 2.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  { id: 17, name: 'The Lord of the Rings', genre: 'Fantasy, Adventure', rating: 8.9, src: "/Mission Impossible.jpg", heroSrc: "/Mission Impossible.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  { id: 18, name: 'Star Wars', genre: 'Sci-Fi, Adventure', rating: 8.6, src: "/The Dark Knight.jpg", heroSrc: "/The Dark Knight.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  { id: 19, name: 'Jurassic Park', genre: 'Adventure, Sci-Fi', rating: 8.1, src: "/John Wick.jpg", heroSrc: "/John Wick.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  { id: 20, name: 'Spider-Man', genre: 'Action, Adventure', rating: 7.3, src: "/Mad Max.jpg", heroSrc: "/Mad Max.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  { id: 21, name: 'Batman Begins', genre: 'Action, Crime', rating: 8.2, src: "/Ip Man 2.jpg", heroSrc: "/Ip Man 2.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  { id: 22, name: 'Iron Man', genre: 'Action, Sci-Fi', rating: 7.9, src: "/Extraction 2.jpg", heroSrc: "/Extraction 2.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  { id: 23, name: 'Thor Ragnarok', genre: 'Action, Comedy', rating: 7.9, src: "/Mission Impossible.jpg", heroSrc: "/Mission Impossible.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  { id: 24, name: 'Black Panther', genre: 'Action, Adventure', rating: 7.3, src: "/The Dark Knight.jpg", heroSrc: "/The Dark Knight.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  { id: 25, name: 'Guardians of the Galaxy', genre: 'Action, Comedy', rating: 8.0, src: "/John Wick.jpg", heroSrc: "/John Wick.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  { id: 26, name: 'Doctor Strange', genre: 'Action, Fantasy', rating: 7.5, src: "/Mad Max.jpg", heroSrc: "/Mad Max.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  { id: 27, name: 'Captain America', genre: 'Action, Adventure', rating: 7.7, src: "/Ip Man 2.jpg", heroSrc: "/Ip Man 2.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  { id: 28, name: 'Ant-Man', genre: 'Action, Comedy', rating: 7.3, src: "/Extraction 2.jpg", heroSrc: "/Extraction 2.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  { id: 29, name: 'The Avengers', genre: 'Action, Sci-Fi', rating: 8.0, src: "/Mission Impossible.jpg", heroSrc: "/Mission Impossible.jpg", description: DUMMY_MOVIE_DESCRIPTION },
  { id: 30, name: 'Wonder Woman', genre: 'Action, Fantasy', rating: 7.4, src: "/The Dark Knight.jpg", heroSrc: "/The Dark Knight.jpg", description: DUMMY_MOVIE_DESCRIPTION },
];

// Popular movies - sorted by rating (highest first) and take top 6
const popularMoviesData = [...allMoviesData]
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 6);

const allArtists = [
  { name: 'Charlize Theron', movies: '+12 Movies', src: '/charlize theron.jpg' },
  { name: 'Laurence Fishburne', movies: '+27 Movies', src: '/Laurence Fishburne.jpg' },
  { name: 'Martin Freeman', movies: '+10 Movies', src: '/Martin Freeman.jpg' },
  { name: 'Keanu Reeves', movies: '+27 Movies', src: '/Keanu Reeves.jpg' },
  { name: 'Tom Hanks', movies: '+15 Movies', src: '/tom hanks.jpg' },
  { name: 'Scarlett Johansson', movies: '+20 Movies', src: '/scarlett johansson.jpg' },
  { name: 'Denzel Washington', movies: '+30 Movies', src: '/denzel washington.jpg' },
  { name: 'Zendaya', movies: '+8 Movies', src: '/zendaya.jpg' },
];

const allContinueWatching = [
  { name: 'Matrix Revolution', progress: 75, src: "/Matrix Revolution.jpg" },
  { name: 'Deadpool', progress: 50, src: "/Deadpool.jpg" },
  { name: 'Lord of the Rings', progress: 30, src: "/Lord of the Rings.jpg" },
  { name: 'Interstellar', progress: 90, src: "/Interstellar.jpg" },
  { name: 'Inception', progress: 20, src: "/Inception.jpg" },
];

// --- POPULAR MOVIES SIDEBAR ---
const PopularMoviesSidebar = ({ onMovieSelect }) => (
  <aside className="hidden lg:flex lg:flex-col w-80 bg-gray-900 border-l border-gray-800 flex-shrink-0 p-4 h-full overflow-y-auto">
    <div>
      <h3 className="text-xl font-bold mb-4">Popular Movies</h3>
      <div className="space-y-4">
        {popularMoviesData.map((movie) => (
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
      </div>
    </div>
  </aside>
);

// --- MOVIE CARD COMPONENT ---
const MovieCard = ({ movie, onClick }) => (
  <div 
    onClick={onClick}
    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-amber-900/50 hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group max-w-[200px]"
  >
    <div className="relative aspect-[3/4] overflow-hidden">
      <img 
        src={movie.src} 
        alt={movie.name} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-1.5 right-1.5 bg-blue-600 text-white px-1.5 py-0.5 rounded text-xs font-bold">
        ⭐ {movie.rating}
      </div>
    </div>
    <div className="p-2">
      <p className="text-pink-500 text-xs font-semibold mb-1">HD Movies</p>
      <h3 className="text-white font-semibold text-xs mb-1.5 line-clamp-2 leading-tight">{movie.name}</h3>
      <div className="flex items-center space-x-1">
        <span className="text-pink-500 text-sm">❤</span>
        <span className="text-gray-400 text-xs">{Math.floor(movie.rating * 100)}</span>
      </div>
    </div>
  </div>
);

// --- OTHER PAGE CONTENT ---
export const OtherPageContent = ({ title }) => {
  const navigate = useNavigate();
  // Only show movie cards for "Movies" page - use extended list
  const displayMovies = title === 'Movies' ? allMoviesData : [];

  const handleMovieClick = (movieId) => {
    navigate(`/movie/${movieId}`);
  };

  return (
    <div className="flex-grow overflow-y-auto pr-0 lg:pr-4 px-4 lg:px-0">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 md:mb-8 mt-4 text-white">
        {title}
      </h2>
      
      {displayMovies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4 pb-8">
          {displayMovies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              onClick={() => handleMovieClick(movie.id)}
            />
          ))}
        </div>
      ) : (
        <div className="w-full h-64 md:h-80 lg:h-96 bg-gray-700 rounded-lg flex items-center justify-center mb-6 md:mb-10">
          <p className="text-gray-400 text-2xl">This is the dedicated {title} page!</p>
        </div>
      )}
    </div>
  );
};

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
          <span className="text-amber-500 text-xs md:text-sm font-semibold mb-1 md:mb-2">{currentHeroMovie.genre}</span>
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">{currentHeroMovie.name.toUpperCase()}</h2>
          <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6 w-full md:w-2/3 line-clamp-3">{currentHeroMovie.description}</p>
        </div>
      </div>
    </main>
  );
};

// --- ARTISTS SECTION ---
const ArtistCard = ({ name, movies, src }) => (
  <div className="bg-gray-900 rounded-2xl p-3 md:p-4 flex flex-col items-center shadow-md transition hover:scale-105 hover:shadow-amber-900/30 hover:shadow-xl">
    <div className="relative w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 rounded-full border-3 md:border-4 border-gradient-to-r from-amber-600 to-orange-600 overflow-hidden flex-shrink-0 shadow-lg shadow-amber-900/30">
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
          <button onClick={handlePrev} disabled={currentPage === 0} className={`p-2 rounded-full transition ${currentPage === 0 ? 'text-gray-600 cursor-not-allowed' : 'bg-gray-700 hover:bg-gradient-to-r hover:from-amber-600 hover:to-orange-600'}`}>
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={handleNext} disabled={currentPage === totalPages - 1} className={`p-2 rounded-full transition ${currentPage === totalPages - 1 ? 'text-gray-600 cursor-not-allowed' : 'bg-gray-700 hover:bg-gradient-to-r hover:from-amber-600 hover:to-orange-600'}`}>
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
  <div className="bg-gray-900 rounded-2xl p-2 md:p-3 flex flex-col items-center shadow-md transition hover:scale-105 hover:shadow-amber-900/30 hover:shadow-xl">
    <div className="relative rounded-xl overflow-hidden w-full h-28 md:h-32 lg:h-36 mb-2 md:mb-3">
      <img src={src} alt={name} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition">
        <button className="p-3 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 transition shadow-lg">
          <FiClock className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
    <p className="font-semibold text-center text-white text-sm truncate w-full">{name}</p>
    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
      <div className="bg-gradient-to-r from-amber-600 to-orange-600 h-2 rounded-full" style={{ width: `${progress}%` }}></div>
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
          <button onClick={handlePrev} disabled={currentPage === 0} className={`p-2 rounded-full transition ${currentPage === 0 ? 'text-gray-600 cursor-not-allowed' : 'bg-gray-700 hover:bg-gradient-to-r hover:from-amber-600 hover:to-orange-600'}`}>
            <FiChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={handleNext} disabled={currentPage === totalPages - 1} className={`p-2 rounded-full transition ${currentPage === totalPages - 1 ? 'text-gray-600 cursor-not-allowed' : 'bg-gray-700 hover:bg-gradient-to-r hover:from-amber-600 hover:to-orange-600'}`}>
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
            <PopularMoviesSidebar onMovieSelect={(movie) => setCurrentHeroMovie(movie)} />
          </>
        ) : (
          <OtherPageContent title={activeTab} />
        )}
      </div>
    </div>
  );
};

export { allMoviesData };
export default Dashboard;
