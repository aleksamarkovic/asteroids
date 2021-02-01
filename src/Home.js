import React, { useState } from "react";

import DatePicker from "./DatePicker";
import TableData from "./TableData";

export default function Home() {
  const [asteroidData, setAsteroidData] = useState(null);

  return asteroidData ? (
    <>
      <DatePicker setAsteroidData={setAsteroidData} />
      <TableData key="table" data={asteroidData} />
    </>
  ) : (
    <DatePicker setAsteroidData={setAsteroidData} />
  );
}
