"use strict";

function logout() {
  var response;
  return regeneratorRuntime.async(function logout$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(fetch("/api/users/logout", {
            method: "POST",
            headers: {
              "content-type": "application/json"
            }
          }));

        case 2:
          response = _context.sent;

          if (response.ok) {
            document.location.replace("/");
          } else {
            alert(response.statusText);
          }

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

document.querySelector("#logout-btn").addEventListener("click", logout);
//# sourceMappingURL=logout.dev.js.map
