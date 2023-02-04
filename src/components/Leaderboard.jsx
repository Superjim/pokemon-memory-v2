import React, { useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

function Leaderboard({ firestore, score, gameState, generation }) {
  const [formValue, setFormValue] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [orderByScore, setOrderByScore] = useState(true);
  const [leaderboardGeneration, setLeaderboardGeneration] =
    useState(generation);

  const scoresRef = firestore.collection("scores");

  const buttonGenerationList = [
    "Generation 1",
    "Generation 2",
    "Generation 3",
    "Generation 4",
    "Generation 5",
    "Generation 6",
    "Generation 7",
    "Generation 8",
    "Open",
  ];

  let query = "";
  if (orderByScore) {
    query = scoresRef
      .where("generation", "==", leaderboardGeneration)
      .orderBy("score", "desc")
      .limit(10);
  } else {
    query = scoresRef
      .where("generation", "==", leaderboardGeneration)
      .orderBy("percent", "desc")
      .limit(10);
  }
  const [scores, loading, error] = useCollectionData(query, { idField: "id" });

  if (error) {
    try {
      console.error(error);
    } catch (e) {
      console.error(e);
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const submitScore = async (e) => {
    e.preventDefault();
    const length = gameState.length;
    const percent = (score / length) * 100;

    try {
      await scoresRef.add({
        user: formValue,
        score: score,
        possibleScore: length,
        percent: percent,
        generation: generation,
      });

      setFormValue("");
      setSubmitted(true);
    } catch (error) {
      console.error(error);
    }

    setFormValue("");
    setSubmitted(true);
  };

  return (
    <div className="leaderboard-container">
      <h3>Top 10 Leaderboard</h3>{" "}
      <div>
        {buttonGenerationList.map((gen) => (
          <button
            key={gen}
            className={gen === leaderboardGeneration ? "selected" : ""}
            onClick={() => setLeaderboardGeneration(gen)}
          >
            {gen.replace("Generation ", "Gen ")}
          </button>
        ))}
      </div>
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
      <td>{percent.toFixed(2)}%</td>
    </tr>
  );
}

export default Leaderboard;
