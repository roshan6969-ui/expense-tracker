const form = document.getElementById("signupForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:4000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    console.log("RESPONSE:", data); // 🔥 DEBUG

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("Signup successful");

    // SAVE USER
    localStorage.setItem("user", JSON.stringify(data.user));

    // REDIRECT
    window.location.href = "dashboard.html";

  } catch (err) {
    console.error("ERROR:", err);
    alert("Error connecting to server");
  }
});