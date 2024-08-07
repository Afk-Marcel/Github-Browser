// Load environment variables from .env file
require("dotenv").config();

// Import required modules
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const axios = require("axios");

// Initialize Express app
const app = express();

// Middleware to handle CORS and security
app.use(cors());
app.use(helmet());
app.use(express.json());

// Retrieve GitHub API token from environment variables
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Route to get user data from GitHub
app.get("/api/users/:username", async (req, res) => {
  const { username } = req.params;
  console.log(`Fetching user data for: ${username}`);

  try {
    // Fetch user data from GitHub API
    const response = await axios.get(`https://api.github.com/users/${username}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    // Handle errors and respond with appropriate status
    console.error("Error fetching user data:", error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).send("Internal Server Error");
  }
});

// Route to get user repositories from GitHub
app.get("/api/users/:username/repos", async (req, res) => {
  const { username } = req.params;
  console.log(`Fetching repos for: ${username}`);

  try {
    // Fetch user repositories from GitHub API
    const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    // Handle errors and respond with appropriate status
    console.error("Error fetching repos:", error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).send("Internal Server Error");
  }
});

// Route to get repository details from GitHub
app.get("/api/repos/:owner/:repo", async (req, res) => {
  const { owner, repo } = req.params;
  console.log(`Fetching repo details for: ${owner}/${repo}`);

  try {
    // Fetch repository details from GitHub API
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    res.json(response.data);
  } catch (error) {
    // Handle errors and respond with appropriate status
    console.error("Error fetching repo details:", error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).send("Internal Server Error");
  }
});

// Route to get commits for a repository from GitHub
app.get("/api/repos/:owner/:repo/commits", async (req, res) => {
  const { owner, repo } = req.params;
  console.log(`Fetching commits for: ${owner}/${repo}`);

  try {
    // Fetch commits from GitHub API
    const response = await axios.get(`https://api.github.com/repos/${owner}/${repo}/commits`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    // Limit the response to the last 5 commits
    const commits = response.data.slice(0, 5);
    res.json(commits);
  } catch (error) {
    // Handle errors and respond with appropriate status
    console.error("Error fetching commits:", error.response ? error.response.data : error.message);
    res.status(error.response ? error.response.status : 500).send("Internal Server Error");
  }
});

module.exports = app;

// If running as a standalone app, start the server
if (require.main === module) {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
