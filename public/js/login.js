// Handle login
async function loginFormHandler(event) {
    event.preventDefault();
    const email = document.querySelector("#email-login").value.trim();
    const password = document.querySelector("#password-login").value.trim();
  
    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }
  
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        console.log(response, " Logged in successfully!");
        document.location.replace("/");
      } else {
        throw new Error(response.statusText);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to log in. Please try again.");
    }
  }
  
  // Handle signup/register
  async function signupFormHandler(event) {
    event.preventDefault();
    const username = document.querySelector("#username-signup").value.trim();
    const email = document.querySelector("#email-signup").value.trim();
    const password = document.querySelector("#password-signup").value.trim();
  
    if (!username || !email || !password) {
      alert("Please fill out all fields.");
      return;
    }
  
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        body: JSON.stringify({
          username,
          email,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (response.ok) {
        console.log(response);
      } else {
        throw new Error(response.statusText);
      }
  
      const responseTwo = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: { "Content-Type": "application/json" },
      });
  
      if (responseTwo.ok) {
        console.log(responseTwo, " Logged in successfully!");
        document.location.replace("/");
      } else {
        throw new Error(responseTwo.statusText);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to sign up or log in. Please try again.");
    } 
  }
  
  // Add event listeners to the buttons
  document.querySelector("#login-btn").addEventListener("click", loginFormHandler);
  document.querySelector("#signup-btn").addEventListener("click", signupFormHandler);
  