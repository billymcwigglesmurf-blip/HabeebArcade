
import React, { useState, useMemo, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import GameCard from './components/GameCard';
import { GAMES } from './data/games';

// --- Home Component ---
// Define interface for Home props to ensure type safety
interface HomeProps {
  searchQuery: string;
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

const Home: React.FC<HomeProps> = ({ searchQuery, favorites, toggleFavorite }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Action', 'Puzzle', 'Sports', 'Arcade', 'Strategy', 'Racing', 'Classic'];

  const filteredGames = useMemo(() => {
    return GAMES.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           game.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="mb-12 relative overflow-hidden rounded-3xl bg-indigo-600/10 border border-indigo-500/20 p-8 md:p-12">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-xs font-bold tracking-widest uppercase mb-4">
            New Arrival
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            Level Up Your <span className="text-indigo-500 italic">Playtime.</span>
          </h1>
          <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
            Discover a curated collection of high-quality unblocked games for every taste. No downloads, no blocked filters, just fun.
          </p>
          <div className="flex gap-4">
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20">
              Start Exploring
            </button>
            <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-3 rounded-xl font-bold transition-all">
              Top Games
            </button>
          </div>
        </div>
        <div className="absolute right-[-10%] top-[-20%] w-[50%] h-[140%] bg-indigo-500/5 blur-3xl rounded-full"></div>
        <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:block opacity-20">
          <i className="fa-solid fa-gamepad text-[180px] text-white"></i>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-8 overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex items-center space-x-3 whitespace-nowrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                selectedCategory === cat 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:border-zinc-700 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Favorites Section (Optional) */}
      {favorites.length > 0 && selectedCategory === 'All' && searchQuery === '' && (
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center">
              <i className="fa-solid fa-heart text-pink-500 mr-3"></i>
              Your Favorites
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GAMES.filter(g => favorites.includes(g.id)).map(game => (
              <GameCard 
                key={game.id} 
                game={game} 
                isFavorite={true} 
                onToggleFavorite={toggleFavorite} 
              />
            ))}
          </div>
        </div>
      )}

      {/* Main Grid */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">
          {selectedCategory === 'All' ? 'All Games' : `${selectedCategory} Games`}
          <span className="text-zinc-600 text-sm ml-4 font-normal">({filteredGames.length} available)</span>
        </h2>
      </div>

      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredGames.map((game) => (
            <GameCard 
              key={game.id} 
              game={game} 
              isFavorite={favorites.includes(game.id)} 
              onToggleFavorite={toggleFavorite} 
            />
          ))}
        </div>
      ) : (
        <div className="py-20 text-center bg-zinc-900 rounded-3xl border border-dashed border-zinc-800">
          <i className="fa-solid fa-ghost text-4xl text-zinc-700 mb-4"></i>
          <p className="text-zinc-500 font-medium">No games found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

// --- GameView Component ---
// Define interface for GameView props
interface GameViewProps {
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

const GameView: React.FC<GameViewProps> = ({ favorites, toggleFavorite }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const game = GAMES.find(g => g.id === id);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!game) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Game not found!</h1>
        <button 
          onClick={() => navigate('/')}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-zinc-500 text-sm mb-6">
        <Link to="/" className="hover:text-white transition-colors">Home</Link>
        <span>/</span>
        <span className="text-zinc-400 capitalize">{game.category}</span>
        <span>/</span>
        <span className="text-white font-semibold">{game.title}</span>
      </div>

      {/* Game Container */}
      <div className={`relative bg-black rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl transition-all ${isFullscreen ? 'fixed inset-0 z-[100] rounded-none' : 'aspect-video w-full'}`}>
        <iframe
          src={game.iframeUrl}
          title={game.title}
          className="w-full h-full border-none"
          allow="fullscreen; autoplay; encrypted-media"
        ></iframe>
        
        {/* Fullscreen Toggle Overlay (only when not in real browser fullscreen) */}
        {!isFullscreen && (
          <button 
            onClick={() => setIsFullscreen(true)}
            className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/80 text-white p-3 rounded-lg backdrop-blur-md transition-all group"
          >
            <i className="fa-solid fa-expand group-hover:scale-110 transition-transform"></i>
          </button>
        )}

        {isFullscreen && (
          <button 
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white p-3 rounded-lg backdrop-blur-md transition-all z-[101]"
          >
            <i className="fa-solid fa-compress"></i>
          </button>
        )}
      </div>

      {/* Game Info Details */}
      {!isFullscreen && (
        <div className="mt-8 flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-black text-white">{game.title}</h1>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => toggleFavorite(game.id)}
                  className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                    favorites.includes(game.id) ? 'bg-indigo-600 text-white' : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
                  }`}
                >
                  <i className={`fa-${favorites.includes(game.id) ? 'solid' : 'regular'} fa-heart text-lg`}></i>
                </button>
                <button className="bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white w-12 h-12 rounded-xl flex items-center justify-center">
                  <i className="fa-solid fa-share-nodes text-lg"></i>
                </button>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mb-6 text-sm text-zinc-500">
              <span className="flex items-center"><i className="fa-solid fa-star text-yellow-500 mr-2"></i> {game.rating} Rating</span>
              <span className="flex items-center"><i className="fa-solid fa-gamepad text-indigo-500 mr-2"></i> {game.category}</span>
              <span className="flex items-center"><i className="fa-solid fa-eye text-emerald-500 mr-2"></i> {game.plays} Plays</span>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h3 className="font-bold text-white mb-2">About the Game</h3>
              <p className="text-zinc-400 leading-relaxed">{game.description}</p>
              
              <div className="mt-8 pt-6 border-t border-zinc-800 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider mb-1">Developer</p>
                  <p className="text-zinc-300 text-sm">Community Choice</p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider mb-1">Last Updated</p>
                  <p className="text-zinc-300 text-sm">Oct 2024</p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider mb-1">Platform</p>
                  <p className="text-zinc-300 text-sm">Web Browser</p>
                </div>
                <div>
                  <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-wider mb-1">Age Rating</p>
                  <p className="text-zinc-300 text-sm">Everyone (3+)</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-80">
            <h3 className="font-bold text-white mb-4">Recommended Games</h3>
            <div className="space-y-4">
              {GAMES.filter(g => g.id !== game.id).slice(0, 3).map(rec => (
                <Link to={`/play/${rec.id}`} key={rec.id} className="flex gap-4 group">
                  <div className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={rec.thumbnail} alt={rec.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-zinc-200 group-hover:text-indigo-400 transition-colors line-clamp-1">{rec.title}</h4>
                    <p className="text-xs text-zinc-500">{rec.category}</p>
                    <div className="flex items-center mt-1 text-[10px] text-yellow-500">
                      <i className="fa-solid fa-star mr-1"></i>
                      <span>{rec.rating}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="mt-8 bg-indigo-600 rounded-2xl p-6 text-center">
              <i className="fa-solid fa-trophy text-3xl text-white/50 mb-3"></i>
              <h4 className="font-bold text-white mb-1">Join the Leaderboard</h4>
              <p className="text-white/70 text-xs mb-4">Save your high scores and compete with players worldwide!</p>
              <button className="w-full bg-white text-indigo-600 font-bold py-2 rounded-lg text-sm hover:bg-zinc-100 transition-colors">
                SIGN UP NOW
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Footer Component ---
const Footer: React.FC = () => (
  <footer className="mt-20 border-t border-zinc-800 py-12 bg-zinc-950">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-8">
      <div className="max-w-xs">
        <div className="flex items-center space-x-2 mb-4">
          <i className="fa-solid fa-gamepad text-indigo-500 text-xl"></i>
          <span className="text-xl font-black text-white tracking-tighter">HABEEBARCADE</span>
        </div>
        <p className="text-zinc-500 text-sm leading-relaxed mb-6">
          The ultimate destination for unblocked web games. Curated by gamers, for gamers. No restrictions, just pure performance.
        </p>
        <div className="flex space-x-4">
          <a href="#" className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 hover:text-white transition-colors">
            <i className="fa-brands fa-discord"></i>
          </a>
          <a href="#" className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 hover:text-white transition-colors">
            <i className="fa-brands fa-twitter"></i>
          </a>
          <a href="#" className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-500 hover:text-white transition-colors">
            <i className="fa-brands fa-github"></i>
          </a>
        </div>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
        <div>
          <h4 className="text-white font-bold mb-4 text-sm">Platform</h4>
          <ul className="space-y-2 text-zinc-500 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Browse Games</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Categories</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Leaderboards</a></li>
            <li><a href="#" className="hover:text-white transition-colors">New Releases</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-bold mb-4 text-sm">Support</h4>
          <ul className="space-y-2 text-zinc-500 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
          </ul>
        </div>
        <div className="hidden sm:block">
          <h4 className="text-white font-bold mb-4 text-sm">Company</h4>
          <ul className="space-y-2 text-zinc-500 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">About</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Partners</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-zinc-900/50 flex flex-col md:flex-row justify-between items-center gap-4 text-zinc-600 text-xs">
      <p>&copy; 2024 HabeebArcade Interactive. All rights reserved.</p>
      <div className="flex space-x-6">
        <span>Made with <i className="fa-solid fa-heart text-pink-500/50"></i> for the gaming community</span>
      </div>
    </div>
  </footer>
);

// --- App Root ---
const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('habeeb_arcade_favorites');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('habeeb_arcade_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-[#09090b]">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
        <main className="flex-1">
          <Routes>
            <Route 
              path="/" 
              element={
                <Home 
                  searchQuery={searchQuery} 
                  favorites={favorites} 
                  toggleFavorite={toggleFavorite} 
                />
              } 
            />
            <Route 
              path="/play/:id" 
              element={
                <GameView 
                  favorites={favorites} 
                  toggleFavorite={toggleFavorite} 
                />
              } 
            />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;
