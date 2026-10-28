// If already logged in → go to dashboard
const user = localStorage.getItem("user");

if (user) {
  window.location.href = "dashboard.html";
}

// Handle Login Form
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  // Validation
  if (email === "" || password === "") {
    alert("Please fill all fields");
    return;
  }

  // Save user session
  localStorage.setItem("user", email);

  // Redirect to dashboard
  window.location.href = "dashboard.html";
});