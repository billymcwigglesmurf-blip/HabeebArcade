
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Props for GameCard component
 */
interface GameCardProps {
  game: {
    id: string;
    title: string;
    description: string;
    category: string;
    thumbnail: string;
    iframeUrl: string;
    rating: number;
    plays: string;
  };
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
}

// Added React.FC type to explicitly support the 'key' prop and resolve TypeScript compilation errors
const GameCard: React.FC<GameCardProps> = ({ game, isFavorite, onToggleFavorite }) => {
  return (
    <div className="group bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 hover:border-indigo-500/50 transition-all flex flex-col h-full shadow-lg">
      <div className="relative aspect-video overflow-hidden">
        <img 
          src={game.thumbnail} 
          alt={game.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          loading="lazy"
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
        <div className="absolute bottom-2 left-2">
          <span className="bg-indigo-500/90 text-[10px] font-bold uppercase tracking-wider text-white px-2 py-0.5 rounded">
            {game.category}
          </span>
        </div>
      </div>
      
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-bold text-zinc-100 group-hover:text-indigo-400 transition-colors line-clamp-1 mb-2">{game.title}</h3>
        <p className="text-zinc-500 text-xs line-clamp-2 mb-4 flex-1">{game.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <div className="text-[11px] text-zinc-500 flex items-center">
            <i className="fa-solid fa-star text-yellow-500 mr-1"></i> {game.rating}
          </div>
          <Link 
            to={`/play/${game.id}`}
            className="text-xs font-bold text-white bg-zinc-800 hover:bg-indigo-600 px-3 py-1.5 rounded-lg transition-colors flex items-center"
          >
            PLAY <i className="fa-solid fa-play ml-2 text-[8px]"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
