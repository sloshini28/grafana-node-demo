// 🔥 ---- TRACING (MUST BE FIRST) ----
const { NodeSDK } = require('@opentelemetry/sdk-node');
const { getNodeAutoInstrumentations } = require('@opentelemetry/auto-instrumentations-node');
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: 'http://localhost:4318/v1/traces', // change if needed
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();
console.log("✅ Tracing initialized");


// 🔥 ---- APP + METRICS + LOGS ----
const express = require("express");
const client = require("prom-client");
const winston = require("winston");

const app = express();

// ---- PROMETHEUS METRICS ----

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


// ---- LOGGER (Winston → console) ----
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console()
  ]
});


// ---- ROUTES ----

// sample route
app.get("/", (req, res) => {
  httpRequests.inc();

  logger.info("GET / called");

  res.send("Node.js App Running with Metrics + Logs + Traces 🚀");
});

// metrics endpoint
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});


// ---- SERVER ----
app.listen(5000, () => {
  console.log("Server running on port 5000");
});