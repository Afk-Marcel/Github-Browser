import React from "react";
import renderer from "react-test-renderer";
import UserDetails from "../components/UserDetails";
import { BrowserRouter as Router } from "react-router-dom";
import axios from "axios";

// Mock axios for testing
jest.mock("axios");

describe("UserDetails Component", () => {
  // Test case for snapshot matching
  it("should match the snapshot", async () => {
    // Mock axios responses based on URL
    axios.get.mockImplementation((url) => {
      if (url.includes("/users/Afk-Marcel")) {
        // Mock user data response
        return Promise.resolve({
          data: {
            name: "Marcel Afk",
            avatar_url: "http://example.com/avatar.jpg",
            bio: "Developer",
          },
        });
      } else if (url.includes("/users/Afk-Marcel/repos")) {
        // Mock repositories data response
        return Promise.resolve({
          data: [
            {
              id: 1,
              name: "repo1",
              description: "First repo",
            },
          ],
        });
      }
    });

    // Render the UserDetails component inside Router to handle routing
    const tree = renderer
      .create(
        <Router>
          <UserDetails />
        </Router>
      )
      .toJSON();

    // Compare rendered output to the saved snapshot
    expect(tree).toMatchSnapshot();
  });
});
