console.log("post-scan.js loaded");


// 1. Get scanId from URL
const params = new URLSearchParams(window.location.search);
const scanId = params.get("scanId");

if (!scanId) {
  alert("No scan selected");
  throw new Error("scanId missing");
}

async function loadPostScan() {
  try {
    const response = await fetch(
      `http://localhost:5000/api/scans/${scanId}/details`
    );

    const data = await response.json();
    console.log("Post-scan data:", data);

    // Summary counts
    document.getElementById("totalEmails").textContent =
      data.scan.totalEmails;

    document.getElementById("highRiskCount").textContent =
      data.scan.exposedCount;

    document.getElementById("lowRiskCount").textContent =
      data.scan.safeCount;

    // Results table
    const tableBody = document.getElementById("resultsTable");
    tableBody.innerHTML = "";

    data.results.forEach((item) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>-</td>
        <td>${item.email}</td>
        <td class="${
          item.exposed ? "text-danger fw-bold" : "text-success fw-bold"
        }">
          ${item.exposed ? "HIGH" : "LOW"}
        </td>
        <td style="color: #e4e8ec">Internal Scan</td>
        <td>
          <span class="scan-status ${
            item.exposed ? "exposed" : "safe"
          }">
            ${item.exposed ? "Exposed" : "Safe"}
          </span>
        </td>
      `;

      tableBody.appendChild(row);
    });

  } catch (error) {
    console.error("Post-scan load failed", error);
    alert("Failed to load scan results");
  }
}

document
  .getElementById("goToHistoryBtn")
  .addEventListener("click", () => {
    window.location.href = "/history.html";
  });

// Load on page open
window.addEventListener("DOMContentLoaded", loadPostScan);
