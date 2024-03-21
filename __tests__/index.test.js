const app = require("../app.js");
const request = require("supertest");
const db = require("../db/connection.js");
const seed = require("../db/seed.js");

// setting a different port for testing
const testPort = 3001;

beforeAll((done) => {
  // Starting the server on the test port
  app.server = app.listen(testPort, () => {
    console.log(`Test server is running on port ${testPort}`);
    done();
  });
});

beforeEach(async () => {
  await seed();
}, 5000); // Increasing timeout

afterAll(async () => {
  // Close the server and database connection after all tests
  app.server.close();
  await db.end();
});

describe("GET /api/races", () => {
  test("should return all races", async () => {
    const response = await request(app).get("/api/races");
    expect(response.status).toBe(200);
    expect(response.body.races.length).toBeGreaterThan(0);

    response.body.races.forEach((race) => {
      expect(typeof race.race_name).toBe("string");
      expect(race.race_name.trim()).toBeTruthy(); // Ensure race name is not empty or whitespace
      expect(typeof race.circuit).toBe("string");
      expect(typeof race.race_id).toBe("number");
    });
  });
});

describe("GET /api/races/:race_id", () => {
  test("should return a single race by race_id", async () => {
    const response = await request(app).get("/api/races/1");
    expect(response.status).toBe(200);
    expect(response.body.race).toBeDefined();

    const { race } = response.body;
    expect(typeof race.race_name).toBe("string");
    expect(race.race_name.trim()).toBeTruthy(); // Ensure race name is not empty or whitespace
    expect(typeof race.circuit).toBe("string");
    expect(typeof race.race_id).toBe("number");
  });

  test("should return 404 for non-existent race_id", async () => {
    const response = await request(app).get("/api/races/999");
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe("Race not found");
  });
});

describe("GET /api/races/:race_id/results", () => {
  test("should return race results by race_id", async () => {
    const response = await request(app).get("/api/races/1/results");
    expect(response.status).toBe(200);
    expect(response.body.results.length).toBeGreaterThan(0);

    response.body.results.forEach((result) => {
      expect(typeof result.driver).toBe("string");
      expect(result.driver.trim()).toBeTruthy(); // Ensure driver name is not empty or whitespace
      expect(typeof result.position).toBe("number");
    });
  });

  test("should return 404 for non-existent race_id", async () => {
    const response = await request(app).get("/api/races/999/results");
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe("Race results not found");
  });
});
