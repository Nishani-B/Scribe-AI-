import { useState } from "react";
import Splash from "./screens/Splash.jsx";
import Recording from "./screens/Recording.jsx";
import Review from "./screens/Review.jsx";
import Dashboard from "./screens/Dashboard.jsx";


export default function App() {
  const [screen, setScreen] = useState("splash");
  const [soapData, setSoapData] = useState(null);

  return (
    <>
      {screen === "splash" && (
        <Splash onNext={() => setScreen("dashboard")} />
      )}

      {screen === "dashboard" && (
        <Dashboard onNewNote={() => setScreen("recording")} />
      )}

      {screen === "recording" && (
        <Recording
          onClose={() => setScreen("dashboard")}
          onFinish={() => setScreen("review")}
        />
      )}

      {screen === "review" && (
        <Review
          data={soapData}
          onBack={() => setScreen("recording")}
          onApprove={() => setScreen("dashboard")}
        />
      )}
    </>
  );
}
