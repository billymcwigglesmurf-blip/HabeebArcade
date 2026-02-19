
import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Props for Navbar component
 */
interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

// Defined Navbar with React.FC to include proper prop types
const Navbar: React.FC<NavbarProps> = ({ searchQuery, setSearchQuery }) => {
  return (
    <nav className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Link to="/" className="flex items-center space-x-2 group">
          <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center group-hover:bg-indigo-500 transition-colors">
            <i className="fa-solid fa-gamepad text-white text-xl"></i>
          </div>
          <span className="text-2xl font-black tracking-tighter text-white uppercase">
            Habeeb<span className="text-indigo-500">Arcade</span>
          </span>
        </Link>
        <div className="relative w-full md:w-96">
          <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"></i>
          <input
            type="text"
            placeholder="Search for a game..."
            className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
