"use client";
import { useState } from "react";
import CreatableSelect from "react-select/creatable";
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
export default function Home() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  console.log(selectedOptions);
  return (
    <main>
      <h1>Chat App</h1>
      <CreatableSelect
        id="react-select-3-live-region"
        isMulti
        onChange={(ops) => setSelectedOptions(ops as any)}
        options={options}
      />
    </main>
  );
}
