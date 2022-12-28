import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Auth from "./routes/Auth/Auth";
import AuthProvider from "./routes/AuthProvider";
import Home from "./routes/Home/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route exact path="/auth?/:action" element={<Auth />} />
            <Route
              exact path="/"
              element={
                <AuthProvider
                  element={<Home />}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
