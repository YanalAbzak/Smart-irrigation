// tests/app.test.js
const request = require("supertest");
const express = require("express");
const app = require("../index"); // אם app.js שלך מייצא את השרת

describe("🌿 /plants API", () => {
    it("GET /plants → should return 200 and an array", async () => {
        const res = await request(app).get("/plants");
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});
