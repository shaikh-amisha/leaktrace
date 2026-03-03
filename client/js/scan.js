console.log("scan.js loaded");

const fileInput = document.getElementById("csvFile");
const runScanBtn = document.getElementById("runScanBtn");

runScanBtn.addEventListener("click", async () => {
  console.log("Run Scan button clicked");

  if (!fileInput || !fileInput.files.length) {
    alert("Please select a CSV file");
    return;
  }

  const file = fileInput.files[0];
  console.log("Selected file:", file.name);

  const formData = new FormData();
  formData.append("file", file); // MUST be "file"

  try {
    const response = await fetch("http://localhost:5000/api/scans/upload", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    console.log("Scan completed", data);

    if (!response.ok) {
      throw new Error(data.message || "Scan failed");
    }

    window.location.href = `analytics.html?scanId=${data.scanId}`;

  } catch (error) {
    alert(error.message);
  }
});
