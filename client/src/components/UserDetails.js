import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

// Define styles for various elements
const containerStyle = {
  padding: "20px",
  fontFamily: "Arial, sans-serif",
  lineHeight: "1.6",
};

const headerStyle = {
  color: "#333",
  borderBottom: "2px solid #eee",
  paddingBottom: "10px",
  marginBottom: "20px",
};

const imgStyle = {
  borderRadius: "50%",
  marginBottom: "10px",
};

const buttonStyle = {
  backgroundColor: "#007bff",
  color: "#fff",
  border: "none",
  padding: "10px 15px",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};

const buttonHoverStyle = {
  ...buttonStyle,
  backgroundColor: "#0056b3",
};

const repoStyle = {
  marginBottom: "20px",
};

// Component to display user details and repositories
const UserDetails = () => {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [selectedRepo, setSelectedRepo] = useState(null);
  const [commits, setCommits] = useState([]);
  const { username } = useParams();

  // Fetch user details and repositories on component mount or when username changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:5001/api/users/${username}`);
        setUser(userResponse.data);

        const reposResponse = await axios.get(`http://localhost:5001/api/users/${username}/repos`);
        setRepos(reposResponse.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };
    fetchData();
  }, [username]);

  // Fetch repository details and commits when a repository is selected
  const fetchRepoDetails = async (repoName) => {
    try {
      const repoResponse = await axios.get(`http://localhost:5001/api/repos/${username}/${repoName}`);
      setSelectedRepo(repoResponse.data);

      const commitsResponse = await axios.get(`http://localhost:5001/api/repos/${username}/${repoName}/commits`);
      setCommits(commitsResponse.data);
    } catch (error) {
      console.error("Error fetching repo details:", error);
    }
  };

  return (
    <div style={containerStyle}>
      {/* Display user information */}
      {user && (
        <div>
          <h1 style={headerStyle}>{user.name}</h1>
          <img src={user.avatar_url} alt={user.login} style={imgStyle} width="100" />
          <p>{user.bio}</p>
          <h2 style={headerStyle}>Repositories</h2>
          <ul>
            {/* List and provide buttons to view details of each repository */}
            {repos.map((repo) => (
              <li key={repo.id} style={repoStyle}>
                <h3>{repo.name}</h3>
                <p>{repo.description}</p>
                <button
                  onClick={() => fetchRepoDetails(repo.name)}
                  style={buttonStyle}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
                >
                  View Details
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Display selected repository details and commits */}
      {selectedRepo && (
        <div>
          <h2 style={headerStyle}>Repository Details</h2>
          <p>
            <strong>Name:</strong> {selectedRepo.name}
          </p>
          <p>
            <strong>Description:</strong> {selectedRepo.description}
          </p>
          <p>
            <strong>Created at:</strong> {new Date(selectedRepo.created_at).toLocaleDateString()}
          </p>
          <h3>Last 5 Commits</h3>
          <ul>
            {/* List the last 5 commits */}
            {commits.map((commit) => (
              <li key={commit.sha}>{commit.commit.message}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDetails;
