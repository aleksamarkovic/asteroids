import React from "react";

export default function AsteroidsSelected({ onChartsClick, selectedAsteroids }) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg w-1/2 ">
      <div className="px-4 py-5 sm:p-6">
        <div>
          <h3 className="text-gray-900 font-medium text-center">Asteroids selected: </h3>
          <ul className="mt-2 divide-y divide-gray-200 border border-dashed text-center" x-max="1">
            {selectedAsteroids.length > 0
              ? selectedAsteroids.map((asteroid) => (
                  <li key={asteroid.id} className="px-6 py-4 font-medium bg-gray-50">
                    {asteroid.name}
                  </li>
                ))
              : null}
          </ul>
        </div>
        <div className="text-center mt-3">
          <button
            type="button"
            className="items-center px-3 py-2 border border-transparent sm:text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            onClick={onChartsClick}
          >
            Display Charts
          </button>
        </div>
      </div>
    </div>
  );
}
