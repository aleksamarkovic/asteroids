import React, { useEffect, useState } from "react";

export default function SearchAsteroids({ selectedAsteroids, asteroids, setSelectedAsteroids }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [asteroidsMatched, setAsteroidsMatched] = useState([]);

  useEffect(() => {
    const matched = asteroids.filter(
      (asteroid) => asteroid.name.toLowerCase().includes(searchTerm) && !selectedAsteroids.has(asteroid.id)
    );

    setAsteroidsMatched([...matched]);
  }, [searchTerm, selectedAsteroids]);

  function handleSearch(e) {
    setSearchTerm(e.target.value.toLowerCase());
  }
  function handleSearchClick(_e, id) {
    setSelectedAsteroids(new Set([...selectedAsteroids.values(), id]));
  }

  return (
    <div className="bg-white overflow-hidden shadow rounded-lg w-1/2 mr-10">
      <div className="px-4 py-5 sm:p-6">
        <div className="max-w-lg w-full lg:max-w-xs">
          <label htmlFor="search" className="sr-only">
            Search Asteroids
          </label>
          <div className="relative text-gray-400 focus-within:text-blue-700">
            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
              <svg
                className="h-5 w-5"
                x-description="Heroicon name: search"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              id="search"
              className="border-gray-600 block w-full bg-white py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white focus:border-white sm:text-sm"
              placeholder="Search Asteroids"
              type="search"
              name="search"
              onChange={handleSearch}
              value={searchTerm}
              autoComplete="off"
            />
          </div>
        </div>

        {searchTerm && (
          <div className="max-w-lg w-full lg:max-w-xs">
            <div className="mt-1 w-full rounded-md bg-white shadow-lg">
              <ul className="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm divide-y divide-gray-200 text-center">
                {asteroidsMatched.map((asteroid) => (
                  <li
                    onClick={(e) => handleSearchClick(e, asteroid.id)}
                    key={asteroid.id}
                    className="text-gray-900 cursor-default select-none relative py-2 pl-3 pr-9 font-semibold lg:hover:text-white lg:hover:bg-blue-800"
                  >
                    {asteroid.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
