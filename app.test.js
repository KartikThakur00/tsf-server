const request = require("supertest");
const mongoose = require("mongoose");
const app = require("./app.js");
const { text } = require("express");

describe("Test the root path", () => {
  test("It should response the GET method", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("Test the /customers path", () => {
  test("It should response the GET method", (done) => {
    request(app)
      .get("/customers")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("Test the /customers/:id path", () => {
  test("It should response the GET method", (done) => {
    request(app)
      .get("/customers/60f1b0b9e6b3a3b4e8f3b3a0")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("Test the /customers/:id1/:id2 path", () => {
  test("It should response the GET method", (done) => {
    request(app)
      .get("/customers/656eea9483200b2cb724453e/656eea9483200b2cb7244544")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test("It should response the PUT method", (done) => {
    request(app)
      .put("/customers/656eea9483200b2cb724453e/656eea9483200b2cb7244544")
      .send({
        sendAmount: 10,
      })
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

describe("Test the /history path", () => {
  test("It should response the GET method", (done) => {
    request(app)
      .get("/history")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});

afterAll((done) => {
  mongoose.connection.close();
  done();
});
