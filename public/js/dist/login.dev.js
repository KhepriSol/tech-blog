"use strict";

// Handle login
function loginFormHandler(event) {
  var email, password, response;
  return regeneratorRuntime.async(function loginFormHandler$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          event.preventDefault();
          email = document.querySelector("#email-login").value.trim();
          password = document.querySelector("#password-login").value.trim();

          if (!(!email || !password)) {
            _context.next = 6;
            break;
          }

          alert("Please enter your email and password.");
          return _context.abrupt("return");

        case 6:
          _context.prev = 6;
          _context.next = 9;
          return regeneratorRuntime.awrap(fetch("/api/users/login", {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: password
            }),
            headers: {
              "Content-Type": "application/json"
            }
          }));

        case 9:
          response = _context.sent;

          if (!response.ok) {
            _context.next = 15;
            break;
          }

          console.log(response, " Logged in successfully!");
          document.location.replace("/");
          _context.next = 16;
          break;

        case 15:
          throw new Error(response.statusText);

        case 16:
          _context.next = 22;
          break;

        case 18:
          _context.prev = 18;
          _context.t0 = _context["catch"](6);
          console.error(_context.t0);
          alert("Failed to log in. Please try again.");

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[6, 18]]);
} // Handle signup/register


function signupFormHandler(event) {
  var username, email, password, response, responseTwo;
  return regeneratorRuntime.async(function signupFormHandler$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          event.preventDefault();
          username = document.querySelector("#username-signup").value.trim();
          email = document.querySelector("#email-signup").value.trim();
          password = document.querySelector("#password-signup").value.trim();

          if (!(!username || !email || !password)) {
            _context2.next = 7;
            break;
          }

          alert("Please fill out all fields.");
          return _context2.abrupt("return");

        case 7:
          _context2.prev = 7;
          _context2.next = 10;
          return regeneratorRuntime.awrap(fetch("/api/users", {
            method: "POST",
            body: JSON.stringify({
              username: username,
              email: email,
              password: password
            }),
            headers: {
              "Content-Type": "application/json"
            }
          }));

        case 10:
          response = _context2.sent;

          if (!response.ok) {
            _context2.next = 15;
            break;
          }

          console.log(response);
          _context2.next = 16;
          break;

        case 15:
          throw new Error(response.statusText);

        case 16:
          _context2.next = 18;
          return regeneratorRuntime.awrap(fetch("/api/users/login", {
            method: "POST",
            body: JSON.stringify({
              email: email,
              password: password
            }),
            headers: {
              "Content-Type": "application/json"
            }
          }));

        case 18:
          responseTwo = _context2.sent;

          if (!responseTwo.ok) {
            _context2.next = 24;
            break;
          }

          console.log(responseTwo, " Logged in successfully!");
          document.location.replace("/");
          _context2.next = 25;
          break;

        case 24:
          throw new Error(responseTwo.statusText);

        case 25:
          _context2.next = 31;
          break;

        case 27:
          _context2.prev = 27;
          _context2.t0 = _context2["catch"](7);
          console.error(_context2.t0);
          alert("Failed to sign up or log in. Please try again.");

        case 31:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[7, 27]]);
} // Add event listeners to the buttons


document.querySelector("#login-btn").addEventListener("click", loginFormHandler);
document.querySelector("#signup-btn").addEventListener("click", signupFormHandler);
//# sourceMappingURL=login.dev.js.map
