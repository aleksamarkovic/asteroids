import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

import ErrorNotification from "./ErrorNotification";

export default function AsteroidsCharts() {
  const [showError, setShowError] = useState(false);
  const [chartsData, setChartsData] = useState([]);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (!location.state) return history.push("/");
    const { selectedAsteroids } = location.state;

    if (selectedAsteroids.length > 0) {
      selectedAsteroids.forEach((asteroid) => {
        const { name, id } = asteroid;

        const params = new URLSearchParams({
          api_key: "x0HeIJzRCLm3lj0zrfXt2LltusKVCO7aoHmRkVq2",
        });

        fetch(`https://www.neowsapp.com/rest/v1/neo/${id}?` + params)
          .then((resp) => resp.json())
          .then((data) => {
            let count = 0;

            data.close_approach_data.forEach((date) => {
              const year = date.close_approach_date.substr(0, 4);

              if (year >= "1900" && year <= "1999") {
                count += 1;
              }
            });

            function chartColor(num) {
              if (num <= 25) return "green";
              if (num < 45) return "yellow";
              if (num < 75) return "orange";
              return "red";
            }

            setChartsData((prevState) => {
              return [
                ...prevState,
                <li key={id} className="py-4">
                  <div className="flex mb-2">
                    <div className="w-1/4 mr-4 lg:mr-10 font-semibold">{name}</div>
                    <div className="w-3/4 self-center text-center flex">
                      <div
                        className={`chart-color-${chartColor(count)}`}
                        style={{ width: `${count > 100 ? 100 : count}%` }}
                      >
                        {count}
                      </div>
                      <div className={`bg-${chartColor(count)}-100 flex-grow text-center text-black`}>
                        {count === 0 ? 0 : null}
                      </div>
                    </div>
                  </div>
                </li>,
              ];
            });
          })
          .catch(() => {
            setShowError(
              "Sorry something went wrong with NASA servers, please try again. If the problem persists try again at later times."
            );

            setChartsData([<ErrorNotification message={showError} onDismiss={() => setShowError(false)} />]);
          });
      });
    }
  }, []);

  return (
    <div className="mx-auto pt-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white overflow-hidden shadow rounded-lg ">
          <div className="px-4 py-5 sm:p-6">
            <ul className="divide-y divide-gray-200">
              {chartsData.length ? chartsData : <h1 className="w-1/2 mx-auto text-center font-bold">Loading...</h1>}
            </ul>
            <div className="mt-5 w-1/2 mx-auto">
              <button
                onClick={() => history.push("/")}
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Go back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
