console.log("dashboard.js loaded");

async function loadDashboard() {
  try {
    const response = await fetch(
      "http://localhost:5000/api/dashboard/summary"
    );

    const data = await response.json();
    console.log("Dashboard API:", data);

    // KPIs
    document.getElementById("totalScans").textContent = data.totalScans;
    document.getElementById("totalExposed").textContent = data.totalExposed;
    document.getElementById("totalSafe").textContent = data.totalSafe;

    // Recent scans table
    const tableBody = document.getElementById("recentScansTable");
    tableBody.innerHTML = "";

    data.recentScans.forEach((scan) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${new Date(scan.createdAt).toLocaleString()}</td>
        <td>${scan.fileName}</td>
        <td>${scan.totalEmails}</td>
        <td class="text-danger">${scan.exposedCount}</td>
        <td>
          <span class="badge bg-success">Completed</span>
        </td>
        <td>
          <button 
            class="btn btn-sm btn-outline-danger"
            onclick="deleteScan('${scan._id}')">
            Delete
          </button>
        </td>
      `;

      
      tableBody.appendChild(row);
    });

  } catch (error) {
    console.error("Dashboard load failed", error);
  }
}

// Load dashboard when page opens
window.addEventListener("DOMContentLoaded", () => {
  console.log("Dashboard loaded at", new Date().toISOString());
  loadDashboard();
});

// Delete scan function
async function deleteScan(scanId) {
  if (!confirm("Are you sure you want to delete this scan?")) return;

  try {
    await fetch(`http://localhost:5000/api/scans/${scanId}`, {
      method: "DELETE"
    });

    // refresh dashboard after delete
    loadDashboard();

  } catch (error) {
    console.error("Delete failed", error);
    alert("Failed to delete scan");
  }
}
