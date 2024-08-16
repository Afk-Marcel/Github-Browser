import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserSearch from "./components/UserSearch";
import UserDetails from "./components/UserDetails";

// Main application component that handles routing
function App() {
  return (
    <Router>
      <div>
        {/* Define routes for the application */}
        <Routes>
          {/* Route for the home page, renders UserSearch component */}
          <Route path="/" element={<UserSearch />} />
          {/* Route for user details page, renders UserDetails component with username parameter */}
          <Route path="/user/:username" element={<UserDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
