import React from "react";

export default function TableRow({ asteroid, setSelectedRows, idx, isActive }) {
  function handleClick(_e, id) {
    setSelectedRows((prevState) => {
      if (prevState.has(id)) {
        prevState.delete(id);
        return new Set([...prevState.values()]);
      }

      return new Set([...prevState.values(), id]);
    });
  }
  return (
    <tr
      className={`group lg:hover:bg-blue-800 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} ${
        isActive ? "row-active" : ""
      }`}
      key={asteroid.id}
      onClick={(e) => handleClick(e, asteroid.id)}
    >
      <td className={"px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500 lg:group-hover:text-white " + ""}>
        {asteroid.date}
      </td>
      <td className={"px-6 py-4 whitespace-nowrap text-sm text-gray-500 lg:group-hover:text-white " + ""}>
        {asteroid.name}
      </td>
      <td className={"px-6 py-4 whitespace-nowrap text-sm text-gray-500 lg:group-hover:text-white " + ""}>
        {truncToTwoDec(asteroid.speed)}
      </td>
      <td className={"px-6 py-4 whitespace-nowrap text-sm text-gray-500 lg:group-hover:text-white " + ""}>
        <div>
          <span className={"font-semibold" + ""}>Max: </span>
          {truncToTwoDec(asteroid.diameter.max)}
        </div>
        <div>
          <span className={"font-semibold" + ""}>Min: </span>
          {truncToTwoDec(asteroid.diameter.min)}
        </div>
      </td>
    </tr>
  );
}
function truncToTwoDec(num) {
  return parseInt(num * 100, 10) / 100;
}
