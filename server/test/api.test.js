const request = require("supertest");
const app = require("../index");

describe("GET /api/users/:username", () => {
  let server;
  const port = 5002;

  beforeAll((done) => {
    // Start the server and signal Jest that setup is complete
    server = app.listen(port, () => {
      console.log(`Test server running on port ${port}`);
      done();
    });
  });

  afterAll((done) => {
    // Close the server and signal Jest that cleanup is complete
    server.close(() => {
      console.log(`Test server on port ${port} closed`);
      done();
    });
  });

  it("should match the snapshot", async () => {
    const response = await request(server).get("/api/users/Afk-Marcel");
    expect(response.status).toBe(200);
    expect(response.body).toMatchSnapshot();
  });
});
