import React, { useState, useEffect } from "react";
import { useFetch } from "./useFetch";
import Follower from "./Follower";

function App() {
  const { loading, data } = useFetch();
  const [page, setPage] = useState(0);
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    if (loading) return;
    setFollowers(data[0]);
  }, [loading]);

  return (
    <main>
      <div className="section-title">
        <h1>{loading ? "Loading..." : "pagination"}</h1>
        <div className="underline"></div>
      </div>
      <div className="followers">
        <div className="container">
          {followers.map((follower) => {
            return <Follower key={follower.id} {...follower} />;
          })}
        </div>
      </div>
    </main>
  );
}

export default App;
