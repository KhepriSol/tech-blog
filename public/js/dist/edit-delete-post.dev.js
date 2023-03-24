"use strict";

//handle editing the post
function editPostHandler(event) {
  var title, body, post_id;
  return regeneratorRuntime.async(function editPostHandler$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          event.preventDefault();
          title = document.querySelector("#post-title").innerHTML;
          body = document.querySelector("#post-body").innerHTML;
          post_id = window.location.toString().split("/")[window.location.toString().split("/").length - 1];
          console.log(title, body);
          document.location.replace("/edit/" + post_id);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
} //handle deleting the post


function deletePostHandler(event) {
  var post_id, response;
  return regeneratorRuntime.async(function deletePostHandler$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          event.preventDefault();
          post_id = window.location.toString().split("/")[window.location.toString().split("/").length - 1];
          _context2.next = 4;
          return regeneratorRuntime.awrap(fetch("/api/posts/" + post_id, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json"
            }
          }));

        case 4:
          response = _context2.sent;

          if (response.ok) {
            document.location.replace("/dashboard");
          } else {
            alert(response.statusText);
          }

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
} //edit + delete post


document.querySelector("#edit-btn").addEventListener("click", editPostHandler);
document.querySelector("#delete-btn").addEventListener("click", deletePostHandler);
//# sourceMappingURL=edit-delete-post.dev.js.map
