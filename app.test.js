const request = require("supertest");
const app = require("./app");

const reqBody = {
  startDate: "2016-01-26",
  endDate: "2018-02-02",
  minCount: 2700,
  maxCount: 3000,
};

describe("POST /getData", () => {
  describe("Given all required fields", () => {
    test("should respond with a status code 200", async () => {
      const response = await request(app).post("/getData").send(reqBody);
      expect(response.statusCode).toBe(200);
    });

    test("should specify json in the content type header ", async () => {
      const response = await request(app).post("/getData").send(reqBody);
      expect(response.headers["content-type"]).toEqual(
        expect.stringContaining("json")
      );
    });

    test("should response has code, msg and records", async () => {
      const response = await request(app).post("/getData").send(reqBody);
      expect(
        response.body.code && response.body.msg && response.body.records
      ).toBeDefined();
    });
  });

  describe("When a missing request body field", () => {
    test("should respond with a status code 422", async () => {
      const reqBody = [
        { startDate: "2016-01-26" },
        { endDate: "2018-02-02" },
        { minCount: 2700 },
        { maxCount: 3000 },
        {}
      ];

      for (const body of reqBody){
        const response = await request(app).post("/getData").send(body);
        expect(response.statusCode).toBe(422);
      }
      
    });

  });
});
