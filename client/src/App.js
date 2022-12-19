import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import Auth from "./routes/Auth/Auth";
import AuthProvider from "./routes/AuthProvider";

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Routes>
            <Route exact path="/auth" element={<Auth />} />
            <Route
              exact path="/"
              element={
                <AuthProvider
                  element={
                    <>
                      Test
                    </>
                  }
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
