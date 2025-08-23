import React, { useState } from "react";
import "./App.scss";
import Header from "./components/Header";
import UploadForm from "./components/UploadForm";
import Results from "./components/Results";

const App: React.FC = () => {
  const [results, setResults] = useState<any>(null);
  return (
    <div style={{ padding: "40px" }}>
      <Header />
      <UploadForm setResults={setResults} />
      {results && <Results results={results} />}
    </div>
  );
};

export default App;
