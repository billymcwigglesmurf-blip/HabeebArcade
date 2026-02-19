
import React, { useState, useMemo, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import GameCard from './components/GameCard';
import { GAMES } from './data/games';

/**
 * Props for Home component
 */
interface HomeProps {
  searchQuery: string;
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

// Added Home component typing for consistent prop usage
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
            Unblocked Arcade
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
            Level Up Your <span className="text-indigo-500 italic">Playtime.</span>
          </h1>
          <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
            Discover a curated collection of high-quality unblocked games for every taste. No downloads, no blocked filters, just fun.
          </p>
          <div className="flex gap-4">
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-indigo-600/20">
              Browse All
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

      {/* Favorites */}
      {favorites.length > 0 && selectedCategory === 'All' && searchQuery === '' && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <i className="fa-solid fa-heart text-pink-500 mr-3"></i> Favorites
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {GAMES.filter(g => favorites.includes(g.id)).map(game => (
              <GameCard key={game.id} game={game} isFavorite={true} onToggleFavorite={toggleFavorite} />
            ))}
          </div>
        </div>
      )}

      {/* Main Grid */}
      <h2 className="text-2xl font-bold mb-6">Explore Games</h2>
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
        <div className="py-20 text-center text-zinc-500 bg-zinc-900/50 rounded-2xl border border-dashed border-zinc-800">
          No games found. Try a different search!
        </div>
      )}
    </div>
  );
};

/**
 * Props for GameView component
 */
interface GameViewProps {
  favorites: string[];
  toggleFavorite: (id: string) => void;
}

// Added GameView component typing for consistent prop usage
const GameView: React.FC<GameViewProps> = ({ favorites, toggleFavorite }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const game = GAMES.find(g => g.id === id);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!game) return <div className="p-20 text-center">Game Not Found</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center space-x-2 text-zinc-500 text-sm mb-6">
        <Link to="/" className="hover:text-white">Home</Link>
        <span>/</span>
        <span className="text-white font-semibold">{game.title}</span>
      </div>

      <div className={`relative bg-black rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl transition-all ${isFullscreen ? 'fixed inset-0 z-[100] rounded-none' : 'aspect-video w-full'}`}>
        <iframe
          src={game.iframeUrl}
          title={game.title}
          className="w-full h-full border-none"
          allow="fullscreen; autoplay; encrypted-media"
        ></iframe>
        <button 
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/80 text-white p-3 rounded-lg backdrop-blur-md"
        >
          <i className={`fa-solid fa-${isFullscreen ? 'compress' : 'expand'}`}></i>
        </button>
      </div>

      {!isFullscreen && (
        <div className="mt-8 flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-3xl font-black text-white">{game.title}</h1>
              <button 
                onClick={() => toggleFavorite(game.id)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                  favorites.includes(game.id) ? 'bg-indigo-600 text-white' : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-white'
                }`}
              >
                <i className={`fa-${favorites.includes(game.id) ? 'solid' : 'regular'} fa-heart text-lg`}></i>
              </button>
            </div>
            <p className="text-zinc-400 leading-relaxed max-w-2xl">{game.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const App = () => {
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
            <Route path="/" element={<Home searchQuery={searchQuery} favorites={favorites} toggleFavorite={toggleFavorite} />} />
            <Route path="/play/:id" element={<GameView favorites={favorites} toggleFavorite={toggleFavorite} />} />
          </Routes>
        </main>
        <footer className="py-8 text-center text-zinc-600 text-xs border-t border-zinc-900 mt-20">
          &copy; 2024 HabeebArcade. All Rights Reserved.
        </footer>
      </div>
    </HashRouter>
  );
};

export default App;
