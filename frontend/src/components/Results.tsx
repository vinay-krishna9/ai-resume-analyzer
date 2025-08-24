import React from "react";

interface ResultsProps {
  results: any;
}

const Results: React.FC<ResultsProps> = ({ results }) => {
  return (
    <div
      style={{ border: "1px solid #ccc", padding: "1rem", borderRadius: "8px" }}
    >
      {/* <h2>Results for {results.role}</h2>
      <p>Score: {results.score}%</p>

      <div>
        <h3>Skills Found:</h3>
        <ul>
          {results.skillsFound.map((skill: string) => (
            <li key={skill}>✅ {skill}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Missing Skills:</h3>
        <ul>
          {results.missingSkills.map((skill: string) => (
            <li key={skill}>❌ {skill}</li>
          ))}
        </ul>
      </div>

      <div>
        <h3>Suggestions:</h3>
        <ul>
          {results.suggestions.map((s: string, i: number) => (
            <li key={i}>- {s}</li>
          ))}
        </ul>
      </div> */}
      <div>{JSON.stringify(results, null, 2)}</div>
    </div>
  );
};

export default Results;
