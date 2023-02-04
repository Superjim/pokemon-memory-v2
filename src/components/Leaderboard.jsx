import React, { useContext, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { GameContext } from "../contexts/GameContext";
import SignIn from "./SignIn";

function Leaderboard({ firebase, firestore, auth }) {
  const { score, gameState, generation } = useContext(GameContext);

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
      .orderBy("percent", "desc")
      .limit(10);
  } else {
    query = scoresRef
      .where("generation", "==", leaderboardGeneration)
      .orderBy("percent", "desc")
      .orderBy("score", "desc")
      .limit(10);
  }

  const [scores, error] = useCollectionData(query, { idField: "id" });

  if (error) {
    console.error(error);
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
      <div className="button-container-ldr">
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
            <th>Rank</th>
            <th>User</th>
            <th>Score</th>
            <th className="possible-score">Possible Score</th>
            <th>Percent</th>
          </tr>
        </thead>
        <tbody>
          {scores &&
            scores.map((score, index) => (
              <Score
                key={index}
                position={index}
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
      {!submitted ? (
        <form className="leaderboard-form" onSubmit={submitScore}>
          <input
            required
            placeholder="Enter your name"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
          />
          {auth.currentUser ? (
            <button type="submit">Add Score</button>
          ) : (
            <>
              <button className="disabled" disabled>
                Add Score
              </button>
            </>
          )}
        </form>
      ) : (
        <p>Thank you for adding your score</p>
      )}
      {!auth.currentUser && (
        <p>
          You must <SignIn firebase={firebase} auth={auth} /> to add your score
        </p>
      )}
    </div>
  );
}

function Score({ position, user, score, possibleScore, percent }) {
  return (
    <tr>
      <td>{position + 1}</td>
      <td>{user}</td>
      <td>{score}</td>
      <td className="possible-score">{possibleScore}</td>
      <td>{percent.toFixed(2)}%</td>
    </tr>
  );
}

export default Leaderboard;
