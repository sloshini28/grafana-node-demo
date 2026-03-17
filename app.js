const express = require("express");
const client = require("prom-client");
const winston = require("winston"); // 👈 added

const app = express();

// create registry
const register = new client.Registry();

// collect default metrics
client.collectDefaultMetrics({ register });

// custom metric
const httpRequests = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests"
});

register.registerMetric(httpRequests);

// logger (ONLY addition)
const logger = winston.createLogger({
  transports: [
    new winston.transports.File({ filename: "app.log" })
  ]
});

// sample route
app.get("/", (req, res) => {
  httpRequests.inc();
  logger.info("GET / called"); // 👈 added
  res.send("Node.js App Running on EC2");
});

// metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(5000, () => {
  console.log("Server running on port 3000");
});