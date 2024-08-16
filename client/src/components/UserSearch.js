import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Define styles for the user search component
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  backgroundColor: "#f5f5f5",
  borderRadius: "8px",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  margin: "20px auto",
  maxWidth: "500px",
};

const inputStyle = {
  width: "80%",
  padding: "10px",
  margin: "10px 0",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "16px",
};

const buttonStyle = {
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  borderRadius: "4px",
  cursor: "pointer",
  fontSize: "16px",
  marginBottom: "20px",
};

const buttonHoverStyle = {
  backgroundColor: "#0056b3",
};

const userCardStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
  padding: "10px",
  backgroundColor: "#fff",
  border: "1px solid #ddd",
  borderRadius: "8px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  maxWidth: "100%",
};

const linkStyle = {
  marginTop: "10px",
  textDecoration: "none",
  color: "#007bff",
  fontSize: "16px",
};

// Component for searching GitHub users
const UserSearch = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  // Handle the search button click
  const handleSearch = async () => {
    try {
      // Fetch user data from the API
      const response = await axios.get(`http://localhost:5001/api/users/${username}`);
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div style={containerStyle}>
      <h1>GitHub User Search</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter GitHub username"
        style={inputStyle}
      />
      <button
        onClick={handleSearch}
        style={buttonStyle}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
      >
        Search
      </button>
      {/* Display user information if available */}
      {user && (
        <div style={userCardStyle}>
          <h2>{user.name}</h2>
          <img src={user.avatar_url} alt={user.login} width="100" />
          <p>{user.bio}</p>
          {/* Link to user details page */}
          <Link to={`/user/${user.login}`} style={linkStyle}>
            View Details
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserSearch;
