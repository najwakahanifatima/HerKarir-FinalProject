import { Search } from 'lucide-react';

export default function SearchInput() {
  return (
    <div className="px-16 my-10 flex items-center justify-between">
      <h2 className="text-2xl font-semibold text-gray-800">
        Hari ini mau <span className="italic">upgrade</span> skill apa?
      </h2>
      <div className="relative w-1/3">
        <input 
          type="text"
          placeholder="Cari"
          className="w-full pl-12 pr-4 py-3 border-2 border-pink-300 rounded-lg focus:outline-none focus:border-pink-500 placeholder:text-gray-400"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
      </div>
    </div>
  );
}