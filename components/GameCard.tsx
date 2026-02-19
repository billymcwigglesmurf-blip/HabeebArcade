
import React from 'react';
import { Link } from 'react-router-dom';

// Added interface for GameCard props to fix TypeScript assignment errors in App.tsx
interface GameCardProps {
  game: {
    id: string;
    title: string;
    description: string;
    category: string;
    thumbnail: string;
    rating: number;
    plays: string;
    iframeUrl: string;
  };
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

// Using React.FC to ensure proper integration with React's JSX types (including the reserved 'key' prop)
const GameCard: React.FC<GameCardProps> = ({ game, isFavorite, onToggleFavorite }) => {
  return (
    <div className="group bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-indigo-500/50 transition-all hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2">
          <button 
            onClick={(e) => {
              e.preventDefault();
              onToggleFavorite(game.id);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              isFavorite ? 'bg-indigo-600 text-white' : 'bg-black/50 text-white/70 hover:bg-black/70 hover:text-white'
            }`}
          >
            <i className={`fa-${isFavorite ? 'solid' : 'regular'} fa-heart text-xs`}></i>
          </button>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
        <div className="absolute bottom-2 left-2 flex gap-2">
          <span className="bg-indigo-500/90 text-[10px] font-bold uppercase tracking-wider text-white px-2 py-0.5 rounded">
            {game.category}
          </span>
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-1">
          <h3 className="font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors line-clamp-1">{game.title}</h3>
          <div className="flex items-center text-yellow-500 text-xs">
            <i className="fa-solid fa-star mr-1"></i>
            <span className="font-semibold">{game.rating}</span>
          </div>
        </div>
        <p className="text-zinc-500 text-xs line-clamp-2 mb-4 flex-1">{game.description}</p>
        
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800/50">
          <div className="text-[11px] text-zinc-500">
            <i className="fa-solid fa-fire-flame-curved mr-1"></i>
            {game.plays} plays
          </div>
          <Link 
            to={`/play/${game.id}`}
            className="text-xs font-bold text-white bg-zinc-800 hover:bg-indigo-600 px-3 py-1.5 rounded-lg transition-colors flex items-center"
          >
            PLAY NOW
            <i className="fa-solid fa-play ml-2 text-[10px]"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
