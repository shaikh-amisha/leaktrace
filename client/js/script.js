const sidebar = document.getElementById("sidebar");
const toggleBtn = document.getElementById("toggleSidebar");
const openBtn = document.getElementById("openSidebar");

toggleBtn.addEventListener("click", () => {
    sidebar.classList.add("collapsed");
});

openBtn.addEventListener("click", () => {
    sidebar.classList.remove("collapsed");
});



function goToDashboard() {
  window.location.href = "dashboard.html";
}



