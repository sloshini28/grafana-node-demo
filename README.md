# 🚀 Node.js Observability Stack (Grafana + Prometheus + Loki + Tempo)

This project demonstrates a complete observability setup for a Node.js application using:

* 📊 **Prometheus** for metrics
* 📈 **Grafana** for visualization
* 📜 **Loki** for log aggregation
* 🔍 **Tempo** for distributed tracing

The stack is deployed on an AWS EC2 instance without Docker.

---

## 🌐 Live Deployment (EC2)

All services are running on an EC2 instance.

### 🔗 Access URLs

* Node.js App → http://<EC2-PUBLIC-IP>:3000
* Metrics Endpoint → http://<EC2-PUBLIC-IP>:3000/metrics
* Prometheus → http://<EC2-PUBLIC-IP>:9090
* Grafana → http://<EC2-PUBLIC-IP>:3001
* Loki → http://<EC2-PUBLIC-IP>:3100
* Tempo → http://<EC2-PUBLIC-IP>:3200

> Replace `<EC2-PUBLIC-IP>` with your instance's public IP.

---

## 🧱 Architecture

Node.js App
├── Metrics → Prometheus
├── Logs → Loki
└── Traces → Tempo

Grafana → Visualizes Metrics, Logs, and Traces

---

## ⚙️ Features

* 📊 Application metrics (request count, latency, errors)
* 📜 Centralized logging with Loki
* 🔍 Distributed tracing with Tempo
* 📈 Unified dashboards in Grafana
* 🌐 Deployed on AWS EC2 (no containerization)

---

## 🚀 Getting Started (Local Setup)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/grafana-node-demo.git
cd grafana-node-demo
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the application

```bash
node app.js
```

App runs at:

```bash
http://localhost:3000
```

---

## 📡 Metrics (Prometheus)

The app exposes metrics at:

```bash
http://localhost:3000/metrics
```

### Example Prometheus config:

```yaml
scrape_configs:
  - job_name: 'node-app'
    static_configs:
      - targets: ['localhost:3000']
```

Start Prometheus:

```bash
prometheus --config.file=prometheus.yml
```

---

## 📜 Logging (Loki)

* Application logs are pushed to Loki
* Logs can be queried in Grafana using LogQL

Loki runs on:

```bash
http://localhost:3100
```

---

## 🔍 Tracing (Tempo)

* Traces are generated from the Node.js app
* Tempo collects and stores traces

Tempo runs on:

```bash
http://localhost:3200
```

---

## 📊 Grafana Setup

1. Open Grafana:

```bash
http://localhost:3001

2. Login:

* Username: admin
* Password: admin

3. Add Data Sources:

* Prometheus → http://localhost:9090
* Loki → http://localhost:3100
* Tempo → http://localhost:3200

4. Create dashboards to visualize:

* Metrics (Prometheus)
* Logs (Loki)
* Traces (Tempo)
## 🔐 EC2 Configuration

Make sure the following ports are open in your EC2 Security Group:

* 3000 → Node.js App
* 9090 → Prometheus
* 3001 → Grafana
* 3100 → Loki
* 3200 → Tempo

Also ensure your app is accessible externally:

```js
app.listen(3000, '0.0.0.0', () => {
  console.log('Server running');
});

🛠 Tech Stack

* Node.js
* Prometheus
* Grafana
* Loki
* Tempo
* AWS EC2
📁 Project Structure

```
.
├── app.js
├── .gitignore
└── README.md
```

---

## 🎯 Purpose

This project demonstrates how to build a full observability pipeline for a backend application without using Docker, making it ideal for understanding core monitoring concepts and manual setup.

---

## 📄 License

MIT License
