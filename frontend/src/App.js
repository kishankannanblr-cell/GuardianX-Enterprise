import "./App.css";
import { Toaster } from "./components/ui/sonner";
import GuardianX from "./components/GuardianX";

function App() {
  return (
    <div className="App">
      <GuardianX />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "rgba(15, 23, 42, 0.95)",
            border: "1px solid rgba(51, 65, 85, 0.7)",
            color: "#f8fafc",
            backdropFilter: "blur(12px)",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "12px",
          },
        }}
      />
    </div>
  );
}

export default App;
