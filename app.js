const express = require("express");
const client = require("prom-client");

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

// sample route
app.get("/", (req, res) => {
  httpRequests.inc();
  res.send("Node.js App Running on EC2");
});

// metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});