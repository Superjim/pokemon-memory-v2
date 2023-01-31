import React, { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

function Leaderboard({ firestore, auth, score, gameState }) {
  const [formValue, setFormValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [orderByScore, setOrderByScore] = useState(true);
  const scoresRef = firestore.collection("scores");
  let query = "";
  if (orderByScore) {
    query = scoresRef.orderBy("score", "desc").limit(10);
  } else {
    query = scoresRef.orderBy("percent", "desc").limit(10);
  }
  const [scores] = useCollectionData(query, { idField: "id" });

  const submitScore = async (e) => {
    e.preventDefault();
    const length = gameState.length;
    const percent = (score / length) * 100;

    await scoresRef.add({
      user: formValue,
      score: score,
      possibleScore: length,
      percent: percent,
    });

    setFormValue("");
    setSubmitted(true);
  };

  return (
    <div className="leaderboard-container">
      <h3>Top 10 Leaderboard</h3>

      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Score</th>
            <th>Possible Score</th>
            <th>Percent</th>
          </tr>
        </thead>
        <tbody>
          {scores &&
            scores.map((score) => (
              <Score
                key={score.id}
                user={score.user}
                score={score.score}
                possibleScore={score.possibleScore}
                percent={score.percent}
              />
            ))}
        </tbody>
      </table>
      <button onClick={() => setOrderByScore(!orderByScore)}>
        {orderByScore ? "Sort by Percent" : "Sort by Score"}
      </button>
      {!submitted && (
        <form className="leaderboard-form" onSubmit={submitScore}>
          <input
            required
            placeholder="Enter your name"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
          />
          <button type="submit">Add Score</button>
        </form>
      )}
    </div>
  );
}

function Score({ key, user, score, possibleScore, percent }) {
  return (
    <tr key={key}>
      <td>{user}</td>
      <td>{score}</td>
      <td>{possibleScore}</td>
      <td>{percent}%</td>
    </tr>
  );
}

export default Leaderboard;
