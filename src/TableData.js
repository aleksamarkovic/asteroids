import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import AsteroidsSelected from "./AsteroidsSelected";
import SearchAsteroids from "./SearchAsteroids";
import TableRow from "./TableRow";

// import { testData } from "./testData";

export default function TableData({ data }) {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const [tableData, setTableData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    // data = testData;
    for (let day of Object.keys(data.near_earth_objects)) {
      data.near_earth_objects[day].forEach((asteroid) => {
        if (!asteroid.is_potentially_hazardous_asteroid) return;

        setTableData((prevState) => [
          ...prevState,
          {
            id: asteroid.id,
            name: asteroid.name,
            date: asteroid.close_approach_data[0].close_approach_date,
            speed: asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour,
            diameter: {
              max: asteroid.estimated_diameter.meters.estimated_diameter_max,
              min: asteroid.estimated_diameter.meters.estimated_diameter_min,
            },
          },
        ]);
      });
    }
  }, []);

  function onChartsClick() {
    history.push({
      pathname: "/charts",
      state: { selectedAsteroids: tableData.filter((asteroid) => selectedRows.has(asteroid.id)) },
    });
  }

  return (
    <>
      <div className="mx-auto pt-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 lg:group-hover:text-white uppercase tracking-wider"
                      >
                        Date
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 lg:group-hover:text-white uppercase tracking-wider"
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 lg:group-hover:text-white uppercase tracking-wider"
                      >
                        Speed (km/h)
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 lg:group-hover:text-white uppercase tracking-wider"
                      >
                        Diameter (m)
                      </th>
                    </tr>
                  </thead>
                  <tbody x-max="2">
                    {tableData.map((row, idx) => (
                      <TableRow
                        idx={idx}
                        key={row.id}
                        setSelectedRows={setSelectedRows}
                        asteroid={row}
                        isActive={selectedRows.has(row.id)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-2xl mx-auto pt-12 flex items-start">
        <SearchAsteroids
          setSelectedAsteroids={setSelectedRows}
          selectedAsteroids={selectedRows}
          asteroids={tableData}
        />
        <AsteroidsSelected
          selectedAsteroids={tableData.filter((asteroid) => selectedRows.has(asteroid.id))}
          onChartsClick={onChartsClick}
        />
      </div>
    </>
  );
}
