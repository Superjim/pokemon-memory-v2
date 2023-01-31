import React from "react";
import { FirebaseError } from "firebase/app";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

function Leaderboard({ firestore }) {
  const scoresRef = firestore.collection("scores");
  const query = scoresRef.orderBy("score").limit(5);

  const [scores] = useCollectionData(query, { idField: "id" });
  return (
    <div>
      <p>leadboard</p>
      {scores && scores.map((score) => <ul key="score.id">{score}</ul>)}
    </div>
  );
}

export default Leaderboard;
