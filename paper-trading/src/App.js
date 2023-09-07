import "./App.css";
import Header from "./Header";
import Newsfeed from "./Newsfeed";
import Stats from "./Stats";
import "chart.js/auto";
import "chartjs-adapter-date-fns";

function App() {
  return (
    <div className="App">
      <div className="app_header">
        <Header />
      </div>
      <div className="app_body">
        <div className="app_container">
          <Newsfeed />
          {/* stats */}
          <Stats />
        </div>
      </div>
    </div>
  );
}

export default App;
