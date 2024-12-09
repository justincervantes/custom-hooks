import React from "react";
import { useMockQuery } from "./hooks/useMockQuery.ts";

function App() {
  const dummyData = {
    bookingNumber: "XXXXXXXX",
    bookingId: 1,
    bookingStatus: "InProgress",
    checkin: "2024-11-15 07:00:00",
    checkout: "2024-11-20 07:00:00",
    guestNames: ["Don Quixote"],
  };

  const { data, loading, refetch } = useMockQuery(dummyData, { delay: 5000 });

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={refetch}>Refetch</button>
      <div>
        <span>{JSON.stringify(data, undefined, 2)}</span>
      </div>
    </div>
  );
}

export default App;
