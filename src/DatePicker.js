import React, { useState } from "react";

import ErrorNotification from "./ErrorNotification";

export default function DatePicker({ setAsteroidData }) {
  const [selectedDate, setSelectedDate] = useState({});
  const [invalidInput, setInvalidInput] = useState(false);

  const SEVEN_DAYS_IN_MILSEC = 604800000;

  function handleInputChange({ target }) {
    const { name, value } = target;

    setSelectedDate((prevState) => ({ ...prevState, [name]: value }));
  }

  async function onDisplayAsteroids() {
    const { startDate, endDate } = selectedDate;
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    if (isNaN(startDateObj.getTime()) || isNaN(endDateObj.getTime())) {
      return setInvalidInput("Select both dates");
    }

    if (endDateObj - startDateObj < 0) {
      return setInvalidInput("End Date is before Start Date");
    }
    if (endDateObj - startDateObj > SEVEN_DAYS_IN_MILSEC) {
      return setInvalidInput("Date limit is only 7 Days");
    }

    const params = new URLSearchParams({
      start_date: startDate,
      end_date: endDate,
      api_key: "x0HeIJzRCLm3lj0zrfXt2LltusKVCO7aoHmRkVq2",
    });

    try {
      const resp = await fetch("https://api.nasa.gov/neo/rest/v1/feed?" + params);

      const data = await resp.json();

      setAsteroidData(data);
    } catch (_) {
      setInvalidInput(
        "Sorry something went wrong with NASA servers, please try again. If the problem persists try again at later times."
      );
    }
  }
  return (
    <div key="upperPage" className="mx-auto pt-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex -space-x-px">
              <div className="w-1/2 flex-1 min-w-0 mr-6">
                <label className="font-medium" htmlFor="startDate">
                  Start Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  id="startDate"
                  className="focus:ring-blue-500 focus:border-blue-500 relative block w-full rounded-none rounded-bl-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
                  placeholder="mm/dd/yyy"
                  onChange={handleInputChange}
                />
              </div>
              <div className="w-1/2 flex-1 min-w-0">
                <label className="font-medium" htmlFor="endDate">
                  End Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  id="endDate"
                  className="focus:ring-blue-500 focus:border-blue-500 relative block w-full rounded-none rounded-br-md bg-transparent focus:z-10 sm:text-sm border-gray-300"
                  placeholder="mm/dd/yyy"
                  onChange={handleInputChange}
                />
              </div>
            </div>
            {invalidInput && (
              <ErrorNotification key="error" message={invalidInput} onDismiss={() => setInvalidInput(false)} />
            )}
            <div className="mt-4 flex flex-row-reverse">
              <button
                type="button"
                className="items-center px-3 py-2 border border-transparent sm:text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={onDisplayAsteroids}
              >
                Display Asteroids
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
