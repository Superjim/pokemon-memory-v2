import React, { useState, useEffect } from "react";
import Checkbox from "./Checkbox";
import gen1 from "../images/gen1.jpg";

function CheckboxContainer({ setRangeDifficulty, setMaxDifficulty }) {
  //checkbox state
  const [generation1, setGeneration1] = useState(true);
  const [generation2, setGeneration2] = useState(false);
  const [generation3, setGeneration3] = useState(false);
  const [generation4, setGeneration4] = useState(false);
  const [generation5, setGeneration5] = useState(false);
  const [generation6, setGeneration6] = useState(false);
  const [generation7, setGeneration7] = useState(false);
  const [generation8, setGeneration8] = useState(false);

  //useEffect to change ranges
  useEffect(() => {
    function createRangeArray() {
      const ranges = [];

      if (generation1) ranges.push([1, 151]);
      if (generation2) ranges.push([152, 251]);
      if (generation3) ranges.push([252, 386]);
      if (generation4) ranges.push([387, 493]);
      if (generation5) ranges.push([494, 649]);
      if (generation6) ranges.push([650, 721]);
      if (generation7) ranges.push([722, 809]);
      if (generation8) ranges.push([810, 905]);

      return ranges;
    }

    function calculateMaxDifficulty() {
      let total = 0;

      if (generation1) total += 151;
      if (generation2) total += 251 - 151;
      if (generation3) total += 386 - 251;
      if (generation4) total += 493 - 386;
      if (generation5) total += 649 - 493;
      if (generation6) total += 721 - 649;
      if (generation7) total += 809 - 721;
      if (generation8) total += 905 - 809;

      return total;
    }

    const ranges = createRangeArray();
    const total = calculateMaxDifficulty();

    setRangeDifficulty(ranges);
    setMaxDifficulty(total);
  }, [
    generation1,
    generation2,
    generation3,
    generation4,
    generation5,
    generation6,
    generation7,
    generation8,
  ]);

  return (
    <div className="checkbox-container">
      <Checkbox
        label="Generation 1"
        id="generation1"
        range="(1 - 151)"
        image={gen1}
        checked={generation1}
        onChange={() => setGeneration1(!generation1)}
      />
      <Checkbox
        label="Generation 2"
        id="generation2"
        range="(152 - 251)"
        image="gen2"
        checked={generation2}
        onChange={() => setGeneration2(!generation2)}
      />
      <Checkbox
        label="Generation 3"
        id="generation3"
        range="(252 - 386)"
        image="gen3"
        checked={generation3}
        onChange={() => setGeneration3(!generation3)}
      />
      <Checkbox
        label="Generation 4"
        id="generation4"
        range="(387 - 493)"
        image="gen4"
        checked={generation4}
        onChange={() => setGeneration4(!generation4)}
      />
      <Checkbox
        label="Generation 5"
        id="generation5"
        range="(494 - 649)"
        image="gen5"
        checked={generation5}
        onChange={() => setGeneration5(!generation5)}
      />
      <Checkbox
        label="Generation 6"
        id="generation6"
        range="(650 - 721)"
        image="gen6"
        checked={generation6}
        onChange={() => setGeneration6(!generation6)}
      />
      <Checkbox
        label="Generation 7"
        id="generation7"
        range="(722 - 809)"
        image="gen7"
        checked={generation7}
        onChange={() => setGeneration7(!generation7)}
      />
      <Checkbox
        label="Generation 8"
        id="generation8"
        range="(810 - 905)"
        image="gen8"
        checked={generation8}
        onChange={() => setGeneration8(!generation8)}
      />
    </div>
  );
}

export default CheckboxContainer;
