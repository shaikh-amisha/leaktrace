let riskChart;

async function loadHistory() {
  try {
    const response = await fetch("http://localhost:5000/api/history");
    const data = await response.json();

    console.log("History data:", data);

    // Scan History Table
    const table = document.getElementById("historyTable");
    table.innerHTML = "";

data.scans.forEach(scan => {
      const row = document.createElement("tr");

row.innerHTML = `
  <td class="fw-semibold">Scan</td>
  <td>${new Date(scan.createdAt).toLocaleString()}</td>
  <td><strong>${scan.totalEmails}</strong></td>
  <td class="text-danger fw-bold">${scan.exposedCount}</td>
  <td class="text-success fw-bold">${scan.safeCount}</td>
  <td>
    <button
      class="btn btn-sm btn-outline-primary"
      onclick="viewScan('${scan._id}')">
      View
    </button>
  </td>
`;

table.appendChild(row);

});

    // Risk Trend Chart
    renderTrendChart(data.trend);

  } catch (err) {
    console.error("History load failed", err);
  }
}

function renderTrendChart(trend) {
  const ctx = document.getElementById("riskTrendChart");

  if (window.riskChart) {
    window.riskChart.destroy();
  }

  window.riskChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: trend.map(t => t.label),
      datasets: [
        {
          label: "Exposed",
          data: trend.map(t => t.exposed),
          borderColor: "red",
          backgroundColor: "rgba(255,0,0,0.2)",
          tension: 0.4
        },
        {
          label: "Safe",
          data: trend.map(t => t.safe),
          borderColor: "green",
          backgroundColor: "rgba(0,255,0,0.2)",
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1
          }
        }
      }
    }
  });
}




function viewScan(scanId) {
  window.location.href = `analytics.html?scanId=${scanId}`;
}

window.addEventListener("DOMContentLoaded", loadHistory);
