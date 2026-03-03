# 🔐 LeakTrace – Email Breach Detection & Risk Analytics Platform

LeakTrace is a full-stack security analytics application that scans uploaded CSV files containing employee email addresses, evaluates exposure risk using internal detection logic, and visualizes results through dashboards and historical trend analysis.

The system is built with a modular backend architecture, allowing future integration with external breach intelligence APIs while currently operating with internal exposure simulation logic.

---

## 🚀 Features

- 📁 CSV Upload & Parsing
- 🔍 Email Exposure Risk Classification (High / Low)
- 📊 Post-Scan Detailed Analysis
- 📈 Risk Trend Visualization (Chart.js)
- 🗂 Scan History Tracking
- 📦 MongoDB Data Persistence
- 🧩 Modular REST API Architecture

---

## 🏗 Tech Stack

### Frontend
- HTML5
- CSS3 (Custom Dark UI)
- Bootstrap 5
- Vanilla JavaScript
- Chart.js (Data Visualization)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

---

## 📊 System Workflow
Upload CSV -> Parse Email Data -> Apply Risk Detection Logic -> Store Results in MongoDB -> Generate Dashboard KPIs -> Display Post Scan Results -> Track Historicak Trends
